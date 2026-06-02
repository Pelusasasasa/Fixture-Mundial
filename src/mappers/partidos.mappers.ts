export interface MatchApi {
  id: number;
  utcDate: string;
  status: string;
  stage: string;
  group: string;
  matchday: number;

  homeTeam: {
    crest: string;
    id: string;
    name: string;
  };
  awayTeam: {
    crest: string;
    id: string;
    name: string;
  };

  score: {
    fullTime: {
      away: number;
      home: number;
    };
    winner: string | null;
  };
}

export const mapPartidos = (partidos: MatchApi[]) => {
  return partidos.map((partido) => ({
    id: partido.id,
    fecha: partido.utcDate,
    equipoLocal: partido.homeTeam,
    equipoVisitante: partido.awayTeam,
    grupo: partido.group,
    score: partido.score,
  }));
};
