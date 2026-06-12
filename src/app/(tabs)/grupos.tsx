import GrupoCard from "@/components/grupos/GrupoCard";
import Loading from "@/components/ui/Loading";
import Colors from "@/constants/colors";
import { useGrupos } from "@/hooks/grupos/useGrupos";
import { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

const GruposScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, refetch } = useGrupos();

  if (isLoading) return <Loading message="Cargando grupos..." />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grupos</Text>
      <Text style={styles.subTitle}>Estadisticas y progresion del torneo</Text>

      <FlatList
        data={data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refetch} />
        }
        renderItem={({ item }) => <GrupoCard grupo={item} />}
        keyExtractor={(item) => item.group}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral,
    color: "white",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
    paddingHorizontal: 20,
  },
});

export default GruposScreen;
