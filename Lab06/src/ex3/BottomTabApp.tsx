import React, { useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PHONES } from "../data/phones";
import { colors, formatPrice } from "../theme";
import type { Phone } from "../types";

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const ICONS = {
  Home: { focused: "home", unfocused: "home-outline" },
  Search: { focused: "search", unfocused: "search-outline" },
  Profile: { focused: "person", unfocused: "person-outline" },
} as const;

function PhoneCard({ phone }: { phone: Phone }) {
  return (
    <View style={s.card}>
      <Text numberOfLines={2} style={s.cardName}>
        {phone.name}
      </Text>
      <View style={s.cardPrices}>
        <Text style={s.cardPrice}>{formatPrice(phone.price)}</Text>
        <Text style={s.cardOldPrice}>{formatPrice(phone.oldPrice)}</Text>
      </View>
      <Text style={s.cardSupplier}>{phone.supplier}</Text>
    </View>
  );
}

function HomeTab() {
  return (
    <SafeAreaView style={s.screen}>
      <Text style={s.heading}>Điện thoại</Text>
      <FlatList
        contentContainerStyle={s.list}
        data={PHONES}
        keyExtractor={(phone) => phone.id}
        renderItem={({ item }) => <PhoneCard phone={item} />}
      />
    </SafeAreaView>
  );
}

function SearchTab() {
  const [keyword, setKeyword] = useState("");
  const results = useMemo(() => {
    const normalizedKeyword = keyword.toLowerCase();
    return PHONES.filter((phone) =>
      phone.name.toLowerCase().includes(normalizedKeyword),
    );
  }, [keyword]);

  return (
    <SafeAreaView style={s.screen}>
      <Text style={s.heading}>Tìm kiếm</Text>
      <TextInput
        autoCapitalize="none"
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa"
        placeholderTextColor={colors.muted}
        style={s.input}
        value={keyword}
      />
      {results.length > 0 ? (
        <FlatList
          contentContainerStyle={s.list}
          data={results}
          keyExtractor={(phone) => phone.id}
          renderItem={({ item }) => <PhoneCard phone={item} />}
        />
      ) : (
        <Text style={s.empty}>
          Không có kết quả cho “{keyword}”.
        </Text>
      )}
    </SafeAreaView>
  );
}

function ProfileTab() {
  return (
    <SafeAreaView style={s.profileScreen}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>T</Text>
      </View>
      <Text style={s.profileName}>Trần Tuấn Hưng</Text>
      <Text style={s.email}>tranthuanhung@example.com</Text>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator<TabParamList>();
type IconProps = { color: string; focused: boolean; size: number };
type TabRoute = { name: keyof TabParamList };

export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }: { route: TabRoute }) => ({
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.muted,
          tabBarIcon: ({ color, focused, size }: IconProps) => {
            const icon = ICONS[route.name][focused ? "focused" : "unfocused"];
            return (
              <Ionicons
                color={color}
                name={icon}
                size={size}
              />
            );
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          component={HomeTab}
          name="Home"
          options={{ title: "Trang chủ" }}
        />
        <Tab.Screen
          component={SearchTab}
          name="Search"
          options={{ title: "Tìm kiếm" }}
        />
        <Tab.Screen
          component={ProfileTab}
          name="Profile"
          options={{ title: "Cá nhân" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  screen: { backgroundColor: "#fff", flex: 1 },
  heading: {
    color: colors.navy,
    fontSize: 24,
    fontWeight: "700",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  list: { gap: 12, padding: 16 },
  card: {
    backgroundColor: colors.bg,
    borderColor: colors.line,
    borderRadius: 10,
    borderWidth: 1,
    padding: 14,
  },
  cardName: { color: colors.text, fontSize: 16, fontWeight: "600", lineHeight: 22 },
  cardPrices: { alignItems: "center", flexDirection: "row", marginTop: 10 },
  cardPrice: { color: colors.red, fontSize: 16, fontWeight: "700" },
  cardOldPrice: {
    color: colors.muted,
    fontSize: 13,
    marginLeft: 10,
    textDecorationLine: "line-through",
  },
  cardSupplier: { color: colors.muted, fontSize: 13, marginTop: 7 },
  input: {
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  empty: { color: colors.muted, padding: 16, textAlign: "center" },
  profileScreen: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.blue,
    borderRadius: 48,
    height: 96,
    justifyContent: "center",
    width: 96,
  },
  avatarText: { color: "#fff", fontSize: 42, fontWeight: "700" },
  profileName: { color: colors.text, fontSize: 24, fontWeight: "700", marginTop: 18 },
  email: { color: colors.muted, fontSize: 15, marginTop: 8 },
});
