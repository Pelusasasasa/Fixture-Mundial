import { useQuery } from "@tanstack/react-query";
import { traerPartidosDeSeleccion } from "../../services";

export const usePartidoSeleccion = (id: number) => {
  return useQuery({
    queryKey: ["partidoSeleccion", id],
    queryFn: () => traerPartidosDeSeleccion(id),
    enabled: !!id,
  });
};
