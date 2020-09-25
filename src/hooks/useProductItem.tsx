import useCart from "../store/swr/Cart/useCart";
import useProducts from "../store/swr/Product/useProduct";
import { useContext, useState, useCallback } from "react";
import { AuthContext } from "../store/contexts/Auth/AuthProvider";

export const useProductItem = () => {
  const { cart, addProductToCart, removeProductFromCart } = useCart();
  const { likedProducts, likeProduct, unlikeProduct, products } = useProducts();
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const isAuth = useCallback(() => {
    return user ? true : false;
  }, [user]);

  const toggleCartHandler = useCallback(async (productId: string) => {
    if (!isAuth()) return;
    setIsLoading(true);
    try {
      const isProductInCart = cart?.cartProducts?.some(prod => prod.productId === productId);
      if (isProductInCart) {
        await removeProductFromCart(productId);
      } else {
        await addProductToCart(productId);
      }
    } catch (err) {
      console.log(err?.message ?? err);
    }
    setIsLoading(false);
  }, [cart, isAuth]);

  const toggleWishlistHandler = useCallback(async (productId: string) => {
    if (!isAuth()) return;
    setIsLoading(true);
    try {
      const isProductLiked = likedProducts?.some(prod => prod.productId === productId);
      if (isProductLiked) {
        await unlikeProduct(productId);
      } else {
        await likeProduct(productId);
      }
    } catch (err) {
      console.log(err?.message ?? err);
    }
    setIsLoading(false);
  }, [isAuth, likedProducts]);

  const inCart = useCallback((productId: string) =>
    (isAuth() && cart) ?
      cart.cartProducts.some(prod => prod.productId === productId) :
      undefined,
    [isAuth, cart]
  );

  const inWishlist = useCallback((productId: string) =>
    (isAuth() && likedProducts) ?
      likedProducts.some(prod => prod.productId === productId) :
      undefined,
    [isAuth, likedProducts]
  );

  return {
    isLoading,
    toggleCartHandler,
    toggleWishlistHandler,
    inCart,
    inWishlist,
    products,
    cart,
    likedProducts
  }
}