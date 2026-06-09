import { getCompeticion } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetcompeticion = () => {
  return useQuery({
    queryKey: ["competicion"],
    queryFn: getCompeticion,
    staleTime: 1000 * 60 * 60, // 1 Hora
  });
};
