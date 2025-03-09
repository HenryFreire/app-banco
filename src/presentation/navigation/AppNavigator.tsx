import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ProductsDetailScreen } from "../screens/ProductsDetailScreen";
import { ProductsListScreen } from "../screens/ProductsListScreen";
import CustomHeader from "../components/ui/CustomHeader";
import { RootStackParamList } from "./type";
import { ProductCreateScreen } from "../screens/ProductCreateScreen";
import { ProductUpdateScreen } from "../screens/ProductUpdateScreen";



const Stack = createStackNavigator<RootStackParamList>()

export const AppNavigator = () => {
    return (<NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="productsList"
                component={ProductsListScreen}
                options={{
                    header: (props) =>
                        <CustomHeader {...props} title="Banco" />
                }}
            />
            <Stack.Screen name="productDetail" component={ProductsDetailScreen} options={{
                    header: (props) =>
                        <CustomHeader />
            }}/>
            <Stack.Screen name="productRegister" component={ProductCreateScreen} options={{
                    header: (props) =>
                        <CustomHeader />
            }}/>
             <Stack.Screen name="productUpdate" component={ProductUpdateScreen} options={{
                    header: (props) =>
                        <CustomHeader />
            }}/>
        </Stack.Navigator>
    </NavigationContainer>
    )
}