import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useForm, FormProvider } from "react-hook-form";
import { InputControl } from "../../../presentation/components/inputs/InputControl";

const TestWrapper = () => {
  const methods = useForm({ defaultValues: { name: "" } });

  return (
    <FormProvider {...methods}>
      <InputControl name="name" control={methods.control} label="Nombre" placeholder="Escribe tu nombre" />
    </FormProvider>
  );
};

test("Debe renderizar y actualizar el valor al escribir", () => {
  const { getByPlaceholderText } = render(<TestWrapper />);
  
  const input = getByPlaceholderText("Escribe tu nombre");
  
  fireEvent.changeText(input, "Henry");

  expect(input.props.value).toBe("Henry");
});
