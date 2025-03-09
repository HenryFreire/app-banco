
import { Product } from "../../dominio/entities/Product";
import { ProductRepository } from "../../dominio/repositories/ProductRepository";
import { api } from "../../infrastructure/api/api";  
import { LOADING_MIN_TIME } from "../../infrastructure/config/const";

export class ProductRepositoryImpl implements ProductRepository {
  async getProducts(): Promise<Product[]> {
    try {
        const response = await api.get<{ data: Product[] }>("products"); 
        
        if (!response.data || response.data.data.length === 0) {
          console.warn("La API no devolvió productos.");
          return []; 
        }
        return new Promise((resolve) => {
          setTimeout(() => resolve(response.data.data), LOADING_MIN_TIME);
        });
      } catch (error) {
        console.error("Error obteniendo productos:", error);
        throw new Error("No se pudieron obtener los clientes");
      }
  }

  async getOneProduct(productId: string): Promise<Product | undefined> {
    try {
        const response = await api.get<Product>(`products/${productId}` ); 
        
        if (!response.data) {
          console.warn("La API no encontro elproducto.");
          return undefined; 
        }
        return new Promise((resolve) => {
          setTimeout(() => resolve(response.data), LOADING_MIN_TIME);
        });
      } catch (error) {
        console.error("Error obteniendo un producto:", error);
        throw new Error("No se pudo obtener el producto");
      }
  }

  async validId(productId: string): Promise<Boolean> {
    try {
        const response = await api.get<Boolean>(`products/verification/${productId}` )
        return new Promise((resolve) => {
          setTimeout(() => resolve(response.data), LOADING_MIN_TIME);
        });
      } catch (error) {
        console.error("Error verificando el ID:", error)
        return false
      }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
        const response = await api.post<{message: string; data: Product }>(`products`, product )
        
        if (!response.data) {
          throw new Error("No se pudo crear el producto")
        }
        return new Promise((resolve) => {
          setTimeout(() => resolve(response.data.data), LOADING_MIN_TIME);
        });
      } catch (error) {
        console.error("Error creando un producto:", error)
        throw new Error("No se pudo crear el producto")
      }
  }

  async updateProduct(productId: string, product: Product): Promise<Product> {
    try {
        const response = await api.put<{message: string; data: Product }>(`products/${productId}`, product )
        
        if (!response.data) {
          throw new Error("No se pudo actualizar el producto")
        }
        return new Promise((resolve) => {
          setTimeout(() => resolve(response.data.data), LOADING_MIN_TIME);
        });
      } catch (error) {
        console.error("Error actualizando un producto:", error)
        throw new Error("No se pudo actualizar el producto")
      }
  }

  async deleteProduct(productId: string): Promise<String> {
    try {
        const response = await api.delete<{message: string}>(`products/${productId}` )
        return new Promise((resolve) => {
          setTimeout(() => resolve(response.data.message), LOADING_MIN_TIME);
        });
      } catch (error) {
        console.error("Error eliminando un producto:", error);
        throw new Error("No se pudo eliminar el producto");
      }
  }
}