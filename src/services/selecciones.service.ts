import { Seleccion } from "@/interface/Seleccion";
import { mapSeleccion, mapSelecciones } from "@/mappers";
import api from "./api";

interface Response {
  teams: Seleccion[];
  total: number;
}

export const getSelecciones = async (): Promise<Response> => {
  try {
    const { data } = await api.get(`competitions/2000/teams`);

    if (data) {
      return {
        teams: mapSelecciones(data.teams),
        total: data.count,
      };
    }

    throw new Error("Error al obtener las selecciones");
  } catch (error) {
    console.error(error);
    return { teams: [], total: 0 };
  }
};

export const getSeleccionById = async (
  id: string,
): Promise<Seleccion | null> => {
  try {
    const { data } = await api.get(`teams/${id}`);

    if (data) {
      return mapSeleccion(data);
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
