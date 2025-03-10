import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ProductRepositoryImpl } from "../../data/repositories/ProductRepositoryImpl";
import { LoadingContext } from "../../presentation/context/LoadingContext.ts/LoadingContext";
import { ThemeProvider } from "../../presentation/context/themeContext/ThemeProvider";
import { Alert } from "react-native";
import { ProductUpdateScreen } from "../../presentation/screens/ProductUpdateScreen";

// Mock de `ProductRepositoryImpl`
jest.mock("../../data/repositories/ProductRepositoryImpl");

// Mock de `useNavigation`
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  useRoute: () => ({
    params: { productId: "123" },
  }),
}));

describe("ProductUpdateScreen", () => {
  let mockGetOneProduct: jest.Mock;
  let mockUpdateProduct: jest.Mock;
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockGetOneProduct = jest.fn().mockResolvedValue({
      id: "123",
      name: "Producto Editado",
      description: "Descripción de prueba",
      logo: "https://logo.com/logo.png",
      date_release: new Date("2025-01-01"),
      date_revision: new Date("2026-01-01"),
    });

    mockUpdateProduct = jest.fn().mockResolvedValue("Producto actualizado");

    (ProductRepositoryImpl as jest.Mock).mockImplementation(() => ({
      getOneProduct: mockGetOneProduct,
      updateProduct: mockUpdateProduct,
    }));

    mockNavigate = jest.fn();

    jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks(); 
  });

  test("Debe renderizar correctamente la pantalla con los datos del producto", async () => {
    const { getByDisplayValue } = render(
      <ThemeProvider>
        <LoadingContext.Provider value={{ loading: false, setLoading: jest.fn() }}>
          <NavigationContainer>
            <ProductUpdateScreen />
          </NavigationContainer>
        </LoadingContext.Provider>
      </ThemeProvider>
    );

    // Verificar que los datos del producto están en los campos
    await waitFor(() => {
      expect(getByDisplayValue("Producto Editado")).toBeTruthy();
      expect(getByDisplayValue("Descripción de prueba")).toBeTruthy();
    });
  });

});
