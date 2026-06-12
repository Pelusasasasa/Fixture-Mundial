export interface Seleccion {
  nombre: string;
  flag: string;
  id: number;

  jugadores: Jugador[];
}

interface Jugador {
  dateOfBirth: string;
  id: number;
  name: string;
  nationality: string;
  position: string;
}
