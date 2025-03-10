import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ProductsDetailScreen } from "../../presentation/screens/ProductsDetailScreen";
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
  useRoute: () => ({
    params: { productId: "123" },
  }),
}));

describe("ProductsDetailScreen", () => {
  let mockGetOneProduct: jest.Mock;
  let mockDeleteProduct: jest.Mock;
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockGetOneProduct = jest.fn().mockResolvedValue({
      id: "123",
      name: "Producto Test",
      description: "Descripción de prueba",
      logo: "https://logo.com/logo.png",
      date_release: new Date("2025-01-01"),
      date_revision: new Date("2026-01-01"),
    });

    mockDeleteProduct = jest.fn().mockResolvedValue("Producto eliminado");

    (ProductRepositoryImpl as jest.Mock).mockImplementation(() => ({
      getOneProduct: mockGetOneProduct,
      deleteProduct: mockDeleteProduct,
    }));

    mockNavigate = jest.fn();


    jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks(); 
  });



  test("Debe mostrar un mensaje de error si falla la carga del producto", async () => {
    mockGetOneProduct.mockRejectedValueOnce(new Error("Error al obtener el producto"));

    const { getByText } = render(
      <ThemeProvider>
        <LoadingContext.Provider value={{ loading: false, setLoading: jest.fn() }}>
          <NavigationContainer>
            <ProductsDetailScreen />
          </NavigationContainer>
        </LoadingContext.Provider>
      </ThemeProvider>
    );

    await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith("Info", "Error obteniendo el producto");
      });
  });

 

   test("Debe mostrar el modal de confirmación al presionar `Eliminar`", async () => {
    const { getByText, queryByText } = render(
      <ThemeProvider>
        <LoadingContext.Provider value={{ loading: false, setLoading: jest.fn() }}>
          <NavigationContainer>
            <ProductsDetailScreen />
          </NavigationContainer>
        </LoadingContext.Provider>
      </ThemeProvider>
    );

  

    await waitFor(() => {
        expect(getByText("Eliminar")).toBeTruthy();
      });

    expect(queryByText("¿Estás seguro de eliminar este producto?")).toBeTruthy();
  });

});
