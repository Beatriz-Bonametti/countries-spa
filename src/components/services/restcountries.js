const BASE = "https://restcountries.com/v3.1";
const FIELDS = "name,capital,region,population,flags,currencies,languages,cca2,cca3,borders,area";

export async function fetchByName(name) {
  const res = await fetch(`${BASE}/name/${encodeURIComponent(name)}?fields=${FIELDS}`);
  if (!res.ok) throw new Error("País não encontrado.");
  return res.json();
}
export async function fetchByRegion(region) {
  const res = await fetch(`${BASE}/region/${encodeURIComponent(region)}?fields=${FIELDS}`);
  if (!res.ok) throw new Error("Região inválida ou sem resultados.");
  return res.json();
}
export async function fetchByCode(code) {
  const res = await fetch(`${BASE}/alpha/${encodeURIComponent(code)}?fields=${FIELDS}`);
  if (!res.ok) throw new Error("Código inválido.");
  return res.json();
}
