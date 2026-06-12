import api from "./api";

export const getCompeticion = async () => {
  try {
    const { data } = await api(`/competitions/WC/matches`);

    return data.matches;
  } catch (error: any) {
    console.error("error al traer la competicion", error?.response.data);
  }
};
