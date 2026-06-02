import { Partido } from "@/interface/Partido";
import dayjs from "dayjs";

export const obtenerElProximoPartido = (
  matches: Partido[] | undefined,
): Partido | null => {
  if (!matches || matches.length === 0) return null;

  const ahora = dayjs();

  const partidosFuturos = matches.filter((match) => {
    return dayjs(match.fecha).isAfter(ahora);
  });

  if (partidosFuturos.length === 0) return null;

  partidosFuturos.sort((a, b) => dayjs(a.fecha).diff(dayjs(b.fecha)));

  return partidosFuturos[0];
};

export default obtenerElProximoPartido;
