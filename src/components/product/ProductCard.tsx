import React from "react";
import { Box, Image, PseudoBox, Text, Flex, BoxProps } from "@chakra-ui/core";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import Link from "next/link";
import { formatPrice } from "../../utilities/money";

interface ProductCardProps {
  productId: string;
  imageUrl: string;
  imageAlt?: string;
  title: string;
  price: string;
  inCart?: boolean;
  inWishlist?: boolean;
  onToggleCart?: Function;
  onToggleWishlist?: Function;
  boxProps?: BoxProps;
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  return (
    <Box
      id="product-card"
      w="100%"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="sm"
      {...props?.boxProps}
    >
      <Box
        id="product-card-image-container"
        w="100%"
        h={["11rem"]}
        overflow="hidden"
        p={2}
        position="relative"
        display="flex"
      >
        <Link href={`/buy/product-detail/[productId]`} as={`/buy/product-detail/${props.productId}`}>
          <Image
            cursor="pointer"
            maxW="100%"
            maxH="100%"
            m="auto"
            src={props.imageUrl}
            alt={props.imageAlt}
          />
        </Link>
        <PseudoBox
          p="10px"
          borderTopLeftRadius="lg"
          position="absolute"
          bottom="0"
          right="0"
          cursor="pointer"
          backgroundColor="blue.100"
          id="product-card-cart-btn"
          // opacity={props.inCart ? 1 : 0.6}
          _hover={{ opacity: 1 }}
          _active={{ opacity: 1 }}
          onClick={() => props?.onToggleCart()}
        >
          <Box
            as={FiShoppingCart}
            color={props.inCart ? "blue.800" : "blue.300"}
            fill={props.inCart ? "blue.800" : "blue.50"}
          />
        </PseudoBox>
        <PseudoBox
          id="product-card-fav-btn"
          p="10px"
          borderTopRightRadius="lg"
          position="absolute"
          bottom="0"
          left="0"
          cursor="pointer"
          // opacity={props.inWishlist ? 1 : 0.6}
          _hover={{ opacity: 1 }}
          _active={{ opacity: 1 }}
          onClick={() => props?.onToggleWishlist()}
          backgroundColor="red.100"
        >
          <Box
            as={FiHeart}
            color={props.inWishlist ? "red.600" : "red.300"}
            fill={props.inWishlist ? "red.600" : "red.50"}
          />
        </PseudoBox>
      </Box>
      <Flex p={3} bg="gray.100">
        <Link href={`/buy/product-detail/[productId]`} as={`/buy/product-detail/${props.productId}`}>
          <PseudoBox
              cursor="pointer"
              color="blue.500"
              _hover={{color: 'blue.600'}}
              _active={{color: 'blue.700'}}
              >
            <Text
              fontWeight="500"
              flexBasis="70%"
              isTruncated
              color="inherit"
              id="product-card-title"
            >
              {props.title}
            </Text>
          </PseudoBox>
        </Link>
        <Text
          fontWeight="500"
          fontStyle="italic"
          flexBasis="20%"
          ml="auto"
          id="product-card-price"
        >
          {formatPrice(props.price)}
        </Text>
      </Flex>
    </Box>
  );
};
