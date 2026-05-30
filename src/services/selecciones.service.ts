import { Seleccion } from "@/interface/Seleccion";
import { mapSelecciones } from "@/mappers";
import api from "./api";

interface Response {
  teams: Seleccion[];
  total: number;
}

export const getSelecciones = async (): Promise<boolean | Response> => {
  try {
    const { data } = await api.get(`competitions/2000/teams`);

    if (data) {
      return {
        teams: mapSelecciones(data.teams),
        total: data.count,
      };
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
