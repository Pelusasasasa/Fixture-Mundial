import { Seleccion } from "@/interface/Seleccion";
import { JugadoresApi } from "./jugadores.mappers";

interface SeleccionApi {
  id: string;
  name: string;
  crest: string;

  squad?: JugadoresApi[];
}

export const mapSelecciones = (selecciones: SeleccionApi[]): Seleccion[] => {
  return selecciones.map((seleccion: SeleccionApi) => ({
    id: seleccion.id,
    nombre: seleccion.name,
    flag: seleccion.crest,
  }));
};
