interface GruposApi {
    group: string;

    table: TeamApi[]

}


interface TeamApi {
    position: number;
    won: number;
    points: number;
    lost: number;
    draw: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    team: {
        id: string;
        name: string;
        crest: string;
    }
}
export const mapGrupos = (grupos: GruposApi[]) => {

    return grupos.map((grupo) => ({
        group: grupo.group,
        table: grupo.table.map((team) => ({
            position: team.position,
            won: team.won,
            points: team.points,
            lost: team.lost,
            draw: team.draw,
            goalsFor: team.goalsFor,
            goalsAgainst: team.goalsAgainst,
            goalDifference: team.goalDifference,
            team: team.team,
        }))
    }));
};