import React from 'react';
import { Flex, Box, Button, Image, Text } from '@chakra-ui/core';
import { formatPrice } from '../../utilities/money';

interface ProductItemProps {
  onDelete: Function;
  imageUrl: string;
  imageAlt: string;
  productTitle: string;
  price: string;
  discount?: string
}

const ProductItem: React.FC<ProductItemProps> = ({ onDelete, imageUrl, imageAlt, productTitle, price, discount }) => {

  return (
    <Flex
      p='1rem'
      borderRadius="lg"
      mb={4}
      bg="#fff"
      boxShadow="sm"
      justifyContent='space-between'
    >
      <Flex flex='1'>
        <Flex w='3rem' h='3rem' alignItems='center' mr='1rem' id='product-image-container'>
          <Image w='100%' h='auto' backgroundColor='gray.300' src={imageUrl} alt={imageAlt} />
        </Flex>
        <Box>
          <Text
            id='product-title'
            maxW='200px'
            isTruncated>{productTitle}</Text>
          <Flex>
            <Text color={+discount > 0 && 'gray.400'} as={+discount ? 's' : 'em'}>{formatPrice(price)}</Text>
            {+discount > 0 && <Text as='em'>
              {formatPrice(Math.max(0, +price - +discount).toString())}
            </Text>}
          </Flex>
        </Box>
      </Flex>
      <Button
        alignSelf='center'
        leftIcon={'delete'}
        variantColor='red'
        variant='outline'
        size='xs'
        onClick={() => onDelete()}
      >Remove</Button>
    </Flex>
  );
};

export default ProductItem;