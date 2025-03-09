import React, { useContext, useEffect, useState } from "react"
import ProductForm from "../components/forms/Product"
import ScreenWrapper from "../components/wrapper/ScreenWrapper"
import { Product } from "../../dominio/entities/Product";
import { ProductRepositoryImpl } from "../../data/repositories/ProductRepositoryImpl";
import { LoadingContext } from "../context/LoadingContext.ts/LoadingContext";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationAppProp } from "../navigation/type";


export const ProductCreateScreen = () => {

    const { setLoading } = useContext(LoadingContext);

    const navigation = useNavigation<NavigationAppProp>();

    const repository = new ProductRepositoryImpl();

    const handleSubmit = (data: Product) => {
        setLoading(true);
        repository.createProduct(data)
            .then((product) => {
                setLoading(false)
                Alert.alert("Info", "Producto creado", [{
                    text: "OK",
                    onPress: () => navigation.navigate("productsList"),
                }])
            }).catch((error) => {
                setLoading(false)
                Alert.alert("no se pudo crear el producto. Intenta nuevamente")
            })
    };


    return (
        <ScreenWrapper>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Formulario de Registro</Text>
            </View>

            <ProductForm onSubmit={handleSubmit}></ProductForm>

        </ScreenWrapper>
    )

}

const styles = StyleSheet.create({
    containerTitle: {
        marginHorizontal: 30,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 20
    }
})