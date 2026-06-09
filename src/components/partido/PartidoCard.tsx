import Colors from "@/constants/colors";
import { Partido } from "@/interface/Partido";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  partido: Partido;
}

export const PartidoCard = ({ partido }: Props) => {
  console.log("p", partido);

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.dateLabel}>
          {dayjs(partido.fecha).format("DD MMM . HH:mm").toUpperCase()}
        </Text>
        {partido.grupo && (
          <View style={styles.groupBadge}>
            <Text style={styles.groupText}>
              {partido.grupo.replace("_", " ")}
            </Text>
          </View>
        )}
      </View>

      {/* Equipos  */}
      <View style={styles.teams}>
        {/* Local Team */}
        <View style={styles.teamContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: partido.equipoLocal.crest }}
              style={styles.crest}
              contentFit="contain"
              transition={200}
            />
          </View>
          <Text style={styles.teamName} numberOfLines={1} ellipsizeMode="tail">
            {partido.equipoLocal.name}
          </Text>
        </View>

        {/* VS Badge */}
        <View style={styles.vsContainer}>
          <View style={styles.vsCircle}>
            <Text style={styles.vsText}>VS</Text>
          </View>
        </View>

        {/* Visitante */}
        <View style={styles.teamContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: partido.equipoVisitante.crest }}
              style={styles.crest}
              contentFit="contain"
              transition={200}
            />
          </View>
          <Text style={styles.teamName} numberOfLines={1} ellipsizeMode="tail">
            {partido.equipoVisitante.name}
          </Text>
        </View>
      </View>

      <View>
        <Text
          style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
        >
          {partido.score.fullTime.home} - {partido.score.fullTime.away}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 18,
    width: 280,
    padding: 16,
    marginTop: 15,
    backgroundColor: "rgba(30, 41, 59, 0.7)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(51, 65, 85, 0.5)",
    paddingBottom: 8,
    marginBottom: 12,
  },
  dateLabel: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  groupBadge: {
    backgroundColor: "rgba(0, 255, 133, 0.15)",
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  groupText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: "bold",
  },
  teams: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamContainer: {
    flex: 1.2,
    alignItems: "center",
  },
  imageWrapper: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 6,
  },
  crest: {
    width: "100%",
    height: "100%",
  },
  teamName: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  vsContainer: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  vsCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(51, 65, 85, 0.8)",
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  vsText: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: "bold",
  },
});
