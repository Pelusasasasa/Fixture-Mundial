import GrupoCard from "@/components/grupos/GrupoCard";
import Colors from "@/constants/colors";
import { useGrupos } from "@/hooks/grupos/useGrupos";
import { FlatList, StyleSheet, Text, View } from "react-native";

const GruposScreen = () => {
  const { data, isLoading } = useGrupos();

  if (isLoading) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grupos</Text>
      <Text style={styles.subTitle}>Estadisticas y progresion del torneo</Text>

      <FlatList
        data={data}
        renderItem={({ item }) => <GrupoCard grupo={item} />}
        keyExtractor={(item) => item.group}
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
