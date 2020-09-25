import { ProductImageType, ProductCategory } from "./product.enum";
import { IBaseUser } from "../auth/auth.interface";

export interface IProductImage {
  createdAt?: Date;
  updatedAt?: Date;
  id: string;
  publicId: string;
  url: string;
  type: ProductImageType;
  productId: string;
}

export interface IProductCategory {
  createdAt?: Date;
  updatedAt?: Date;
  id: string;
  name: ProductCategory;
  description?: string;
}

export interface ICartProduct {
  createdAt?: Date;
  updatedAt?: Date;
  id: number;
  cartId: string;
  productId: string;
}

export interface IUserRating {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  rating: string;
  comment: string;
  userId: string;
}

export interface ILikeProduct {
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  id: number;
}

export interface IProduct {
  createdAt?: Date;
  updatedAt?: Date;
  id: string;
  fullName: string;
  displayName: string;
  description: string;
  price: string;
  priceDiscount: string;
  priceTobePaid: string;
  currency: string;
  lat: string;
  lng: string;
  location: string;
  status: string;
  userId: string;
  productImages: IProductImage[];
  productCategories: IProductCategory[];
  cartProducts: ICartProduct[];
  user: IBaseUser;
  userRatings: IUserRating[];
}
