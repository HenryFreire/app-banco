import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { InputBase } from "../../../presentation/components/inputs/InputBase";

describe("InputBase", () => {
  test("Debe renderizar correctamente el componente con etiqueta", () => {
    const { getByText, getByPlaceholderText } = render(
      <InputBase 
        name="test-input" 
        label="Nombre" 
        placeholder="Ingrese su nombre" 
        onChangeText={() => {}} 
      />
    );

    expect(getByText("Nombre")).toBeTruthy();
    expect(getByPlaceholderText("Ingrese su nombre")).toBeTruthy();
  });

   test("Debe mostrar un icono si se proporciona", () => {
    const { getByTestId } = render(
      <InputBase 
        name="test-input" 
        icon="person" 
        onChangeText={() => {}} 
      />
    );

    expect(getByTestId("input-icon")).toBeTruthy();
  });

  /*test("Debe cambiar el valor cuando el usuario escribe", () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <InputBase 
        name="test-input" 
        placeholder="Ingrese su nombre" 
        onChangeText={mockOnChangeText} 
      />
    );

    fireEvent.changeText(getByPlaceholderText("Ingrese su nombre"), "Nuevo texto");
    expect(mockOnChangeText).toHaveBeenCalledWith("Nuevo texto");
  });

  test("Debe mostrar un mensaje de error si hay un error", () => {
    const errorMessage = "Campo requerido";
    const { getByText } = render(
      <InputBase 
        name="test-input" 
        error={{ message: errorMessage }} 
        onChangeText={() => {}} 
      />
    );

    expect(getByText(errorMessage)).toBeTruthy();
  });

  test("Debe aplicar estilos de error cuando hay un error", () => {
    const errorMessage = "Campo requerido";
    const { getByTestId } = render(
      <InputBase 
        name="test-input" 
        error={{ message: errorMessage }} 
        onChangeText={() => {}} 
      />
    );

    expect(getByTestId("input-container").props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ borderColor: "#D32F2F" })])
    );
  });

  test("Debe deshabilitar la entrada si `disabled` es `true`", () => {
    const { getByTestId } = render(
      <InputBase 
        name="test-input" 
        disabled={true} 
        onChangeText={() => {}} 
      />
    );

    expect(getByTestId("input-container").props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: "#f0f0f0", opacity: 0.6 })])
    );
  }); */
});
