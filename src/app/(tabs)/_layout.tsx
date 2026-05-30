import IonIcons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="partidos"
        options={{
          title: "Partidos",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <IonIcons name="football" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="grupos"
        options={{
          title: "Grupos",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <IonIcons name="list-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="myteam"
        options={{
          title: "MiEquipo",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <IonIcons name="headset-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
