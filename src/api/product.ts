import { HttpClientWithJWT } from "../utilities/http/httpClient";
import { CreateProductDto, GetProductFilterDto, GetProductQueryDto, UpdateProductDto } from "../models/product/Product.dto";
import { ProductCategory } from "../models/product/product.enum";
import { IProduct, ILikeProduct } from "../models/product/product.interface";
import { ImageApi } from "./image";
import { plainToClass } from "class-transformer";

// 'http://localhost:3000
const baseUrl = process.env.baseApiUrl + '/products';

export class ProductApi extends HttpClientWithJWT {
  public constructor(unAuthObserver?: Function) {
    super(baseUrl, unAuthObserver);   
  }

  createProduct(createProductDto: CreateProductDto) {
    return this.axiosInstance.post<IProduct>(
      `/`,
      { ...createProductDto }
    );
  }

  getProducts(getProductFilterDto?: GetProductFilterDto) {
    const params = plainToClass(GetProductFilterDto, getProductFilterDto);
    return this.axiosInstance.get<IProduct[]>(
      `/`,
      {
        params: {
          ...params
        }
      }
    );
  }

  getProductsCount() {
    return this.axiosInstance.get<number>(
      `/count`
    );
  }

  getLikeProducts() {
    return this.axiosInstance.get<ILikeProduct[]>(
      `/like`
    );
  }

  likeProduct(productId: string) {
    return this.axiosInstance.post<ILikeProduct[]>(
      `/like`,
      {},
      {
        params: {
          id: productId
        }
      }
    );
  }

  unlikeProduct(productId: string) {
    return this.axiosInstance.delete<ILikeProduct[]>(
      `/unlike`,
      {
        params: {
          id: productId
        }
      }
    );
  }

  getFeaturedProducts(getProductQueryDto: GetProductQueryDto) {
    return this.axiosInstance.get<IProduct[]>(
      `/featured`,
      {
        params: {
          ...getProductQueryDto
        }
      }
    );
  }

  addProductToFeatured(productIds: string[]) {
    return this.axiosInstance.post<IProduct[]>(
      `/featured`,
      {},
      {
        params: {
          id: productIds.join(',')
        }
      }
    );
  }

  removeFeaturedProducts(productIds: string[]) {
    return this.axiosInstance.delete<IProduct[]>(
      `/featured`,
      {
        params: {
          id: productIds.join(',')
        }
      }
    );
  }

  addProductCategory(categories: ProductCategory[], productId: string) {
    return this.axiosInstance.post<IProduct>(
      `/add-category/` + productId,
      {},
      {
        params: {
          category: categories.join(',')
        }
      }
    );
  }

  removeProductCategory(category: ProductCategory, productId: string) {
    return this.axiosInstance.delete<IProduct>(
      `/remove-category/` + productId,
      {
        params: {
          category: category
        }
      }
    );
  }

  removeProductImage(productId: string, imageId: string) {
    return this.axiosInstance.delete<IProduct>(
      `/remove-product-image/` + productId,
      {
        params: {
          imageId: imageId
        }
      }
    );
  }

  uploadProductImage(formdata: FormData) {
    const imageApi = new ImageApi();
    return imageApi.uploadProductImage(formdata);
  }

  getProduct(productId: string) {
    return this.axiosInstance.get<IProduct>(
      `/` + productId
    );
  }

  updateProduct(updateProductDto: UpdateProductDto, productId: string) {
    return this.axiosInstance.patch<IProduct>(
      `/` + productId,
      { ...updateProductDto }
    );
  }

  removeProducts(productIds: string[]) {
    return this.axiosInstance.delete(
      `/`,
      {
        params: {
          id: productIds.join(',')
        }
      }
    );
  }
}
