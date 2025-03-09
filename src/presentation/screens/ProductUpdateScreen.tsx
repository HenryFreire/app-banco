import React, { useContext, useEffect, useState } from "react"
import ProductForm from "../components/forms/Product"
import ScreenWrapper from "../components/wrapper/ScreenWrapper"
import { Product } from "../../dominio/entities/Product";
import { ProductRepositoryImpl } from "../../data/repositories/ProductRepositoryImpl";
import { LoadingContext } from "../context/LoadingContext.ts/LoadingContext";
import { Alert, StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NavigationAppProp, RootStackParamList } from "../navigation/type";


type ProductUpdateRouteProp = RouteProp<RootStackParamList, "productUpdate">

export const ProductUpdateScreen = () => {

    const route = useRoute<ProductUpdateRouteProp>();
    const [product, setProduct] = useState<Product>()
    const { setLoading } = useContext(LoadingContext);
    const { productId } = route.params;
    const navigation = useNavigation<NavigationAppProp>();

    const repository = new ProductRepositoryImpl();

    useEffect(() => {
        setLoading(true)
        repository.getOneProduct(productId)
            .then((data) => {
                setProduct(data)
                setLoading(false)
            }).catch((error) => {
                console.log("Error obteniendo el producto:", error)
                setLoading(false)
            });
    }, [productId]);

    const handleSubmit = (data: Product) => {
        setLoading(true);
        repository.updateProduct(productId, data)
            .then((product) => {
                setLoading(false)
                Alert.alert("Info", "Producto actualizado", [{
                    text: "OK",
                    onPress: () => navigation.navigate("productsList"),
                }])
            }).catch((error) => {
                setLoading(false)
                Alert.alert("no se pudo actualizar el producto. Intenta nuevamente")
            })

    };


    return (
        <ScreenWrapper>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Formulario de Editar</Text>
            </View>
            <ProductForm onSubmit={handleSubmit} isEditing={true} defaultValues={product}></ProductForm>
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