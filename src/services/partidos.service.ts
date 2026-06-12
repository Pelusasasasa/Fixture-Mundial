import { mapPartidos } from "@/mappers/partidos.mappers";
import api from "./api";

export const traerPartidosDeSeleccion = async (id: number) => {
  try {
    const { data } = await api.get(`/teams/${id}/matches`, {
      params: {
        competitions: 2000,
      },
    });

    return mapPartidos(data.matches);
  } catch (error) {
    console.error("error al traer los partidos de la seleccion", error);
  }
};
