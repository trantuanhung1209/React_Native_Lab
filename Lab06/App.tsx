import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { PHONES } from "./src/data/phones";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";

const SelectPhoneLocal = <SelectPhoneApp phone={PHONES[0]} />;
const SelectPhoneApiLocal = <SelectPhoneApi />;
const BottomTabLocal = <BottomTabApp />;
const StackTabLocal = <StackTabApp />;
const DrawerLocal = <DrawerApp />;

const LESSONS = [
  { id: 1, title: "Bài 1", description: "Select Phone" },
  { id: 2, title: "Bài 2", description: "Select Phone + API" },
  { id: 3, title: "Bài 3", description: "Bottom Tab Navigation" },
  { id: 4, title: "Bài 4", description: "Stack + Tab + Passing Params" },
  { id: 5, title: "Bài 5", description: "Drawer Navigation" },
] as const;

export default function App() {
  const [selectedLesson, setSelectedLesson] = useState(1);
  const lesson = LESSONS.find((item) => item.id === selectedLesson) ?? LESSONS[0];

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Lab 6 — Navigation</Text>
        <Text style={styles.subtitle}>Chọn bài thực hành</Text>

        <View style={styles.menu}>
          {LESSONS.map((item) => {
            const active = item.id === selectedLesson;
            return (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => setSelectedLesson(item.id)}
                style={[styles.lesson, active && styles.lessonActive]}
              >
                <Text style={[styles.lessonTitle, active && styles.textLight]}>
                  {item.title}
                </Text>
                <Text style={[styles.lessonDescription, active && styles.textLight]}>
                  {item.description}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {selectedLesson === 1 ? (
          <View style={styles.phoneApp}>{SelectPhoneLocal}</View>
        ) : selectedLesson === 2 ? (
          <View style={styles.phoneApp}>{SelectPhoneApiLocal}</View>
        ) : selectedLesson === 3 ? (
          <View style={styles.phoneApp}>{BottomTabLocal}</View>
        ) : selectedLesson === 4 ? (
          <View style={styles.phoneApp}>{StackTabLocal}</View>
        ) : selectedLesson === 5 ? (
          <View style={styles.phoneApp}>{DrawerLocal}</View>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderTitle}>{lesson.title}</Text>
            <Text style={styles.placeholderText}>
              Khu vực triển khai: {lesson.description}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F4F5F7" },
  content: { padding: 20 },
  title: { color: "#0B1F5C", fontSize: 28, fontWeight: "700" },
  subtitle: { color: "#6B7280", fontSize: 16, marginTop: 6 },
  menu: { gap: 12, marginTop: 24 },
  lesson: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D8DCE3",
    borderRadius: 10,
    borderWidth: 1,
    padding: 16,
  },
  lessonActive: { backgroundColor: "#4F63C8", borderColor: "#4F63C8" },
  lessonTitle: { color: "#1F2430", fontSize: 17, fontWeight: "700" },
  lessonDescription: { color: "#6B7280", marginTop: 4 },
  textLight: { color: "#FFFFFF" },
  placeholder: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 28,
    padding: 24,
  },
  placeholderTitle: { color: "#0B1F5C", fontSize: 20, fontWeight: "700" },
  placeholderText: { color: "#6B7280", marginTop: 8, textAlign: "center" },
  phoneApp: { height: 680, marginTop: 28 },
});
