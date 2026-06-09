export const obtenerPartidosPorFecha = (partidos: any[]) => {
  try {
    const agrupados = Object.entries(
      partidos.reduce((acc, partido) => {
        const matchday = partido.matchday;

        if (!acc[matchday]) {
          acc[matchday] = [];
        }

        acc[matchday].push(partido);

        return acc;
      }, {}),
    ).map(([matchday, partidos]) => ({
      matchday: Number(matchday),
      partidos,
    }));

    return agrupados;
  } catch (error) {
    console.log(error);
  }
};
