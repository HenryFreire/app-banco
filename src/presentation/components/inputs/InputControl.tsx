import React from "react";
import { StyleSheet, TextInputProps } from "react-native";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { InputBase } from "./InputBase";

interface InputControlProps<T extends FieldValues> extends TextInputProps {
  name: Path<T>
  control: Control<T> 
  label?: string
  icon?: string
  disabled?: boolean
}

export function InputControl <T extends FieldValues>({ name, control, label, icon, disabled=false, ...props }: InputControlProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputBase name={name}
                   error={error}
                   label={label}
                   icon={icon}
                   onChangeText={onChange}
                   value={value}
                   disabled={disabled}
                   {...props}
        />
      )}
    />
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
    height: 40,
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
});
