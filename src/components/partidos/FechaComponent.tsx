import Colors from "@/constants/colors";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  fechaSeleccionada: number;
  setFechaSeleccionada: (fecha: number) => void;
}

export default function FechaComponent({
  fechaSeleccionada,
  setFechaSeleccionada,
}: Props) {
  return (
    <FlatList
      horizontal
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      renderItem={({ item }) => (
        <FechaItem
          fechaSeleccionada={fechaSeleccionada}
          setFechaSeleccionada={setFechaSeleccionada}
          item={item}
        />
      )}
      keyExtractor={(item) => item.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
}

interface PropsItem extends Props {
  item: number;
}

const FechaItem = ({
  fechaSeleccionada,
  setFechaSeleccionada,
  item,
}: PropsItem) => {
  return (
    <TouchableOpacity
      style={[
        styles.fecha,
        { backgroundColor: fechaSeleccionada === item ? "#808080ff" : "#FFF" },
      ]}
      onPress={() => setFechaSeleccionada(item)}
    >
      <Text
        style={[
          styles.texto,
          { color: fechaSeleccionada === item ? Colors.primary : "" },
        ]}
      >
        FECHA {item}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fecha: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  texto: {
    fontWeight: "bold",
  },
});
