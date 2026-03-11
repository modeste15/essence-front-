"use client"

import { useEffect, useState, useMemo, SetStateAction } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import {
    Map,
    MapMarker,
    MapMarkerClusterGroup,
    MapTileLayer,
    MapPopup, 
} from "@/components/ui/map"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"


import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import type { LatLngExpression } from "leaflet"
import { getPdv,getVilles } from "@/services/api"
import { useDebounce } from "use-debounce"

export default function MapPage() {
    const FRANCE_COORDINATES: LatLngExpression = [46.603354, 1.888334]

    const [pdvList, setPdvList] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState<[number, number]>([0, 1])
    const [villesList, setVillesList] = useState<string[]>([])
    const [villeQuery, setVilleQuery] = useState("")
    const [debouncedVilleQuery] = useDebounce(villeQuery, 1000)

    
    const handleSearch = async (value: string) => {
      setVilleQuery(value)

      if (value.length < 2) {
        setVillesList([])
        return
      }

      const data = await getVilles(value)

      setVillesList(data)
    }


    useEffect(() => {
        let isMounted = true
        
        async function fetchPdv() {
            try {
                const data = await getPdv()
                if (isMounted) {
                    setPdvList(data)
                }
            } catch (error) {
                console.error("Erreur chargement PDV:", error)
            } finally {
                if (isMounted) setLoading(false)
            }
        }
        fetchPdv()

        return () => { isMounted = false }
    }, [])

    const markers = useMemo(() => {
        return pdvList
            .map((item) => {
                const lat = Number(item.latitude) / 100000
                const lng = Number(item.longitude) / 100000

                return {
                    id: item.pdv_id,
                    position: [lat, lng] as [number, number],
                    raw: item 
                }
            })
            .filter(marker => 
                !isNaN(marker.position[0]) && 
                !isNaN(marker.position[1]) && 
                marker.position[0] !== 0
            )
    }, [pdvList])

    if (loading) return (
        <div className="flex h-screen items-center justify-center">
            <p>Chargement des points de vente...</p>
        </div>
    )

    return (
 <DashboardLayout>
  <div className="flex gap-4 h-[80vh]">

    {/* MAP */}
    <div className="flex-1 rounded-lg overflow-hidden border">

      <Map
        center={FRANCE_COORDINATES}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <MapTileLayer />

        <MapMarkerClusterGroup>
          {markers.map((marker) => (
            <MapMarker
              key={marker.id}
              position={marker.position as LatLngExpression}
            >
              <MapPopup className="min-w-48">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm text-blue-600">
                    Point de Vente #{marker.id}
                  </span>

                  <hr className="my-1" />

                  <p className="text-xs text-gray-600">
                    Coordonnées : {marker.position[0].toFixed(4)}, {marker.position[1].toFixed(4)}
                  </p>

                  {marker.raw.nom && (
                    <p className="font-medium">{marker.raw.nom}</p>
                  )}
                </div>
              </MapPopup>
            </MapMarker>
          ))}
        </MapMarkerClusterGroup>

      </Map>

    </div>

    {/* PANEL FILTRES */}
    <div className="w-72 bg-white border rounded-lg p-4 shadow flex flex-col gap-6">

      <h2 className="font-bold text-lg">Filtres</h2>
      <Combobox items={villesList}>
      <ComboboxInput 
        placeholder="Sélectionnez une ville"
        value={villeQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {villesList.map((item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>

      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="slider-demo-temperature">Temperature</Label>
          <span className="text-sm text-muted-foreground">
            {value.join(", ")}
          </span>
        </div>

        <Slider
          id="slider-demo-temperature"
          value={value}
          //onValueChange={setValue}
          min={0}
          max={1}
          step={0.1}
        />
        </div>

        <div className="mt-auto">
          <p className="text-xs text-gray-500">
            Dernière mise à jour : {new Date().toLocaleString('fr-FR')}
          </p>
        </div>
      </div>




    

  </div>

</DashboardLayout>
    )
}