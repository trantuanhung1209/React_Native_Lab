import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import type { ColorKey, Phone } from "../types";
import type { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked: ColorKey | undefined = route.params?.color;
  const shown: ColorKey = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image
          source={PHONE_COLORS[shown].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <Text style={styles.help}>?</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            navigation.navigate("ChooseColor", { color: picked })
          }
          style={styles.colorButton}
        >
          <Text style={styles.colorButtonText}>
            {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={styles.chevron}>{">"}</Text>
        </Pressable>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={() => undefined}
        style={styles.buyButton}
      >
        <Text style={styles.buyButtonText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  imageWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: "82%", height: "82%" },
  info: { paddingBottom: 88 },
  name: { color: colors.text, fontSize: 17, lineHeight: 24 },
  row: { alignItems: "center", flexDirection: "row", marginTop: 10 },
  review: { color: colors.muted, fontSize: 13, marginLeft: 8 },
  price: { color: colors.text, fontSize: 20, fontWeight: "700" },
  oldPrice: {
    color: colors.muted,
    fontSize: 14,
    marginLeft: 12,
    textDecorationLine: "line-through",
  },
  badgeRow: { alignItems: "center", flexDirection: "row", marginTop: 12 },
  badge: {
    backgroundColor: colors.red,
    borderRadius: 3,
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  help: {
    alignItems: "center",
    borderColor: colors.muted,
    borderRadius: 9,
    borderWidth: 1,
    color: colors.muted,
    fontSize: 12,
    height: 18,
    marginLeft: 8,
    textAlign: "center",
    width: 18,
  },
  colorButton: {
    borderColor: colors.line,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 18,
    padding: 13,
    position: "relative",
  },
  colorButtonText: { color: colors.text, fontSize: 15, fontWeight: "700" },
  chevron: {
    color: colors.text,
    fontSize: 22,
    position: "absolute",
    right: 12,
    top: 8,
  },
  buyButton: {
    alignItems: "center",
    backgroundColor: colors.red,
    borderRadius: 6,
    bottom: 12,
    justifyContent: "center",
    left: 16,
    paddingVertical: 14,
    position: "absolute",
    right: 16,
  },
  buyButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
