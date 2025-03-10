import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface CustomHeaderProps {
  title?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title = "Banco" }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {navigation.canGoBack() && ( // Solo muestra el botón si hay una pantalla anterior
        <TouchableOpacity testID="back-button" onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require("../../../../assets/flecha-hacia-atras.png")} style={styles.backIcon} />
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Image testID="credito-icon" source={require("../../../../assets/credito.png")} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingVertical: 10,
      paddingHorizontal: 16,
      height: 65,
      backgroundColor: "#fff",
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    backButton: {
      padding: 10, 
      position: "absolute",
      left: 10,
    },
    backIcon: {
      width: 24,
      height: 24,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    icon: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#000",
      textAlign: "center",
    },
  });

export default CustomHeader;
