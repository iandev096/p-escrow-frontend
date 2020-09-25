import React from 'react';
import { Flex, Image, Box, Text } from '@chakra-ui/core';
import { formatPrice } from '../../utilities/money';
import Link from 'next/link';

interface SearchListItemProps {
  productId: string;
  imageUrl: string;
  imageAlt: string;
  productTitle: string;
  price: string;
  discount?: string
}

const SearchListItem: React.FC<SearchListItemProps> = ({ imageAlt, imageUrl, productTitle, price, discount, productId, ...rest }) => {

  return (
    <Link href={`/buy/product-detail/[productId]`} as={`/buy/product-detail/${productId}`}>
      <Flex {...rest} flex='1' cursor='pointer'>
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
    </Link>

  );
};

export default SearchListItem