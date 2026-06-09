// src/components/ui/SelectModal.tsx
import { Seleccion } from "@/interface/Seleccion";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Definimos que el componente usa un tipo "T" (genérico)
interface Props {
  visible: boolean;
  data: Seleccion[];
  onSelect: (item: Seleccion) => void;
  onClose: () => void;
  title?: string;
}

export default function SelectModal({
  visible,
  data,
  onSelect,
  onClose,
  title = "Seleccionar",
}: Props) {
  const [search, setSearch] = useState<string>("");
  const filterData = (items: Seleccion[]) => {
    if (!search) return items;
    return items.filter((item) =>
      item.nombre.toLowerCase().includes(search.toLowerCase()),
    );
  };

  const handleSelect = (item: Seleccion) => {
    onSelect(item);
    setSearch("");
    onClose();
  };

  const filtered = filterData(data);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoiding}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#A3A3A3" />
            </TouchableOpacity>
          </View>
          <View style={styles.searchBar}>
            <Ionicons
              name="search"
              size={20}
              color="#A3A3A3"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Buscar..."
              placeholderTextColor="#9ca3af"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>
          <FlatList
            data={filtered}
            keyExtractor={(item, index) => `${item.nombre}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={styles.option}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Image
                    source={{ uri: item.flag }}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text style={styles.optionText}>{item.nombre}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#A3A3A3" />
              </TouchableOpacity>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    height: "75%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
  },
  handleContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  handle: {
    width: 48,
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 99,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },
  closeButton: {
    padding: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 99,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1f2937",
  },
});
