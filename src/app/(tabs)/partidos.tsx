import FechaComponent from "@/components/partidos/FechaComponent";
import PartidoCard from "@/components/partidos/PartidoCard";

import Colors from "@/constants/colors";
import { useGetcompeticion } from "@/hooks/competicion/useCompeticion";
import { obtenerPartidosPorFecha } from "@/utils/obtenerPartidosPorFecha";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const PartidosScreen = () => {
  const { data, isLoading } = useGetcompeticion();
  const [fechaSeleccionada, setFechaSeleccionada] = useState(1);

  const partidosFiltrados = useMemo(() => {
    return obtenerPartidosPorFecha(data || []) || [];
  }, [data]);

  const partidosDeLaFecha = useMemo(() => {
    const grupo = partidosFiltrados.find(
      (ps: any) => ps.matchday === fechaSeleccionada,
    );
    return grupo ? (grupo.partidos as any[]) : [];
  }, [partidosFiltrados, fechaSeleccionada]);

  return (
    <View style={styles.container}>
      {/* Fechas */}
      <FechaComponent
        fechaSeleccionada={fechaSeleccionada}
        setFechaSeleccionada={setFechaSeleccionada}
      />

      {/* Tarjetas */}
      <FlatList
        data={partidosDeLaFecha}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => <PartidoCard partido={item} />}
        contentContainerStyle={{ gap: 15 }}
      />
    </View>
  );
};

export default PartidosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    padding: 5,
    gap: 15,
    backgroundColor: Colors.neutral,
  },
});
