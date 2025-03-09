import { Product } from "../entities/Product";


export interface ProductRepository {
  getProducts(): Promise<Product[]>  
  getOneProduct(productId: string): Promise<Product | undefined>  
  validId(productId: string): Promise<Boolean>  
  createProduct(product: Product): Promise<Product> 
  updateProduct(productId: string, product: Product): Promise<Product> 
  deleteProduct(productId: string): Promise<String>  
}