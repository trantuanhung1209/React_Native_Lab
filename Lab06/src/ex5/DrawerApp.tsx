import React, { createContext, useContext, useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import { colors } from "../theme";

export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

type Preferences = {
  notify: boolean;
  dark: boolean;
  setNotify: (value: boolean) => void;
  setDark: (value: boolean) => void;
};

const PreferencesContext = createContext<Preferences | null>(null);

function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used inside PreferencesProvider");
  }
  return context;
}

function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);
  const value = useMemo(
    () => ({ notify, dark, setNotify, setDark }),
    [notify, dark],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

type ScreenProps<RouteName extends keyof DrawerParamList> = DrawerScreenProps<
  DrawerParamList,
  RouteName
>;

function HomeScreen({}: ScreenProps<"Home">) {
  const { dark } = usePreferences();
  return (
    <SafeAreaView style={[s.screen, dark && s.darkScreen]}>
      <Text style={[s.greeting, dark && s.darkText]}>Xin chào 👋</Text>
      <Text style={[s.subtext, dark && s.darkSubtext]}>
        Chào mừng bạn đến với ứng dụng.
      </Text>
    </SafeAreaView>
  );
}

function ProfileScreen({}: ScreenProps<"Profile">) {
  const { dark } = usePreferences();
  return (
    <SafeAreaView style={[s.screen, dark && s.darkScreen]}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>T</Text>
      </View>
      <Text style={[s.profileName, dark && s.darkText]}>Trần Tuấn Hưng</Text>
      <Text style={[s.email, dark && s.darkSubtext]}>
        tranthuanhung@example.com
      </Text>
    </SafeAreaView>
  );
}

function SettingsScreen({}: ScreenProps<"Settings">) {
  const { notify, dark, setNotify, setDark } = usePreferences();
  return (
    <SafeAreaView style={[s.screen, s.settings, dark && s.darkScreen]}>
      <View style={s.settingRow}>
        <Text style={[s.settingLabel, dark && s.darkText]}>Thông báo</Text>
        <Switch
          onValueChange={setNotify}
          thumbColor={notify ? colors.red : "#f4f3f4"}
          trackColor={{ false: colors.line, true: "#F5AAA5" }}
          value={notify}
        />
      </View>
      <View style={s.settingRow}>
        <Text style={[s.settingLabel, dark && s.darkText]}>Giao diện tối</Text>
        <Switch
          onValueChange={setDark}
          thumbColor={dark ? colors.red : "#f4f3f4"}
          trackColor={{ false: colors.line, true: "#F5AAA5" }}
          value={dark}
        />
      </View>
      <Text style={[s.summary, dark && s.darkSubtext]}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện:{" "}
        {dark ? "tối" : "sáng"}
      </Text>
    </SafeAreaView>
  );
}

const Drawer = createDrawerNavigator<DrawerParamList>();
type DrawerRoute = { name: keyof DrawerParamList };
type DrawerIconProps = { color: string; size: number };

export function DrawerApp() {
  return (
    <PreferencesProvider>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={({ route }: { route: DrawerRoute }) => ({
            drawerActiveTintColor: colors.red,
            drawerIcon: ({ color, size }: DrawerIconProps) => {
              const icon =
                route.name === "Home"
                  ? "home-outline"
                  : route.name === "Profile"
                    ? "person-outline"
                    : "settings-outline";
              return <Ionicons color={color} name={icon} size={size} />;
            },
          })}
        >
          <Drawer.Screen
            component={HomeScreen}
            name="Home"
            options={{ title: "Trang chủ" }}
          />
          <Drawer.Screen
            component={ProfileScreen}
            name="Profile"
            options={{ title: "Cá nhân" }}
          />
          <Drawer.Screen
            component={SettingsScreen}
            name="Settings"
            options={{ title: "Cài đặt" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PreferencesProvider>
  );
}

const s = StyleSheet.create({
  screen: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  darkScreen: { backgroundColor: "#1F2430" },
  greeting: { color: colors.navy, fontSize: 30, fontWeight: "700" },
  subtext: { color: colors.muted, fontSize: 16, marginTop: 10 },
  darkText: { color: "#fff" },
  darkSubtext: { color: "#D8DCE3" },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.blue,
    borderRadius: 48,
    height: 96,
    justifyContent: "center",
    width: 96,
  },
  avatarText: { color: "#fff", fontSize: 30, fontWeight: "700" },
  profileName: { color: colors.text, fontSize: 24, fontWeight: "700", marginTop: 18 },
  email: { color: colors.muted, fontSize: 16, marginTop: 8 },
  settings: { alignItems: "stretch", justifyContent: "flex-start", paddingTop: 28 },
  settingRow: {
    alignItems: "center",
    borderBottomColor: colors.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  settingLabel: { color: colors.text, fontSize: 17 },
  summary: { color: colors.muted, fontSize: 15, marginTop: 24 },
});
