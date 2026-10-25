import React from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { PHONE_COLORS, PHONES } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";
import type { RootProps } from "./types";

export function ProductDetailsScreen({
  route,
}: RootProps<"ProductDetails">) {
  const { id } = route.params;
  const phone = PHONES.find((item) => item.id === id);
  const { ids, toggle } = useFavorites();

  if (!phone) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const saved = ids.includes(phone.id);
  return (
    <SafeAreaView style={styles.screen}>
      <Image
        source={PHONE_COLORS[phone.defaultColor].image}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.name}>{phone.name}</Text>
      <View style={styles.rating}>
        <Stars value={phone.rating} />
        <Text style={styles.reviews}>({phone.reviewCount} đánh giá)</Text>
      </View>
      <Text style={styles.price}>{formatPrice(phone.price)}</Text>
      <Text style={styles.supplier}>Cung cấp bởi {phone.supplier}</Text>
      <Pressable onPress={() => toggle(phone.id)} style={styles.favoriteButton}>
        <Text style={styles.favoriteText}>
          {saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: "#fff", flex: 1, padding: 16 },
  image: { alignSelf: "center", height: 230, width: "75%" },
  name: { color: colors.text, fontSize: 19, fontWeight: "700", lineHeight: 27, marginTop: 12 },
  rating: { alignItems: "center", flexDirection: "row", marginTop: 14 },
  reviews: { color: colors.muted, marginLeft: 8 },
  price: { color: colors.red, fontSize: 24, fontWeight: "700", marginTop: 15 },
  supplier: { color: colors.muted, fontSize: 15, marginTop: 10 },
  favoriteButton: { backgroundColor: colors.red, borderRadius: 6, marginTop: 24, padding: 14 },
  favoriteText: { color: "#fff", fontSize: 16, fontWeight: "700", textAlign: "center" },
  notFound: { alignItems: "center", flex: 1, justifyContent: "center", padding: 20 },
  notFoundText: { color: colors.text, fontSize: 17 },
});
