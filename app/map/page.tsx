"use client"

import { useEffect, useState, useMemo } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import {
    Map,
    MapMarker,
    MapMarkerClusterGroup,
    MapTileLayer,
    MapPopup, 
} from "@/components/ui/map"
import type { LatLngExpression } from "leaflet"
import { getPdv } from "@/services/api"

export default function MapPage() {
    const FRANCE_COORDINATES: LatLngExpression = [46.603354, 1.888334]

    const [pdvList, setPdvList] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

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
        
        <Map center={FRANCE_COORDINATES} zoom={6} style={{ height: "80vh", width: "100%" }}>
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
                                {marker.raw.nom && <p className="font-medium">{marker.raw.nom}</p>}
                            </div>
                        </MapPopup>
                    </MapMarker>
                ))}
            </MapMarkerClusterGroup>
        </Map>
        </DashboardLayout>
    )
}