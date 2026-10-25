import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.blue} size="large" />
      <Text style={styles.text}>Đang tải...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: 1, justifyContent: "center" },
  text: { color: colors.muted, marginTop: 12 },
});
