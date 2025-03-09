import React, { createContext, useContext } from "react";
import { lightTheme } from "../../theme/lightTheme";


interface ThemeContextProps {
    theme: typeof lightTheme
    toogleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);


