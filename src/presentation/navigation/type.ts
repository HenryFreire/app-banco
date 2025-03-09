import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  productsList: undefined;
  productDetail: { productId: string }
  productRegister: undefined
  productUpdate: {productId: string}
};


export type NavigationAppProp = StackNavigationProp<RootStackParamList>;


