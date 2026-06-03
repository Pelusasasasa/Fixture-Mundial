export interface Grupo {
    group: string;
    table: Table[];
}

export interface Table {
    position: number;
    won: number;
    points: number;
    lost: number;
    draw: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    team: Team;
}

export interface Team {
    id: string;
    name: string;
    crest: string;
}