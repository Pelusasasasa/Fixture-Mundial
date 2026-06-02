import { useQuery } from "@tanstack/react-query";
import { traerPartidosDeSeleccion } from "../../services";

export const usePartidoSeleccion = (id: string) => {
  return useQuery({
    queryKey: ["partidoSeleccion", id],
    queryFn: () => traerPartidosDeSeleccion(id),
    enabled: !!id,
  });
};
