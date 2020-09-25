import React from "react";
import { Grid } from "@chakra-ui/core";
import { ProductCard } from "./ProductCard";
import { IProduct } from "../../models/product/product.interface";
import { useProductItem } from "../../hooks/useProductItem";
import { noImageFoundUrl } from "../../constants/image";
import ScreenLoader from "../ScreenLoader";

interface ProductGridProps {
  products: IProduct[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { inCart, inWishlist, toggleCartHandler, toggleWishlistHandler, isLoading } = useProductItem();

  return (
    <>
      <ScreenLoader show={isLoading} label='Toggling...' />
      <Grid
        templateColumns={[
          "minmax()",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap={[4, 6, 8]}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            productId={product.id}
            imageUrl={product?.productImages[0]?.url ?? noImageFoundUrl}
            imageAlt={`${product.displayName} image`}
            title={product.displayName}
            price={product.priceTobePaid}
            inCart={inCart(product.id)}
            inWishlist={inWishlist(product.id)}
            onToggleCart={() => toggleCartHandler(product.id)}
            onToggleWishlist={() => toggleWishlistHandler(product.id)}
          />
        ))}
      </Grid>  
    </>
  );
};
