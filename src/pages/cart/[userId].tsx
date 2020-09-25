import React from 'react';
import { Layout } from '../../components/layout';
import Container from '../../components/Container';
import { Divider, Text, Box, Flex, Image, Button, Heading } from '@chakra-ui/core';
import ProductItem from '../../components/product/ProductItem';
import { products } from '../../data/fake-products';
import { useProductItem } from '../../hooks/useProductItem';
import { noImageFoundUrl } from '../../constants/image';
import { ICart } from '../../models/cart/cart.interface';
import { formatPrice } from '../../utilities/money';
import ScreenLoader from '../../components/ScreenLoader';

interface cartProps {
}

const calculateCartTotal = (cart: ICart) => {
  const total = cart.cartProducts.reduce((acc, cur) => {
    acc += (+cur.product.priceTobePaid);
    return acc;
  }, 0);
  return formatPrice(total);
}

const cart: React.FC<cartProps> = ({ }) => {
  const { toggleCartHandler, cart, isLoading } = useProductItem();

  return (
    <>
      <ScreenLoader show={isLoading} label='Loading' />
      <Layout>
        <Container
          bg="rgba(255,255,255,0.7)"
          borderRadius="lg"
          p="1rem"
          m="auto"
          mb="4rem"
          mt='2rem'
        >
          <Text
            as="h2"
            textTransform="uppercase"
            fontWeight={700}
            fontSize="xl"
            color="blue.700"
          >Your Cart</Text>
          <Divider />
          {cart?.cartProducts ? <Flex id='content' w='100%' justify='space-between' flexWrap='wrap-reverse'>
            <Box
              id='cart-items-container'
              flexBasis={['100%', '100%', '50%', '55%']}

            >
              {cart.cartProducts.map(cartProduct =>
                <ProductItem
                  key={cartProduct.id}
                  productTitle={cartProduct.product.displayName}
                  imageUrl={cartProduct.product.productImages[0]?.url ?? noImageFoundUrl}
                  imageAlt={cartProduct.product.displayName}
                  onDelete={() => toggleCartHandler(cartProduct.product.id)}
                  price={cartProduct.product.price}
                  discount={cartProduct.product.priceDiscount}
                />
              )}
            </Box>
            <Box flexBasis={['100%', '100%', '45%', '40%']} mb={4} id='summary-container'>
              <Box
                p='1rem'
                borderRadius="lg"
                bg="#fff"
                boxShadow="sm"
                justifyContent='space-between'
              >
                <Heading as='h3' size='lg'>Summary</Heading>
                <Divider />
                <Flex justifyContent='space-between'>
                  <Text fontWeight='500' fontSize='18px'>Total</Text>
                  <Text fontWeight='500' fontSize='18px' as='u'>{calculateCartTotal(cart)}</Text>
                </Flex>
              </Box>
            </Box>
          </Flex> :
            <Heading textAlign='center' color='gray.500'>No Items Added to Cart</Heading>}
        </Container>
      </Layout>
    </>
  );
};

export default cart;