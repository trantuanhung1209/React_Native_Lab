import React from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { PHONE_COLORS, PHONES } from "../data/phones";
import { formatPrice } from "../theme";
import type { Phone } from "../types";
import type { TabProps } from "./types";

export function ProductRow({
  phone,
  onPress,
}: {
  phone: Phone;
  onPress: () => void;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.row}>
      <Image
        source={PHONE_COLORS[phone.defaultColor].image}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.name}>
          {phone.name}
        </Text>
        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
      </View>
    </Pressable>
  );
}

export function ProductsTab({ navigation }: TabProps<"Products">) {
  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={PHONES}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductRow
          phone={item}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: "#fff", gap: 12, padding: 16 },
  row: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#D8DCE3",
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    padding: 12,
  },
  image: { height: 82, width: 82 },
  info: { flex: 1, marginLeft: 14 },
  name: { color: "#1F2430", fontSize: 16, lineHeight: 22 },
  price: { color: "#E53A2F", fontSize: 16, fontWeight: "700", marginTop: 9 },
});
