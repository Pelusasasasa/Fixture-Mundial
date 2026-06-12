import { useSelecciones } from "@/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "expo-router/build/react-navigation/drawer";
import { useEffect, useState } from "react";
import {
  DeviceEventEmitter,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import SelectModal from "./SelectModal";

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const version = Constants.expoConfig?.version;
  const isDark = useColorScheme() == "dark";

  const { data } = useSelecciones();

  const [equipo, setEquipo] = useState<number | null>(null);
  const [visibleEquipo, setVisibleEquipo] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const guardarEquipo = async () => {
      if (!equipo) return;
      await AsyncStorage.setItem("miEquipo", equipo.toString());
      DeviceEventEmitter.emit("equipoFavoritoCambiado", equipo.toString());
    };

    guardarEquipo();
  }, [equipo]);

  useEffect(() => {
    const obtenerEquipo = async () => {
      const equipoGuardado = await AsyncStorage.getItem("miEquipo");
      if (equipoGuardado) {
        setEquipo(Number(equipoGuardado));
      }
    };

    obtenerEquipo();
  }, []);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: "#1f2940" }}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <Ionicons name="football-outline" size={24} color="#00ff88" />
          <Text style={{ color: "#00ff88", fontWeight: "bold", fontSize: 20 }}>
            Fixture
          </Text>
        </View>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Elegir Equipo Favorito */}
      <TouchableOpacity
        onPress={() => setVisibleEquipo(true)}
        style={styles.seleccion}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.seleccionTitle}>Equipo Favorito</Text>
          <Text style={styles.seleccionEquipo}>
            {equipo
              ? data?.teams.find((t) => t.id === equipo)?.nombre
              : "Seleccionar equipo"}
          </Text>
        </View>
        <Ionicons name="football-outline" size={18} color={"white"} />
        {error && !equipo && (
          <Text style={styles.errorText}>Campo requerido</Text>
        )}
      </TouchableOpacity>

      {/* Opciones */}
      <View>
        <Text style={{ color: "#FFF", fontSize: 20, marginHorizontal: 20 }}>
          Otras Competiciones
        </Text>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="trophy-outline" size={20} color="#00d4ff" />
          <Text style={{ color: "#fff", fontSize: 16 }}>Copa America</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="trophy-outline" size={20} color="#00d4ff" />
          <Text style={{ color: "#fff", fontSize: 16 }}>Euro Copa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="trophy-outline" size={20} color="#00d4ff" />
          <Text style={{ color: "#fff", fontSize: 16 }}>Liga Argentina</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 20, marginTop: "auto" }}>
        <Text
          style={{
            color: "#808080ff",
            fontSize: 12,
            fontWeight: "500",
            marginHorizontal: 20,
          }}
        >
          Fixture Copa del mundo {new Date().getFullYear()} - {version}
        </Text>
      </View>
      <SelectModal
        data={data?.teams || []}
        onClose={() => setVisibleEquipo(false)}
        visible={visibleEquipo}
        onSelect={(item) => setEquipo(item.id)}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    justifyContent: "space-between",
  },
  headerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  seleccion: {
    backgroundColor: "#1d1d1dff",
    borderWidth: 1,
    borderColor: "#1d1d1dff",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  seleccionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 1,
  },
  seleccionEquipo: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  errorText: {
    position: "absolute",
    bottom: -5,
    left: 1,
    color: "red",
    fontSize: 10,
    fontWeight: "bold",
  },
});
