import Colors from "@/constants/colors";
import { Table } from "@/interface/Grupo";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  table: Table;
  index: number;
}

export default function GrupoItem({ table, index }: Props) {
  const played = table.won + table.draw + table.lost;
  const isQualifying = index < 2;

  return (
    <View style={[styles.row, isQualifying && styles.rowQualifying]}>
      {/* Celda del equipo */}
      <View style={styles.teamCell}>
        <Text style={styles.positionText}>{index + 1}</Text>
        <Image
          source={{ uri: table.team.crest }}
          style={styles.crest}
          contentFit="contain"
          transition={200}
        />
        <Text style={styles.teamName} numberOfLines={1} ellipsizeMode="tail">
          {table.team.name}
        </Text>
      </View>

      {/* Celdas de estadisticas */}
      <Text style={styles.statCell}>{played}</Text>
      <Text style={styles.statCell}>{table.won}</Text>
      <Text style={styles.statCell}>{table.draw}</Text>
      <Text style={styles.statCell}>{table.lost}</Text>
      <Text style={[styles.statCell, styles.pointsCell]}>{table.points}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(51, 65, 85, 0.3)",
  },
  rowQualifying: {
    backgroundColor: "rgba(0, 255, 133, 0.04)",
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    paddingLeft: 9,
  },
  teamCell: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  positionText: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: "bold",
    width: 14,
    textAlign: "center",
  },
  crest: {
    width: 20,
    height: 20,
  },
  teamName: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
  },
  statCell: {
    flex: 1,
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  pointsCell: {
    color: Colors.primary,
    fontWeight: "bold",
    textAlign: "right",
  },
});
