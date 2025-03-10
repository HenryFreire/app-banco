import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useForm, Controller } from "react-hook-form";
import { CalendarInputControl } from "../../../presentation/components/inputs/CalendarInputControl";
import moment from "moment";

jest.mock("@react-native-community/datetimepicker", () => jest.fn(() => null));

describe("CalendarInputControl", () => {
  const TestComponent = () => {
    const { control } = useForm({
        defaultValues: { date: new Date("2024-01-01T00:00:00.000Z") },
    });

    return <CalendarInputControl name="date" control={control} label="Fecha" />;
  };

  test("Debe renderizar el componente correctamente", () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText("Fecha")).toBeTruthy(); 
  });


});
