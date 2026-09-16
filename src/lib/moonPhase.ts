import { EclipticGeoMoon, MoonPhase } from "astronomy-engine";

const NOMBRES_FASE = [
  "Luna Nueva",
  "Luna Creciente",
  "Cuarto Creciente",
  "Luna Gibosa Creciente",
  "Luna Llena",
  "Luna Gibosa Menguante",
  "Cuarto Menguante",
  "Luna Menguante",
] as const;

const SIGNOS_ZODIACO = [
  "Aries",
  "Tauro",
  "Géminis",
  "Cáncer",
  "Leo",
  "Virgo",
  "Libra",
  "Escorpio",
  "Sagitario",
  "Capricornio",
  "Acuario",
  "Piscis",
] as const;

/** "Luna Creciente en Escorpio", calculado con la posición real de la luna hoy. */
export function getFaseLunarActual(fecha: Date = new Date()): string {
  const anguloFase = MoonPhase(fecha);
  const indiceFase = Math.round(anguloFase / 45) % NOMBRES_FASE.length;

  const longitudEclipticaGrados = EclipticGeoMoon(fecha).lon;
  const indiceSigno =
    Math.floor(longitudEclipticaGrados / 30) % SIGNOS_ZODIACO.length;

  return `${NOMBRES_FASE[indiceFase]} en ${SIGNOS_ZODIACO[indiceSigno]}`;
}
