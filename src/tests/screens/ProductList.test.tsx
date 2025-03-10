import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ProductRepositoryImpl } from "../../data/repositories/ProductRepositoryImpl";
import { LoadingContext } from "../../presentation/context/LoadingContext.ts/LoadingContext";
import { ProductsListScreen } from "../../presentation/screens/ProductsListScreen";
import { ThemeProvider } from "../../presentation/context/themeContext/ThemeProvider";
import { Alert } from "react-native";

// Mock de `ProductRepositoryImpl`
jest.mock("../../data/repositories/ProductRepositoryImpl");

describe("ProductsListScreen", () => {
  let mockGetProducts: jest.Mock;

  beforeEach(() => {
    mockGetProducts = jest.fn().mockResolvedValue([
      { id: "1", name: "Producto 1", description: "", logo: "", date_release: new Date(), date_revision: new Date() },
      { id: "2", name: "Producto 2", description: "", logo: "", date_release: new Date(), date_revision: new Date() },
    ]);

    (ProductRepositoryImpl as jest.Mock).mockImplementation(() => ({
      getProducts: mockGetProducts,
    }));
  });

  test("Debe renderizar correctamente la pantalla con productos", async () => {
    const { getByText } = render(
      <ThemeProvider> 
        <LoadingContext.Provider value={{ loading: false, setLoading: jest.fn() }}>
          <NavigationContainer>
            <ProductsListScreen />
          </NavigationContainer>
        </LoadingContext.Provider>
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByText("Producto 1")).toBeTruthy();
      expect(getByText("Producto 2")).toBeTruthy();
    });
  });

   test("Debe mostrar el mensaje 'No se encontraron productos' si la lista está vacía", async () => {
    mockGetProducts.mockResolvedValueOnce([]);

    const { getByText } = render(
        <ThemeProvider> 
        <LoadingContext.Provider value={{ loading: false, setLoading: jest.fn() }}>
          <NavigationContainer>
            <ProductsListScreen />
          </NavigationContainer>
        </LoadingContext.Provider>
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByText("No se encontraron productos")).toBeTruthy();
    });
  }); 
});
