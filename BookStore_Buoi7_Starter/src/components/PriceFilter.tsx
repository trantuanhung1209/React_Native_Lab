import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PRICE_RANGES, PriceRange } from "../utils/filters";
import { colors, radius } from "../theme";
import { TodoBox } from "./TodoBox";

interface Props {
  value: PriceRange;
  onChange: (v: PriceRange) => void;
}

// THỬ THÁCH: 3 nút lọc khoảng giá (bấm lần nữa để bỏ chọn)
export function PriceFilter({ value, onChange }: Props) {
  // TODO BT7.C2: render 3 nút từ PRICE_RANGES (import từ utils/filters); nút đang chọn có nền cyan (colors.cyan)
  //   active = value === r.key · onPress = onChange(active ? null : r.key)   (mẫu: xem CategoryChips)
  return (
    <View style={styles.row}>
      {PRICE_RANGES.map((r) => {
        const active = value === r.key;
        return (
          <Pressable
            key={r.key}
            onPress={() => onChange(active ? null : r.key)}
            style={[styles.btn, active && styles.btnActive]}
          >
            <Text style={[styles.text, active && styles.textActive]}>{r.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", paddingHorizontal: 12, paddingBottom: 10, gap: 8 },
  btn: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: radius.md, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line },
  btnActive: { backgroundColor: colors.cyan, borderColor: colors.cyan },
  text: { color: colors.text, fontSize: 13, fontWeight: "600" },
  textActive: { color: "#fff" },
});
