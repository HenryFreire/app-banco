import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ButtonPrimary } from '../components/ui/ButtonPrimary';
import { NavigationAppProp, RootStackParamList } from '../navigation/type';
import { ProductRepositoryImpl } from '../../data/repositories/ProductRepositoryImpl';
import { Product } from '../../dominio/entities/Product';
import ScreenWrapper from '../components/wrapper/ScreenWrapper';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import CustomModal from '../components/ui/ModalConfirm';
import { LoadingContext } from '../context/LoadingContext.ts/LoadingContext';


type ProductDetailRouteProp = RouteProp<RootStackParamList, "productDetail">

export const ProductsDetailScreen = () => {

    const route = useRoute<ProductDetailRouteProp>();

    const { productId } = route.params
    const [product, setProduct] = useState<Product>()
    const { setLoading } = useContext(LoadingContext);
    const [modalVisible, setModalVisible] = useState(false);

    const { theme } = useContext(ThemeContext)

    const navigation = useNavigation<NavigationAppProp>();

    const repository = new ProductRepositoryImpl();

    useEffect(() => {
        setLoading(true)
        repository.getOneProduct(productId).then((data) => {
            setProduct(data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            Alert.alert("Info", "Error obteniendo el producto")
            console.log("Error obteniendo el producto:", error)
        });
    }, [productId]);

    const handleConfirm = () => {
        setModalVisible(false)
        setLoading(true)
        repository.deleteProduct(productId)
            .then(data => {
                setLoading(false)
                Alert.alert("Info","Producto Eliminado" , [{
                    text: "OK",
                    onPress: () => navigation.navigate("productsList"),
                }])
            }).catch(error => {
                setLoading(false)
                Alert.alert("Info", "Error eliminando el producto")
                console.log("Error obteniendo el producto:", error) 
            })
    };



    return (
        <ScreenWrapper>
            {
                product && <View style={styles.container}>
                    <View style={styles.body}>
                        <View style={{ marginBottom: 40 }}>
                            <Text style={styles.productId}>ID: {product?.id}</Text>
                            <Text style={styles.subText}>Información extra</Text>
                        </View>


                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Nombre</Text>
                            <Text style={styles.value}>{product?.name}</Text>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Descripción</Text>
                            <Text style={styles.value}>{product?.description}</Text>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Logo</Text>
                            <Image source={{ uri: product?.logo }} style={styles.logo} />
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Fecha liberación</Text>
                            <Text style={styles.value}>
                                {product?.date_release
                                    ? new Date(product.date_release).toLocaleDateString()
                                    : "No disponible"}
                            </Text>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Fecha revisión</Text>
                            <Text style={styles.value}>
                                {product?.date_revision
                                    ? new Date(product.date_revision).toLocaleDateString()
                                    : "No disponible"}
                            </Text>
                        </View>

                    </View>


                    <View style={styles.containerButton}>
                        <ButtonPrimary
                            title="Editar"
                            stylesBtn={{ backgroundColor: theme.colors.gris, marginBottom: 10 }}
                            onPress={() => navigation.navigate("productUpdate", { productId })}
                        />
                        <ButtonPrimary
                            title="Eliminar"
                            stylesBtn={{ backgroundColor: theme.colors.danger }}
                            stylesText={{ color: theme.colors.white }}
                            onPress={() => setModalVisible(true)}
                        />
                    </View>

                </View>
            }

            <CustomModal
                visible={modalVisible}
                message={`¿Estás seguro de eliminar este producto?`}
                title={product?.name}
                onConfirm={handleConfirm}
                onCancel={() => setModalVisible(false)}
            />
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },
    body: {
        flex: 1,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#001F54",
        marginLeft: 5,
    },
    productId: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
    },
    subText: {
        fontSize: 14,
        color: "#777",
        marginBottom: 15,
    },
    infoContainer: {
        width: "100%",
        marginBottom: 15,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    label: {
        fontSize: 16,

        color: "#666",
    },
    value: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
    },
    logo: {
        width: 100,
        height: 60,
        marginTop: 10,
    },
    editButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    deleteButton: {
        backgroundColor: "#D32F2F",
        color: "#ffffff",
        padding: 15,
        alignItems: "center",
        borderRadius: 5,
        marginTop: 10,
    },
    deleteButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        fontSize: 16,
        color: "#666",
        marginTop: 10,
    },
    containerButton: {
        flex: 0.3
    }
});