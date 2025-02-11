import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  size?: "small" | "large";
  disabled?: boolean;
  loading?: boolean;
};

export function CustomButton({
  title,
  onPress,
  size = "large",
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        size === "small" ? styles.buttonSmall : styles.buttonLarge,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#2C3E50",
  },
  buttonLarge: {
    backgroundColor: "#2C3E50",
    padding: 10,
    width: 195,
  },
  buttonSmall: {
    backgroundColor: "#2C3E50",
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16,
    height: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "normal",
  },
  buttonDisabled: {
    backgroundColor: "#A9A9A9",
  },
});
