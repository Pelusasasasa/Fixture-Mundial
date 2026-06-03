import { traerGrupos } from "@/services/grupos.service";
import { useQuery } from "@tanstack/react-query";

export const useGrupos = () => {
  return useQuery({
    queryKey: ["grupos"],
    queryFn: () => traerGrupos(),
  });
};
