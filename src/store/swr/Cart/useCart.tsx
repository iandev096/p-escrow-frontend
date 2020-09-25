import { CartApi } from "../../../api/cart";
import useSWR from "swr";
import { ICartProduct, ICart } from "../../../models/cart/cart.interface";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthProvider";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";

const cartApi = new CartApi();
const useFetchCart = (shouldFetch: any) => {
  const { data, error, mutate } = useSWR(
    shouldFetch ? 'getCart' : null,
    () => cartApi.getCart().then(data => data)
  );
  const isPending = !data;
  const cart = data;
  const setCart = mutate;

  return { cart, setCart, error, isPending }
}

export const useCart = () => {
  const { logout, user } = useContext(AuthContext);
  const { cart, setCart, error, isPending } = useFetchCart(user);
  const router = useRouter();
  const alert = useAlert();

  useEffect(() => {
    cartApi.setOnUnAuthHandler(() => {
      alert.show('You must login to continue');
      logout();
      router.replace('/auth');
    });
  }, []);

  const addCartProduct = (product: ICartProduct) => {
    const updatedCart: ICart = {
      ...cart,
      cartProducts: [
        ...cart.cartProducts,
        product
      ]
    };
    setCart(updatedCart);
  }

  const removeCartProduct = (productId: string) => {
    const updatedCartProducts = [...cart.cartProducts]
      .filter(product => product.productId !== productId);

    const updatedCart = {
      ...cart,
      cartProducts: updatedCartProducts
    } as ICart;
    setCart(updatedCart);
  }

  const addProductToCart = async (productId: string) => {
    try {
      const res = await cartApi.addProductToCart(productId);
      if (!cart) {
        setCart(res)
      } else {
        let highestDate = new Date(0);
        let cartProduct: ICartProduct;
        res.cartProducts.forEach(product => {
          const createdAt = new Date(product.createdAt);
          if (createdAt > highestDate) {
            cartProduct = product;
            highestDate = createdAt;
          }
        });
        addCartProduct(cartProduct);
      }
    } catch (err) {
      throw err;
    }
  }

  const removeProductFromCart = async (productId: string) => {
    try {
      await cartApi.removeProductFromCart(productId);
      removeCartProduct(productId);
    } catch (err) {
      throw err;
    }
  }

  return {
    cart,
    isPending,
    error,
    addProductToCart,
    removeProductFromCart,
  }
}

export default useCart;
