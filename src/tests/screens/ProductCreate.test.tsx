import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ProductCreateScreen } from "../../presentation/screens/ProductCreateScreen";
import { ProductRepositoryImpl } from "../../data/repositories/ProductRepositoryImpl";
import { LoadingContext } from "../../presentation/context/LoadingContext.ts/LoadingContext";
import { ThemeProvider } from "../../presentation/context/themeContext/ThemeProvider";
import { Alert } from "react-native";

// Mock de `ProductRepositoryImpl`
jest.mock("../../data/repositories/ProductRepositoryImpl");

// Mock de `useNavigation`
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("ProductCreateScreen", () => {
  let mockCreateProduct: jest.Mock;
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockCreateProduct = jest.fn().mockResolvedValue({
      id: "456",
      name: "Nuevo Producto",
      description: "Descripción del producto",
      logo: "https://logo.com/logo.png",
      date_release: new Date("2025-01-01"),
      date_revision: new Date("2026-01-01"),
    });

    (ProductRepositoryImpl as jest.Mock).mockImplementation(() => ({
      createProduct: mockCreateProduct,
    }));

    mockNavigate = jest.fn();

    jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks(); 
  });

  test("Debe renderizar correctamente la pantalla de creación", async () => {
    const { getByText } = render(
      <ThemeProvider>
        <LoadingContext.Provider value={{ loading: false, setLoading: jest.fn() }}>
          <NavigationContainer>
            <ProductCreateScreen />
          </NavigationContainer>
        </LoadingContext.Provider>
      </ThemeProvider>
    );

    expect(getByText("Formulario de Registro")).toBeTruthy();
  });

 

  
});
