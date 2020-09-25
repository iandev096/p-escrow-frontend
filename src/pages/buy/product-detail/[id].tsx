import React, { useCallback, useEffect, useState } from 'react';
import { Layout } from '../../../components/layout';
import Container from '../../../components/Container';
import { Text, Divider, Flex, Box, Image, ButtonGroup, Button } from '@chakra-ui/core';
import Slider, { Settings } from 'react-slick';
import { useRouter } from 'next/router';
import { IProduct } from '../../../models/cart/cart.interface';
import useProducts from '../../../store/swr/Product/useProduct';
import { formatPrice } from '../../../utilities/money';
import { useProductItem } from '../../../hooks/useProductItem';
import { noImageFoundUrl } from '../../../constants/image';
import ScreenLoader from '../../../components/ScreenLoader';

interface productDetailProps {
}

const images = [
  'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://i.pcmag.com/imagery/reviews/05PEXoDoiSN5HXomKOYFTJ7-18.fit_lpad.size_624x364.v_1574731239.jpg'
]

const productDetail: React.FC<productDetailProps> = ({ }) => {
  const { query } = useRouter();
  const [product, setProduct] = useState<IProduct>();
  const { products, toggleCartHandler, toggleWishlistHandler, inCart, inWishlist, isLoading } = useProductItem();

  useEffect(() => {
    if (query && products) {
      const id = query.id as string;
      setProduct(products.find(prod => prod.id === id));
    }
  }, [query, products]);

  const getSettings = useCallback(
    (): Settings => product && ({
      customPaging: function (i) {
        return (
          <a>
            <img src={product.productImages[i]?.url ?? noImageFoundUrl} />
          </a>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    }),
    [product],
  );

  return (
    <>
      <ScreenLoader show={isLoading} label='Toggling...' />
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
          >Product Detail</Text>
          <Divider />
          {product && <Flex flexWrap='wrap'>
            <Box maxW={['100%','45%']} flexBasis={['100%','45%']}>
              <Slider {...getSettings()}>
                {product?.productImages.map(prodImage => (
                  <Box key={prodImage.id}>
                    <Image
                      objectFit='contain'
                      src={prodImage.url ?? noImageFoundUrl}
                    />
                  </Box>
                ))}
              </Slider>
            </Box>
            <Box flexBasis={['100%','50%']} ml='auto'>
              <Text
                as='h3'
                fontSize='17px'
                fontWeight='100'
                textTransform='uppercase'
              >{product?.fullName}</Text>
              <Flex>
                <Text color={+product.priceDiscount && 'gray.400'} as={+product.priceDiscount ? 's' : 'em'}>{formatPrice(product.price)}</Text>
                {+product.priceDiscount && <Text as='em'>
                  {formatPrice(Math.max(0, +product.price - +product.priceDiscount).toString())}
                </Text>}
              </Flex>
              <Box mt='0.5rem'>
                <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, repellat nesciunt. Atque maiores, adipisci alias numquam, obcaecati, libero aliquam recusandae inventore quis quos iste excepturi magni voluptatem beatae amet voluptas.</Text>
              </Box>
              <ButtonGroup mt='1rem'>
                <Button
                  variantColor='red'
                  variant='outline'
                  onClick={() => toggleWishlistHandler(product.id)}
                >
                  {inWishlist(product.id) ? 'Remove from' : 'Add to'} Wishlist
              </Button>
                <Button
                  variantColor='blue'
                  onClick={() => toggleCartHandler(product.id)}
                >
                  {inCart(product.id) ? 'Remove from' : 'Add to'} Cart
              </Button>
              </ButtonGroup>
            </Box>
          </Flex>
          }
        </Container>
      </Layout>
    </>
  );
};

export default productDetail