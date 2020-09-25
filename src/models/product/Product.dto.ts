import { Transform } from 'class-transformer';
import { ProductStatus, ProductCategory } from "./product.enum";

export class CreateProductDto {
  fullName: string;
  displayName: string;
  description: string;
  price: number;
  priceDiscount: number;
  currency: string;
  location: string;
  lat: number;
  lng: number;
  status: ProductStatus;
}

export class UpdateProductDto {
  fullName?: string;
  displayName?: string;
  description?: string;
  price?: number;
  priceDiscount?: number;
  currency?: string;
  location?: string;
  lat?: number;
  lng?: number;
  status?: ProductStatus;
}

export class GetProductQueryDto {
  take?: number;
  skip?: number;
}

export class GetProductFilterDto extends GetProductQueryDto {
  search?: string;
  priceLt?: number;
  priceGt?: number;
  location?: string;
  status?: ProductStatus;

  @Transform((values: string[]) => {
    console.log(values);
    return values?.join(',')
  })
  categories?: ProductCategory[];

  userId?: string;
}

