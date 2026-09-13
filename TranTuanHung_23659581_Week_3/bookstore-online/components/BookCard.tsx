import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Book } from "../data";
import { DiscountBadge } from "./DiscountBadge";

export function BookCard({ book }: { book: Book }) {
  return (
    <View style={styles.card}>
      <View style={styles.coverWrap}>
        <Image source={{ uri: book.cover }} style={styles.cover} />
        <DiscountBadge discountPercent={book.discountPercent} isNew={book.isNew} />
      </View>

      <View style={styles.info}>
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.author} numberOfLines={1}>
            {book.author}
          </Text>
        </View>

        <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  coverWrap: {
    width: 80,
    height: 110,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#EEF2F7",
  },
  cover: {
    width: "100%",
    height: "100%",
  },
  info: {
    flex: 1,
    marginLeft: 12,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  author: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E1B4B",
  },
});
