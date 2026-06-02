import { ComponentProps } from "react";
import Colors from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  subtitle?: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  colorIcono?: string;
}

export default function CardStat({ title, subtitle, icon, colorIcono }: Props) {
  return (
    <View style={styles.container}>
      {icon && (
        <Ionicons
          style={{ borderRadius: 50, padding: 5, paddingBottom: 20 }}
          name={icon}
          color={colorIcono ?? Colors.primary}
          size={30}
        />
      )}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#d1d5db",
    fontSize: 14,
  },
});
