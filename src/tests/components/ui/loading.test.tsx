import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { ThemeContext } from "../../../presentation/context/themeContext/ThemeContext";
import { LoadingContext } from "../../../presentation/context/LoadingContext.ts/LoadingContext";
import Loading from "../../../presentation/components/ui/Loading";

const mockThemeContext: any = {
  theme: {
    colors: {
      primary: "#3498db", // Azul para pruebas
      buttonText: "#ffffff",
      background: "#f2f2f2",
      text: "#333",
      danger: "#ff0000",
      gris: "#ccc",
      white: "#ffffff",
      secondary: "#2ecc71",
    },
  },
};

describe("Loading", () => {
    test("Debe usar `size=large` por defecto", async () => {
        const { queryByTestId } = render(
          <ThemeContext.Provider value={mockThemeContext}>
            <LoadingContext.Provider value={{ loading: true, setLoading: jest.fn() }}>
              <Loading />
            </LoadingContext.Provider>
          </ThemeContext.Provider>
        );
      
        await waitFor(() => {
          const spinner = queryByTestId("loading-indicator");
          expect(spinner).not.toBeNull(); // Asegura que el indicador de carga existe
          expect(spinner?.props.size).toBe("large"); // Verifica el tamaño por defecto
        }, { timeout: 2000 }); // Da tiempo para que el Modal se renderice
      });
});
