import React from "react";
import { Box, Divider, Text } from "@chakra-ui/core";
import { ProductSlider } from "../product/ProductSlider";
import Container from "../Container";
import { IProduct } from "../../models/product/product.interface";

interface ProductSectionProps {
  heading: string;
  products: IProduct[];
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  heading,
}) => {
  return (
    <Container
      bg="rgba(255,255,255,0.7)"
      borderRadius="lg"
      p="1rem"
      m="auto"
      mb="4rem"
    >
      <Text
        as="h2"
        textTransform="uppercase"
        fontWeight={700}
        fontSize="xl"
        color="blue.700"
      >
        {heading}
      </Text>
      <Divider />
      <ProductSlider products={products} />
    </Container>
  );
};
