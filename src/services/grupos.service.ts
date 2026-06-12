import { mapGrupos } from "@/mappers/grupos.mappers";
import api from "./api";

export const traerGrupos = async () => {
  try {
    const { data } = await api.get(`/competitions/WC/standings`);

    return mapGrupos(data.standings);
  } catch (error) {
    console.error("error al traer los grupos", error);
  }
};
