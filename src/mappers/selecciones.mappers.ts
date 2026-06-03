import { Seleccion } from "@/interface/Seleccion";
import { JugadoresApi } from "./jugadores.mappers";

interface SeleccionApi {
  id: string;
  name: string;
  crest: string;
  group: string;

  squad?: JugadoresApi[];
}

export const mapSelecciones = (selecciones: SeleccionApi[]): Seleccion[] => {
  return selecciones.map((seleccion: SeleccionApi) => ({
    id: seleccion.id,
    nombre: seleccion.name,
    flag: seleccion.crest,
  }));
};

export const mapSeleccion = (seleccion: SeleccionApi): Seleccion => {
  return {
    id: seleccion.id,
    nombre: seleccion.name,
    flag: seleccion.crest,
  };
};

export const mapSeleccionesPorGrupos = (selecciones: Seleccion[]) => {
  const grupos: Seleccion[][] = [];
  let grupoActual: Seleccion[] = [];

  selecciones.forEach((seleccion) => {
    grupoActual.push(seleccion);
    if (grupoActual.length === 4) {
      grupos.push(grupoActual);
      grupoActual = [];
    }
  });

  return grupos;
};
