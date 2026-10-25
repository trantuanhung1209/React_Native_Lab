import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import type { ColorKey, Phone } from "../types";
import type { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(
    route.params?.color,
  );
  const selected = picked ? PHONE_COLORS[picked] : undefined;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.preview}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          resizeMode="contain"
          style={styles.image}
        />
        <Text numberOfLines={2} style={styles.name}>
          {phone.name}
        </Text>
      </View>
      <View style={styles.options}>
        <View>
          {selected && (
            <>
              <Text style={styles.detail}>
                Màu: <Text style={styles.strong}>{selected.label}</Text>
              </Text>
              <Text style={styles.detail}>
                Cung cấp bởi{" "}
                <Text style={styles.strong}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.detailPrice}>{formatPrice(phone.price)}</Text>
            </>
          )}
          <View style={styles.colorList}>
            {COLOR_ORDER.map((color) => {
              const item = PHONE_COLORS[color];
              const active = picked === color;
              return (
                <Pressable
                  accessibilityRole="button"
                  key={color}
                  onPress={() => setPicked(color)}
                  style={[styles.colorOption, active && styles.activeOption]}
                >
                  <View style={[styles.swatch, { backgroundColor: item.hex }]} />
                  <Text style={styles.colorLabel}>{item.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          disabled={!picked}
          onPress={() =>
            navigation.navigate("Product", { color: picked }, { merge: true })
          }
          style={styles.doneButton}
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: "#fff", flex: 1 },
  preview: { flex: 1, padding: 16 },
  image: { flex: 1, width: "100%" },
  name: { color: colors.text, fontSize: 17, lineHeight: 24 },
  options: {
    backgroundColor: colors.grey,
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  detail: { color: colors.text, fontSize: 16, marginBottom: 7 },
  strong: { fontWeight: "700" },
  detailPrice: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "700",
    marginTop: 4,
  },
  colorList: { marginTop: 16 },
  colorOption: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "transparent",
    borderRadius: 4,
    borderWidth: 2,
    flexDirection: "row",
    marginBottom: 8,
    padding: 8,
  },
  activeOption: { borderColor: colors.blue },
  swatch: { borderColor: colors.line, borderRadius: 3, borderWidth: 1, height: 36, width: 36 },
  colorLabel: { color: colors.text, fontSize: 15, marginLeft: 12 },
  doneButton: {
    alignItems: "center",
    backgroundColor: colors.blue,
    borderRadius: 4,
    justifyContent: "center",
    paddingVertical: 13,
  },
  doneText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
