import React, { useState } from "react";
import { StyleSheet, TextInputProps, TouchableOpacity, View, Platform } from "react-native";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { InputBase } from "./InputBase";

interface CalendarInputControlProps<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  icon?: string;
  mode?: "date" | "time";
  placeholder?: string;
}

export function CalendarInputControl<T extends FieldValues>({
  name,
  control,
  label,
  icon,
  mode = "date",
  placeholder = "Seleccionar fecha",
  ...props
}: CalendarInputControlProps<T>) {
  const [show, setShow] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setShow(true)}>
            <InputBase
              name={name}
              error={error}
              label={label}
              icon={icon}
              value={value ? moment(value).format(mode === "date" ? "DD/MM/YYYY" : "HH:mm") : ""}
              editable={false} 
              onChangeText={() => setShow(true)} 
              {...props}
            />
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              testID="date-picker"
              value={value ? new Date(value) : new Date()}
              mode={mode}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShow(false);
                if (selectedDate) {
                  onChange(selectedDate); 
                }
              }}
            />
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
  },
});
