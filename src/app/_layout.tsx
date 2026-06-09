import CustomDrawer from "@/components/ui/CustomDrawer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Drawer from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 10,
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style={isDark ? "light" : "dark"} />
        <Drawer
          drawerContent={(props) => <CustomDrawer {...props} />}
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              backgroundColor: isDark ? "#111827" : "#ffffff",
            },
          }}
        />
      </QueryClientProvider>
    </SafeAreaView>
  );
}
