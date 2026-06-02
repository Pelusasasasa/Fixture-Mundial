import { useQuery } from "@tanstack/react-query";
import { getSeleccionById, getSelecciones } from "../../services";

export const useSelecciones = () => {
  return useQuery({
    queryKey: ["selecciones"],
    queryFn: getSelecciones,
  });
};

export const useSeleccionById = (id: string) => {
  return useQuery({
    queryKey: ["seleccion", id],
    queryFn: () => getSeleccionById(id),
  });
};
