import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

interface ErrorBoxProps {
  message: string;
  onRetry: () => void;
}

export function ErrorBox({ message, onRetry }: ErrorBoxProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Pressable accessibilityRole="button" onPress={onRetry} style={styles.button}>
        <Text style={styles.buttonText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: 1, justifyContent: "center", padding: 24 },
  message: { color: colors.text, textAlign: "center" },
  button: {
    backgroundColor: colors.blue,
    borderRadius: 6,
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
});
