import Colors from "@/constants/colors";
import IonIcons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSeleccionById } from "../../hooks/selecciones/useSelecciones";

interface Jugador {
  dateOfBirth: string;
  id: number;
  name: string;
  nationality: string;
  position: string;
}

const positionMapping: { [key: string]: string } = {
  Goalkeeper: "Porteros",
  Defender: "Defensores",
  Midfielder: "Mediocampistas",
  Offence: "Delanteros",
  Attacker: "Delanteros",
};

const getPositionOrder = (pos: string) => {
  const p = pos.toLowerCase();
  if (p.includes("goalkeeper") || p.includes("portero")) return 1;
  if (
    p.includes("defender") ||
    p.includes("defensa") ||
    p.includes("defensores")
  )
    return 2;
  if (
    p.includes("midfielder") ||
    p.includes("medio") ||
    p.includes("centrocampista") ||
    p.includes("mediocampista")
  )
    return 3;
  return 4;
};

const getAge = (dobString?: string) => {
  if (!dobString) return "";
  try {
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return "";
    const diffMs = Date.now() - dob.getTime();
    const ageDate = new Date(diffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970) + " años";
  } catch (e) {
    return "";
  }
};

const DetalleEquipoScreen = () => {
  const router = useRouter();
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();
  const { data, isLoading } = useSeleccionById(id!);

  // Agrupar jugadores por posición
  const getSections = () => {
    if (!data?.jugadores) return [];

    const groups: { [key: string]: Jugador[] } = {};
    data.jugadores.forEach((jugador) => {
      const pos = jugador.position || "Otros";
      const normalizedPos = positionMapping[pos] || pos;
      if (!groups[normalizedPos]) {
        groups[normalizedPos] = [];
      }
      groups[normalizedPos].push(jugador);
    });

    return Object.keys(groups)
      .map((title) => ({
        title,
        data: groups[title],
        order: getPositionOrder(title),
      }))
      .sort((a, b) => a.order - b.order);
  };

  const sections = getSections();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Personalizado */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IonIcons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {name || data?.nombre || "Detalle de Selección"}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Cargando plantilla...</Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View style={styles.teamHero}>
              <View style={styles.crestContainer}>
                {data?.flag ? (
                  <Image
                    source={{ uri: data.flag }}
                    style={styles.crest}
                    contentFit="contain"
                    transition={300}
                  />
                ) : (
                  <IonIcons name="football" size={80} color={Colors.primary} />
                )}
              </View>
              <Text style={styles.teamName}>{data?.nombre}</Text>
              <Text style={styles.squadCount}>
                Plantilla: {data?.jugadores?.length || 0} jugadores
              </Text>
            </View>
          }
          renderSectionHeader={({ section: { title, data } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {title} <Text style={styles.sectionCount}>({data.length})</Text>
              </Text>
            </View>
          )}
          renderItem={({ item }) => {
            const age = getAge(item.dateOfBirth);
            return (
              <View style={styles.playerCard}>
                <View style={styles.playerIconContainer}>
                  <IonIcons name="shirt" size={20} color={Colors.primary} />
                </View>
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>{item.name}</Text>
                  <Text style={styles.playerSubText}>
                    {item.nationality} {age ? `• ${age}` : ""}
                  </Text>
                </View>
                <View style={styles.positionBadge}>
                  <Text style={styles.positionBadgeText}>
                    {positionMapping[item.position] || item.position || "N/A"}
                  </Text>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={styles.center}>
              <IonIcons
                name="people-outline"
                size={48}
                color={Colors.textMuted}
              />
              <Text style={styles.noPlayersText}>
                No se encontraron jugadores.
              </Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

export default DetalleEquipoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(51, 65, 85, 0.4)",
    backgroundColor: "#001133",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  loadingText: {
    color: Colors.textMuted,
    marginTop: 12,
    fontSize: 15,
  },
  teamHero: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(51, 65, 85, 0.2)",
    marginBottom: 15,
  },
  crestContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 16,
  },
  crest: {
    width: "100%",
    height: "100%",
  },
  teamName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 6,
  },
  squadCount: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
  sectionHeader: {
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
    marginVertical: 6,
  },
  sectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionCount: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: "normal",
  },
  listContent: {
    paddingBottom: 40,
  },
  playerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(51, 65, 85, 0.3)",
  },
  playerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 255, 133, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  playerSubText: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  positionBadge: {
    backgroundColor: "rgba(0, 224, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(0, 224, 255, 0.2)",
  },
  positionBadgeText: {
    color: Colors.secondary,
    fontSize: 10,
    fontWeight: "bold",
  },
  noPlayersText: {
    color: Colors.textMuted,
    marginTop: 10,
    fontSize: 15,
  },
});
