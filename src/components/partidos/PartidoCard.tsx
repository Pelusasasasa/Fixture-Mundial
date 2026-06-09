import Colors from "@/constants/colors";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  partido: any;
}

export default function PartidoCard({ partido }: Props) {
  const { homeTeam, awayTeam, group, status, utcDate } = partido;

  // Status badge logic
  const getStatusInfo = () => {
    switch (status) {
      case "IN_PLAY":
      case "LIVE":
        return {
          text: `LIVE • ${partido.minute || "74"}'`,
          bgColor: Colors.primary,
          textColor: "#0f172a",
        };
      case "FINISHED":
        return {
          text: "FINISHED",
          bgColor: "#1e293b",
          textColor: "#94a3b8",
        };
      default:
        // Format time
        const timeStr = utcDate
          ? new Date(utcDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "TIMED";
        return {
          text: timeStr,
          bgColor: "#1e293b",
          textColor: "#ffffff",
        };
    }
  };

  const statusInfo = getStatusInfo();
  const venue = partido.venue || "Stadium BC";

  return (
    <View style={styles.card}>
      {/* Badge de Estado */}
      <View style={[styles.badge, { backgroundColor: statusInfo.bgColor }]}>
        <Text style={[styles.badgeText, { color: statusInfo.textColor }]}>
          {statusInfo.text}
        </Text>
      </View>

      {/* Contenido Principal */}
      <View style={styles.teamsContainer}>
        {/* Equipo Local */}
        <View style={styles.teamContainer}>
          <View style={styles.crestWrapper}>
            <Image
              style={styles.crest}
              source={homeTeam?.crest}
              contentFit="cover"
            />
          </View>
          <Text style={styles.teamLabel} numberOfLines={1} ellipsizeMode="tail">
            {homeTeam?.name || "TBD"}
          </Text>
        </View>

        {/*  Resultado */}
        <View style={styles.scoreContainer}>
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreLabel}>
              {partido.score?.fullTime?.home ?? 0} -{" "}
              {partido.score?.fullTime?.away ?? 0}
            </Text>
          </View>
          <Text
            style={styles.venueLabel}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {venue}
          </Text>
        </View>

        {/* Equipo visitante */}
        <View style={styles.teamContainer}>
          <View style={styles.crestWrapper}>
            <Image
              style={styles.crest}
              source={awayTeam?.crest}
              contentFit="cover"
            />
          </View>
          <Text style={styles.teamLabel} numberOfLines={1} ellipsizeMode="tail">
            {awayTeam?.name || "TBD"}
          </Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.footer}>
        <Text style={styles.groupLabel}>
          {group} {venue ? `• ${venue}` : ""}
        </Text>
        <Text style={styles.groupLabel}>
          {utcDate.slice(0, 10).split("-").reverse().join("/")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0d162d",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    marginBottom: 14,
    position: "relative",
    overflow: "hidden",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  teamsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  teamContainer: {
    alignItems: "center",
    width: "30%",
  },
  crestWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#16223f",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#23355f",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  crest: {
    width: "100%",
    height: "100%",
  },
  teamLabel: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  scoreContainer: {
    alignItems: "center",
    width: "35%",
  },
  scoreBadge: {
    backgroundColor: "#16223f",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: "#23355f",
  },
  scoreLabel: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
    letterSpacing: 1,
  },
  venueLabel: {
    fontSize: 10,
    color: "#6c7d93",
    marginTop: 6,
    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#1e2c4f",
    paddingTop: 10,
  },
  groupLabel: {
    fontSize: 11,
    color: "#859bb5",
    fontWeight: "500",
  },
  favoriteBtn: {
    padding: 4,
  },
});
