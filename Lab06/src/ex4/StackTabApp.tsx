import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../theme";
import { FavoritesProvider } from "./FavoritesContext";
import { FavoritesTab } from "./FavoritesTab";
import { ProductDetailsScreen } from "./ProductDetailsScreen";
import { ProductsTab } from "./ProductsTab";
import type { RootParamList, TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootParamList>();
type TabRoute = { name: keyof TabParamList };
type IconProps = { color: string; focused: boolean; size: number };

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: TabRoute }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarIcon: ({ color, focused, size }: IconProps) => {
          const icon =
            route.name === "Products"
              ? focused
                ? "list"
                : "list-outline"
              : focused
                ? "heart"
                : "heart-outline";
          return <Ionicons color={color} name={icon} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Products" component={ProductsTab} options={{ title: "Sản phẩm" }} />
      <Tab.Screen name="Favorites" component={FavoritesTab} options={{ title: "Yêu thích" }} />
    </Tab.Navigator>
  );
}

export function StackTabApp() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeTabs} options={{ title: "Cửa hàng" }} />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: "Chi tiết sản phẩm" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
