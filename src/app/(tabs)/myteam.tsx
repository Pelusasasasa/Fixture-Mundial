import { PartidoCard } from "@/components/partido/PartidoCard";
import CardStat from "@/components/ui/CardStat";
import Loading from "@/components/ui/Loading";
import Colors from "@/constants/colors";
import { usePartidoSeleccion, useSeleccionById } from "@/hooks";
import { calcularTiempo } from "@/utils/calcularTiempo";

import obtenerElProximoPartido from "@/utils/obtenerElProximoPartido";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  DeviceEventEmitter,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

const MyTeamScreen = () => {
  const [equipo, setEquipo] = useState("840");
  const { data, isLoading } = useSeleccionById(equipo || "");
  const [tiempoRestante, setTiempoRestante] = useState<string>("00:00:00");

  const { data: partidos, isLoading: isLoadingPartidos } = usePartidoSeleccion(
    data?.id || 0,
  );
  const proximoPartido = obtenerElProximoPartido(partidos);

  useEffect(() => {
    const subscripccion = DeviceEventEmitter.addListener(
      "equipoFavoritoCambiado",
      (equipo) => {
        setEquipo(equipo);
      },
    );

    const obtenerEquipo = async () => {
      const equipoGuardado = await AsyncStorage.getItem("miEquipo");
      if (equipoGuardado) {
        setEquipo(equipoGuardado);
      }
    };

    obtenerEquipo();

    return () => subscripccion.remove();
  }, []);

  useEffect(() => {
    if (!proximoPartido) return;

    setTiempoRestante(calcularTiempo(proximoPartido.fecha));
    const intervalo = setInterval(() => {
      setTiempoRestante(calcularTiempo(proximoPartido.fecha));
    }, 60000);

    return () => clearInterval(intervalo);
  }, [proximoPartido]);

  if (isLoading) {
    <Loading message="Cargando datos..." />;
  }

  return (
    <View style={styles.container}>
      {/* //Header */}

      <ImageBackground
        source={require("@/../assets/images/stadium.png")}
        style={styles.header}
        imageStyle={{ borderRadius: 20, opacity: 0.4 }}
        resizeMode="cover"
      >
        {/* Mi equipo */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: data?.flag }}
            style={styles.flag}
            contentFit="contain"
            transition={200}
          />
          <View style={{ marginLeft: 15 }}>
            <View style={styles.miEquipoContainer}>
              <Text style={styles.miEquipoText}>Mi Equipo</Text>
            </View>
            <Text
              style={{
                fontSize: 30,
                color: "white",
                fontWeight: "bold",
                marginTop: 4,
              }}
            >
              {data?.nombre}
            </Text>
          </View>
        </View>

        {/* Next Match */}
        <View style={styles.proximoPartidoContainer}>
          <View>
            <Text
              style={{ color: "#d1d5db", fontWeight: "bold", fontSize: 20 }}
            >
              Proximo Partido
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "white",
                textAlign: "center",
                fontWeight: "900",
              }}
            >
              VS{" "}
              {proximoPartido?.equipoLocal.name === data?.nombre
                ? proximoPartido?.equipoVisitante.name
                : proximoPartido?.equipoLocal.name}
            </Text>
          </View>

          <View>
            <Text style={styles.hora}>{tiempoRestante}</Text>
            <Text style={{ color: "#d1d5db", marginVertical: 5 }}>
              Dias:Hrs:Mins
            </Text>
          </View>
        </View>
      </ImageBackground>

      {/* Stats del torneo */}
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginTop: 10,
          justifyContent: "space-between",
        }}
      >
        {/* Posicion del grupo */}
        <CardStat
          title="1st"
          subtitle="Posicion del grupo"
          icon="stats-chart-outline"
          colorIcono="#0ea5e9"
        />

        {/* Goles Anotados */}
        <CardStat
          title="7"
          subtitle="Goles en el torneo"
          icon="football"
          colorIcono="#22c55e"
        />
      </View>

      {/* Partidos */}
      <FlatList
        data={partidos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PartidoCard partido={item} />}
        contentContainerStyle={{
          gap: 15,
          paddingBottom: 20,
          flexDirection: "row",
        }}
      />
    </View>
  );
};

export default MyTeamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    padding: 5,
    backgroundColor: Colors.neutral,
  },
  header: {
    padding: 15,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  flag: {
    borderRadius: 50,
    width: 60,
    height: 60,
    objectFit: "contain",
    borderWidth: 2,
    borderColor: "green",
  },

  miEquipoContainer: {
    backgroundColor: Colors.primary + "25",
    borderColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    alignSelf: "flex-start",

    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },

  miEquipoText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",

    textShadowColor: Colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },

  proximoPartidoContainer: {
    borderWidth: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: Colors.border,
    borderRadius: 15,
    padding: 12,
    marginTop: 15,
    backgroundColor: "rgba(15, 23, 42, 0.75)",
  },

  hora: {
    fontWeight: "bold",
    fontSize: 25,
    color: Colors.secondary,
    textAlign: "center",
  },
});
