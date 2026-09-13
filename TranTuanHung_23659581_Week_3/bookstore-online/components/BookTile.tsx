import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Book } from "../data";
import { DiscountBadge } from "./DiscountBadge";

export function BookTile({ book }: { book: Book }) {
  return (
    <View style={styles.tile}>
      <View style={styles.coverWrap}>
        <Image source={{ uri: book.cover }} style={styles.cover} />
        <DiscountBadge discountPercent={book.discountPercent} isNew={book.isNew} />
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {book.title}
      </Text>
      <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flexDirection: "column",
  },
  coverWrap: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#EEF2F7",
  },
  cover: {
    width: "100%",
    height: "100%",
  },
  title: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  price: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "700",
    color: "#1E1B4B",
  },
});
