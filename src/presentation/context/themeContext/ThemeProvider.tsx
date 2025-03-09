import React, { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { useColorScheme } from "react-native";
import { lightTheme } from "../../theme/lightTheme";
import { darkTheme } from "../../theme/darkTheme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const colorScheme = useColorScheme()
    const [theme, setTheme] = useState<any>(colorScheme === "light" ? lightTheme : darkTheme)

    useEffect(() => {
        setTheme(colorScheme === "light" ? lightTheme : lightTheme);
    }, [colorScheme]);

    const toggleTheme = () => {
        setTheme((prevTheme: any) => (prevTheme === lightTheme ? darkTheme : lightTheme));
    };


    return <ThemeContext.Provider value={{ theme: theme, toogleTheme: () => toggleTheme() }}>
                {children}
           </ThemeContext.Provider>
}

