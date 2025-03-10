import { ProductRepositoryImpl } from "../../data/repositories/ProductRepositoryImpl"
import { Product } from "../../dominio/entities/Product"
import { api } from "../../infrastructure/api/api"

// Mock de la API
jest.mock("../../infrastructure/api/api")

describe("ProductRepositoryImpl", () => {
  let repository: ProductRepositoryImpl

  beforeEach(() => {
    repository = new ProductRepositoryImpl()
    jest.useFakeTimers() 
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockProduct: Product = {
    id: "123",
    name: "Andre",
    description: "Tarjeta platino",
    logo: "https://example.com/logo.png",
    date_release: new Date("2024-01-01"),
    date_revision: new Date("2025-01-01"),
  }

  test("getProducts debe devolver productos correctamente", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { data: [mockProduct] } })
  
    jest.spyOn(global, "setTimeout").mockImplementation((fn: any) => fn()) 
  
    const products = await repository.getProducts() 
  
    expect(products).toEqual([mockProduct])
    expect(api.get).toHaveBeenCalledWith("products")
  
    jest.restoreAllMocks() 
  })

  test("getOneProduct debe devolver un producto correctamente", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockProduct })
  
    jest.spyOn(global, "setTimeout").mockImplementation((fn: any) => fn()) 
  
    const product = await repository.getOneProduct("1") 
  
    expect(product).toEqual(mockProduct)
    expect(api.get).toHaveBeenCalledWith("products/1")
  
    jest.restoreAllMocks() 

  })

  test("validId debe devolver true si el ID es válido", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: true })
  
    jest.spyOn(global, "setTimeout").mockImplementation((fn: any) => fn())
  
    const isValid = await repository.validId("1")
  
    expect(isValid).toBe(true)
    expect(api.get).toHaveBeenCalledWith("products/verification/1")
  
    jest.restoreAllMocks()
})

test("createProduct debe enviar datos y devolver el producto creado", async () => {
    const newProduct: Product = {
      id: "2",
      name: "Mario",
      description: "Tarjeta bronce",
      logo: "https://example.com/logo.png",
      date_release: new Date("2024-05-01"),
      date_revision: new Date("2025-05-01"),
    };
  
    (api.post as jest.Mock).mockResolvedValue({ data: { data: newProduct } });
  
    jest.spyOn(global, "setTimeout").mockImplementation((fn: any) => fn());
  
    const createdProduct = await repository.createProduct(newProduct);
  
    expect(createdProduct).toEqual(newProduct);
    expect(api.post).toHaveBeenCalledWith("products", newProduct);
  
    jest.restoreAllMocks();
  });

  test("updateProduct debe actualizar un producto y devolverlo", async () => {
    const updatedProduct: Product = {
      id: "1",
      name: "Mario Figuroa",
      description: "Tarjeta black",
      logo: "https://example.com/logo2.png",
      date_release: new Date("2024-06-01"),
      date_revision: new Date("2025-06-01"),
    };
  
    (api.put as jest.Mock).mockResolvedValue({ data: { data: updatedProduct } });
  
    jest.spyOn(global, "setTimeout").mockImplementation((fn: any) => fn());
  
    const result = await repository.updateProduct("1", updatedProduct);
  
    expect(result).toEqual(updatedProduct);
    expect(api.put).toHaveBeenCalledWith("products/1", updatedProduct);
  
    jest.restoreAllMocks();
  });

  test("deleteProduct debe eliminar un producto y devolver un mensaje", async () => {
    (api.delete as jest.Mock).mockResolvedValue({ data: { message: "Producto eliminado" } });
  
    jest.spyOn(global, "setTimeout").mockImplementation((fn: any) => fn());
  
    const message = await repository.deleteProduct("1");
  
    expect(message).toBe("Producto eliminado");
    expect(api.delete).toHaveBeenCalledWith("products/1");
  
    jest.restoreAllMocks();
  });

  test("getProducts debe lanzar un error si la API falla", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("Error en la API"));
  
    await expect(repository.getProducts()).rejects.toThrow("No se pudieron obtener los clientes");
  
    expect(api.get).toHaveBeenCalledWith("products");
  });
  
})