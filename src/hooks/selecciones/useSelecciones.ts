import { useQuery } from "@tanstack/react-query";
import { getSelecciones } from "../../services";

export const useSelecciones = () => {
  return useQuery({
    queryKey: ["selecciones"],
    queryFn: getSelecciones,
  });
};
