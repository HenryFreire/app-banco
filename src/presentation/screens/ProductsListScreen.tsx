import React, { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../components/wrapper/ScreenWrapper';
import { ButtonPrimary } from '../components/ui/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import { NavigationAppProp } from '../navigation/type';
import { ProductRepositoryImpl } from '../../data/repositories/ProductRepositoryImpl';
import { Product } from '../../dominio/entities/Product';
import Icon from "react-native-vector-icons/Ionicons";
import { InputBase } from '../components/inputs/InputBase';
import { LoadingContext } from '../context/LoadingContext.ts/LoadingContext';

export const ProductsListScreen = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const { setLoading, loading } = useContext(LoadingContext);

    const navigation = useNavigation<NavigationAppProp>();

    const repository = new ProductRepositoryImpl();

    useEffect(() => {
        setLoading(true)
        repository.getProducts()
            .then((data) => {
                setProducts(data)
                setFilteredProducts(data)
                setLoading(false)
            })
            .catch((error) => {
                Alert.alert("Error al obtener productos")
                setLoading(false)
            });
    }, []);


    const itemProduct = (item: Product, index: number) => {
        return <TouchableOpacity
            style={[styles.productCard, index < filteredProducts.length - 1 && styles.productCardBorder]}
            onPress={() => navigation.navigate("productDetail", { productId: item.id })}
        >
            <View>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productId}>ID: {item.id}</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
    }

    const empySearch = () => {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No se encontraron productos</Text>
            </View>
        )
    }

    const searchItems = (text: string) => {
        setSearchQuery(text)
        if (!text) {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(text.toLowerCase()) ||
                product.id.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }

    return (
        <ScreenWrapper>
            <View style={styles.body}>
                <InputBase name='search'
                    onChangeText={searchItems}
                    value={searchQuery}
                    placeholder="Search.."
                ></InputBase>
                {
                    !loading && <FlatList
                        data={filteredProducts}
                        style={styles.listContainer}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => itemProduct(item, index)}
                        ListEmptyComponent={() => empySearch()}
                    />
                }

                <ButtonPrimary title='Agregar'
                    stylesBtn={styles.btnRegister}
                    onPress={() => navigation.navigate("productRegister")}
                />
            </View>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F8F9FA",
    },
    body: {
        marginHorizontal: 20,
        marginTop: 50
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#001F54",
        marginLeft: 5,
    },
    productCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingTop: 15,
        borderRadius: 10,
        marginBottom: 10,

    },
    productCardBorder: {
        borderBottomColor: "#c1c1c1",
        borderBottomWidth: 1,
        paddingBottom: 15
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    productId: {
        fontSize: 14,
        color: "#666",
    },
    listContainer: {
        borderColor: "#c1c1c1",
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 60,
        backgroundColor: "#FFFFFF",
        maxHeight: 400
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
    },
    btnRegister: {
        marginTop: 50
    }
});