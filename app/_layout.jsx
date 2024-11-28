import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={({ route }) => ({
            headerShown:false,
            drawerActiveTintColor: "tomato",
            drawerInactiveTintColor: "gray",
            drawerLabelStyle: { fontSize: 18, marginLeft: -10 },
            drawerIcon: () => {
              let iconName;
              if (route.name === "index") {
                iconName = "add-chart";
              }
              if (route.name === "(tabs)") {
                iconName = "airplanemode-active";
              }
              return <MaterialIcons name={iconName} />;
            },
          })}
        >
          <Drawer.Screen
            name="index" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Home",
              title: "overview",
            }}
          >
            
          </Drawer.Screen>
         
          {/* <Stack screenOptions={{ headerShown: false }}>
  <Stack.Screen name="index" />
</Stack>   */}
        </Drawer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
