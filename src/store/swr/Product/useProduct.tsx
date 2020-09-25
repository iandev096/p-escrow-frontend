import React, { useEffect, useContext, useState } from 'react'
import useSwr from 'swr';
import { ProductApi } from '../../../api/product';
import { IProduct, ILikeProduct } from '../../../models/product/product.interface';
import { CreateProductDto, GetProductFilterDto, UpdateProductDto } from '../../../models/product/Product.dto';
import { ProductCategory } from '../../../models/product/product.enum';
import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';
import { AuthContext } from '../../contexts/Auth/AuthProvider';

const productApi = new ProductApi();
const useFetchProducts = () => {
  const { data, error, mutate } = useSwr('getProducts', () => productApi.getProducts({}).then(data => data));
  const isPending = !data;
  const products = data || [];
  const setProducts = mutate;

  return { products, setProducts, error, isPending };
}

const useLikedProducts = (shouldFetch: any) => {
  const { data, error, mutate } = useSwr(
    shouldFetch ? 'getLikedProducts' : null,
    () => productApi.getLikeProducts().then(data => data)
  );
  const isPending = !data;
  const likedProducts = data || [];
  const setLikedProducts = mutate;

  return { likedProducts, setLikedProducts, isPending, error };
}

export const useProducts = () => {
  const { logout, user } = useContext(AuthContext);
  const { products, setProducts, error, isPending } = useFetchProducts();
  const { likedProducts, setLikedProducts, isPending: likedIsPending, error: likeError } = useLikedProducts(user);
  const router = useRouter();
  const alert = useAlert();

  useEffect(() => {
    productApi.setOnUnAuthHandler(() => {
      alert.show('You must login to continue', {
        onOpen: () => {
          logout();
        },
        timeout: 2000,
        onClose: () => router.replace('/auth')
      });
    });
  }, []);

  const addProduct = (data: IProduct) => {
    const updatedProducts: IProduct[] = [
      ...products,
      { ...data }
    ]
    setProducts(updatedProducts);
  }

  const setProduct = (data: IProduct) => {
    const productIndex = products.findIndex(prod => prod.id === data.id);
    if (!productIndex) return;
    const updatedProducts = [...products];
    updatedProducts[productIndex] = data;
  }

  const setProductImage = (data: IProduct) => {
    const productIndex = products.findIndex(prod => prod.id === data.id);
    if (productIndex) {
      const updatedProducts = [...products];
      updatedProducts[productIndex].productImages = data.productImages;
    }
  }

  const setProductCategories = (data: IProduct) => {
    const productIndex = products.findIndex(prod => prod.id === data.id);
    if (productIndex) {
      const updatedProducts = [...products];
      updatedProducts[productIndex].productCategories = data.productCategories;
      setProducts(updatedProducts);
    }
  }

  const createProduct = async (data: CreateProductDto) => {
    try {
      const product = await productApi.createProduct(data);
      addProduct(product);
      return product;
    } catch (err) {
      throw err;
    }
  }

  const updateProduct = async (data: UpdateProductDto, productId: string) => {
    try {
      const product = await productApi.updateProduct(data, productId);
      setProduct(product);
      return product;
    } catch (err) {
      throw err;
    }
  }

  const addProductCategory = async (categories: ProductCategory[], productId: string) => {
    try {
      const product = await productApi.addProductCategory(categories, productId);
      setProductCategories(product);
    } catch (err) {
      throw err;
    }
  }

  const uploadProductImage = async (formdata: FormData) => {
    try {
      const product = await productApi.uploadProductImage(formdata);
      setProductImage(product);
    } catch (err) {
      throw err;
    }
  }

  const setLikedProduct = (data: ILikeProduct) => {
    const productIndex = likedProducts.findIndex(prod => prod.productId === data.productId);
    if (!productIndex) return;
    const updatedProducts = [...likedProducts];
    updatedProducts[productIndex] = data;
    setLikedProducts(updatedProducts);
  }

  const removeLikedProduct = (productId: string) => {
    const updatedProducts = [...likedProducts].filter(prod => prod.productId !== productId);
    setLikedProducts(updatedProducts);
  }

  const likeProduct = async (productId: string) => {
    try {
      const products = await productApi.likeProduct(productId);
      const liked = products.find(prod => prod.productId === productId);
      setLikedProduct(liked);
    } catch (err) {
      throw err;
    }
  }

  const unlikeProduct = async (productId: string) => {
    try {
      await productApi.unlikeProduct(productId);
      removeLikedProduct(productId);
    } catch (err) {
      throw err;
    }
  }

  const searchProducts = async (data: GetProductFilterDto) => {
    try {
      const products = await productApi.getProducts(data);
      return products;
    } catch (err) {
      throw err;
    }
  }

  return {
    products,
    error,
    isPending,
    likedProducts,
    likeProduct,
    unlikeProduct,
    createProduct,
    searchProducts,
    updateProduct,
    addProductCategory,
    uploadProductImage
  }
}

export default useProducts;