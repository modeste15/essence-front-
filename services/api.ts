const API_URL = "http://212.227.88.124:5000"

export async function getPdv() {
  const res = await fetch(`${API_URL}/stations`)

  return res.json()

}


export async function getVilles(value: string) {
  const res = await fetch(`${API_URL}/villes?q=${value}`)

  return res.json()

}