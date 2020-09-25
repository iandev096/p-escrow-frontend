import { HttpClientWithJWT } from "../utilities/http/httpClient";
import { ICart } from "../models/cart/cart.interface";

const baseUrl = process.env.baseApiUrl + '/carts';

export class CartApi extends HttpClientWithJWT {
  public constructor() {
    super(baseUrl)
  }

  addProductToCart(productId: string) {
    return this.axiosInstance.post<ICart>(
      `/`,
      {},
      {
        params: {
          id: productId
        }
      }
    );
  }

  removeProductFromCart(productId: string) {
    return this.axiosInstance.delete(
      `/`,
      {
        params: {
          id: productId
        }
      }
    );
  }

  getCart() {
    return this.axiosInstance.get<ICart>(
      `/`,
    );
  }

}