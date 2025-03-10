import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import CustomHeader from "../../../presentation/components/ui/CustomHeader"
import { useNavigation } from "@react-navigation/native"

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}))

describe("CustomHeader", () => {
  let mockNavigation: any

  beforeEach(() => {
    mockNavigation = {
      goBack: jest.fn(),
      canGoBack: jest.fn(),
    };
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation)
  })

  test("Debe renderizar correctamente con el título predeterminado", () => {
    const { getByText } = render(<CustomHeader />)
    expect(getByText("Banco")).toBeTruthy() 
  })

  test("Debe mostrar el título pasado como prop", () => {
    const { getByText } = render(<CustomHeader title="Mi Banco" />)
    expect(getByText("Mi Banco")).toBeTruthy()
  })

  test("Debe mostrar el ícono de crédito", () => {
    const { getByTestId } = render(<CustomHeader />)
    expect(getByTestId("credito-icon")).toBeTruthy() 
  })

  test("No debe mostrar el botón de volver si `canGoBack()` es false", () => {
    mockNavigation.canGoBack.mockReturnValue(false)
    const { queryByTestId } = render(<CustomHeader />)
    expect(queryByTestId("back-button")).toBeNull() 
  })

  test("Debe mostrar el botón de volver si `canGoBack()` es true", () => {
    mockNavigation.canGoBack.mockReturnValue(true)
    const { getByTestId } = render(<CustomHeader />)
    expect(getByTestId("back-button")).toBeTruthy() 
  })

  test("Debe llamar a `navigation.goBack()` cuando se presiona el botón de volver", () => {
    mockNavigation.canGoBack.mockReturnValue(true)
    const { getByTestId } = render(<CustomHeader />)

    fireEvent.press(getByTestId("back-button")) 

    expect(mockNavigation.goBack).toHaveBeenCalledTimes(1) 
  })
})
