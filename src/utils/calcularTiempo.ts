export const calcularTiempo = (fecha: string) => {
  const ahora = new Date().getTime();
  const fechaPartdo = new Date(fecha).getTime();
  const diferencia = fechaPartdo - ahora;

  if (diferencia <= 0) {
    return "¡Jugando o Finalizado!";
  }

  //Calculos matematicos
  const unDia = 24 * 60 * 60 * 1000;
  const unaHora = unDia / 24;
  const unMinuto = unaHora / 60;

  const dias = Math.floor(diferencia / unDia)
    .toString()
    .padStart(2, "0");
  const horas = Math.floor((diferencia % unDia) / unaHora)
    .toString()
    .padStart(2, "0");
  const minutos = Math.floor((diferencia % unaHora) / unMinuto)
    .toString()
    .padStart(2, "0");

  return `${dias}:${horas}:${minutos}`;
};
