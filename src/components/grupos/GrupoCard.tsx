import Colors from "@/constants/colors";
import { Grupo, Table } from "@/interface/Grupo";
import { FlatList, StyleSheet, Text, View } from "react-native";
import GrupoItem from "./GrupoItem";

interface Props {
  grupo: Grupo;
}

const renderItem = ({ item, index }: { item: Table; index: number }) => (
  <GrupoItem table={item} index={index} />
);

export default function GrupoCard({ grupo }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{grupo.group}</Text>
      </View>
      <View style={styles.headerTable}>
        <Text style={[styles.labelTable, styles.teamHeader]}>EQUIPO</Text>
        <Text style={styles.labelTable}>PJ</Text>
        <Text style={styles.labelTable}>G</Text>
        <Text style={styles.labelTable}>E</Text>
        <Text style={styles.labelTable}>P</Text>
        <Text style={[styles.labelTable, styles.pointsHeader]}>Pts</Text>
      </View>
      <FlatList
        data={grupo.table}
        renderItem={renderItem}
        keyExtractor={(item: Table) => item.team.id}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    backgroundColor: "rgba(30, 41, 59, 0.7)",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  headerTable: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(51, 65, 85, 0.5)",
    paddingBottom: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    marginHorizontal: 20,
  },
  labelTable: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  teamHeader: {
    flex: 4,
    textAlign: "left",
    paddingLeft: 22,
  },
  pointsHeader: {
    color: Colors.primary,
    textAlign: "right",
  },
});
