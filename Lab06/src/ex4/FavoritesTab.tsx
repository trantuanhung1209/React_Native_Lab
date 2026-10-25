import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PHONES } from "../data/phones";
import { useFavorites } from "./FavoritesContext";
import { ProductRow } from "./ProductsTab";
import type { TabProps } from "./types";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const phones = PHONES.filter((phone) => ids.includes(phone.id));

  if (phones.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={phones}
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
  empty: { alignItems: "center", backgroundColor: "#fff", flex: 1, justifyContent: "center", padding: 20 },
  emptyText: { color: "#6B7280", fontSize: 16 },
  list: { backgroundColor: "#fff", gap: 12, padding: 16 },
});
