import React from 'react';
import { Image, Box, Badge } from '@chakra-ui/core';
import { FiStar } from 'react-icons/fi';

interface ProductCard1Props {
  imageUrl: string,
  imageAlt: string,
  categories: string[],
  title: string,
  formattedPrice: string,
  reviewCount: number | string,
  rating: number | string,
  inCart?: boolean,
  inWishlist?: boolean,
  addToCart?: Function,
  addToWishlist?: Function
}

export const ProductCard1: React.FC<ProductCard1Props> = (props) => {

  return (
    <Box id='product-card' maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
    <Image id='product-card-img' src={props.imageUrl} alt={props.imageAlt} />

    <Box id='product-card-content' p="6">
      <Box id='product-card-badges' d="flex" alignItems="baseline">
        <Badge rounded="full" px="2" variantColor="teal">
          New
        </Badge>
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          isTruncated
          textTransform="uppercase"
          ml="2"
        >
          {props.categories.reduce((acc, cur, idx) => {
            if (idx === 0) return acc += cur;
            return acc += (' • ' + cur);
          }  , '')}
        </Box>
      </Box>

      <Box
        mt="1"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        isTruncated
        id='product-card-title'
      >
        {props.title}
      </Box>

      <Box id='product-card-price'>
        {props.formattedPrice}
      </Box>

      <Box d="flex" mt="2" alignItems="center">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <Box as={FiStar}
              key={i}
              color={i < props.rating ? "blue.500" : "gray.300"}
            />
          ))}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {props.reviewCount} reviews
        </Box>
      </Box>
    </Box>
  </Box>

  );
};
