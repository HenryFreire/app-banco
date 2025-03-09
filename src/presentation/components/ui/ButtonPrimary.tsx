
import React, { useContext } from "react"
import { ActivityIndicator, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { ThemeContext } from "../../context/themeContext/ThemeContext";


interface ButtonPrimary {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    stylesBtn?: StyleProp<ViewStyle>
    stylesText?: StyleProp<TextStyle>
}


export const ButtonPrimary: React.FC<ButtonPrimary> = ({
    title,
    onPress,
    disabled = false,
    loading = false,
    stylesBtn,
    stylesText
}) => {

    const {theme} = useContext(ThemeContext)

    return (
        <TouchableOpacity
            style={StyleSheet.flatten([
                { backgroundColor: theme.colors.primary, padding: 15, borderRadius: 8 },
                styles.button,
                stylesBtn
            ])}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={theme.colors.buttonText} />
            ) : (
                <Text style={StyleSheet.flatten([
                    styles.text,
                    { color: theme.colors.buttonText },
                    stylesText
                ])}>{title}</Text>
            )}
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
    },
})