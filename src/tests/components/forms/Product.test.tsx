import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import moment from "moment";
import { ThemeContext } from "../../../presentation/context/themeContext/ThemeContext";
import ProductForm from "../../../presentation/components/forms/Product";
import { ProductRepositoryImpl } from "../../../data/repositories/ProductRepositoryImpl";

jest.mock("../../../data/repositories/ProductRepositoryImpl");

const mockThemeContext = {
    theme: {
      colors: {
        background: "#ffffff",
        text: "#000000",
        danger: "#ff0000",
        gris: "#cccccc",
        white: "#ffffff",
        primary: "#3498db",
        secondary: "#2ecc71",
        buttonText: "#ffffff",
      },
    },
    toogleTheme: jest.fn(), 
  };

describe("ProductForm", () => {
  const mockOnSubmit = jest.fn();

  test("Debe renderizar correctamente", () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <ProductForm onSubmit={mockOnSubmit} />
      </ThemeContext.Provider>
    );

    expect(getByText("ID")).toBeTruthy();
    expect(getByText("Nombre")).toBeTruthy();
    expect(getByText("Descripción")).toBeTruthy();
    expect(getByText("Logo")).toBeTruthy();
    expect(getByText("Fecha Liberación")).toBeTruthy();
    expect(getByText("Fecha Revisión")).toBeTruthy();
    expect(getByText("Enviar")).toBeTruthy();
    expect(getByText("Reiniciar")).toBeTruthy();
  });

  test("Debe mostrar mensajes de error si los campos están vacíos", async () => {
    const { getByText, getAllByText } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <ProductForm onSubmit={mockOnSubmit} />
      </ThemeContext.Provider>
    );
  
    fireEvent.press(getByText("Enviar"));
  
    await waitFor(() => {
      expect(getAllByText("El nombre es obligatorio").length).toBeGreaterThan(0); 
      expect(getByText("La descripción es obligatoria")).toBeTruthy();
      expect(getByText("El logo es obligatorio")).toBeTruthy();
    });
  });

   test("Debe mostrar error si el ID ya existe", async () => {
    (ProductRepositoryImpl.prototype.validId as jest.Mock).mockResolvedValue(true);

    const { getByText, getByTestId } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <ProductForm onSubmit={mockOnSubmit} />
      </ThemeContext.Provider>
    );

    const idInput = getByTestId("input-id");
    fireEvent.changeText(idInput, "123");

    fireEvent.press(getByText("Enviar"));

    await waitFor(() => {
      expect(getByText("El ID ya existe")).toBeTruthy();
    });
  }); 



  

  test("Debe reiniciar el formulario al presionar `Reiniciar`", async () => {
    const { getByText, getByTestId } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <ProductForm onSubmit={mockOnSubmit} />
      </ThemeContext.Provider>
    );

    fireEvent.changeText(getByTestId("input-name"), "Nuevo Producto");
    fireEvent.press(getByText("Reiniciar"));

    await waitFor(() => {
      expect(getByTestId("input-name").props.value).toBe(""); // Debe reiniciarse
    });
  });  
});
