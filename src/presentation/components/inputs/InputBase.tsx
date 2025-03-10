import React from "react";
import { TextInput, View, StyleSheet, Text, TextInputProps } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Controller, Control, FieldValues } from "react-hook-form";

interface InputBaseProps extends TextInputProps {
  name: string
  error?: any
  label?: string
  icon?: string
  onChangeText: (text:string) => void
  value?: string
  disabled?: boolean;
}

export const InputBase = ({ name, error, label, icon, onChangeText, value="", disabled, ...props }: InputBaseProps) => {
  return (
    <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          <View style={[styles.inputContainer, error ? styles.errorBorder : null,  disabled ? styles.disabledInput : null ]}>
            {icon && <Ionicons testID="input-icon" name={icon} size={20} color={error ? "#D32F2F" : "#888"} style={styles.icon} />}
            <TextInput style={styles.input}
                       value={value}
                       onChangeText={onChangeText}
                       placeholderTextColor={error ? "#D32F2F" : "#888"}
                       {...props}
             />
          </View>
          {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#222"
  },
  errorBorder: {
    borderColor: "#D32F2F",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 12,
    marginTop: 4,
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
    opacity: 0.6, 
    borderColor: "#ccc",
  },
});
