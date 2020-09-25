export interface IProductImage {
  createdAt ?: Date;
  updatedAt ?: Date;
  id: string;
  type: string;
  url: string;
  publicId: string;
  productId: string;
}

export interface IProductCategory {
  createdAt ?: Date;
  updatedAt ?: Date;
  id: string;
  name: string;
  description?: any;
}

export interface IProduct {
  createdAt ?: Date;
  updatedAt ?: Date;
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
}

export interface ICartProduct {
  createdAt ?: Date;
  updatedAt ?: Date;
  id: number;
  cartId: string;
  productId: string;
  product: IProduct;
}

export interface ICart {
  createdAt ?: Date;
  updatedAt ?: Date;
  id: string;
  userId: string;
  cartProducts: ICartProduct[];
}
