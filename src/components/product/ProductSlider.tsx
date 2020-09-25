import React, { useContext, useCallback, useState } from "react";
import Slider, { Settings } from "react-slick";
import { Box } from "@chakra-ui/core";
import { ProductCard } from "./ProductCard";
import { IProduct } from "../../models/product/product.interface";
import { noImageFoundUrl } from "../../constants/image";
import ScreenLoader from "../ScreenLoader";
import { useProductItem } from "../../hooks/useProductItem";

interface ProductSliderProps {
  products: IProduct[]
}

const settings: Settings = {
  dots: false,
  infinite: true,
  speed: 800,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  pauseOnHover: true,
  pauseOnFocus: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 720,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 476,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 4000,
      },
    },
  ],
};

export const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const { inCart, inWishlist, toggleCartHandler, toggleWishlistHandler, isLoading } = useProductItem();

  return (
    <>
      <ScreenLoader show={isLoading} label='Toggling...' />
      <Slider {...settings}>
        {products.map((product) => (
          <Box p={2} key={product.id} outline="none">
            <ProductCard
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
          </Box>
        ))}
      </Slider>
    </>
  );
};
