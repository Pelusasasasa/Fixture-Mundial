import IonIcons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import MenuButton from "../../components/ui/MenuButton";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#001133",
        },
        headerTintColor: "#fff",
        headerLeft: () => <MenuButton />,
        headerTitle: () => (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <IonIcons name="football-outline" size={26} color="#00ff88" />
            <Text
              style={{ color: "#00ff88", fontWeight: "bold", fontSize: 24 }}
            >
              Fixture
            </Text>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="partidos"
        options={{
          title: "Partidos",
          tabBarIcon: ({ color, size }) => (
            <IonIcons name="football" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="grupos"
        options={{
          title: "Grupos",
          tabBarIcon: ({ color, size }) => (
            <IonIcons name="list-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="myteam"
        options={{
          title: "MiEquipo",
          tabBarIcon: ({ color, size }) => (
            <IonIcons name="headset-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
