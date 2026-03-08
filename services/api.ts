const API_URL = "http://localhost:5000"

export async function getPdv() {
  const res = await fetch(`${API_URL}/stations`)

  return res.json()

}