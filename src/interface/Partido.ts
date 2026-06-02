export interface Partido {
  id: number; // Cambiado de string a number para coincidir con la API
  fecha: string;
  equipoLocal: {
    crest: string;
    id: string;
    name: string;
  };
  equipoVisitante: {
    crest: string;
    id: string;
    name: string;
  };
  grupo: string;
  score: {
    fullTime: {
      away: number;
      home: number;
    };
    winner: string | null;
  };
}
