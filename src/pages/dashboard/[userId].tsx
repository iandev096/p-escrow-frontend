import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/layout';
import Container from '../../components/Container';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/core';
import ProductItem from '../../components/product/ProductItem';
import { useProductItem } from '../../hooks/useProductItem';
import { IProduct } from '../../models/product/product.interface';
import { noImageFoundUrl } from '../../constants/image';
import ScreenLoader from '../../components/ScreenLoader';

interface dashboardProps {
}

const dashboard: React.FC<dashboardProps> = ({ }) => {
  const { toggleWishlistHandler, likedProducts, products, isLoading } = useProductItem();
  const [productsLiked, setProductsLiked] = useState<IProduct[]>();

  useEffect(() => {
    if (likedProducts && products) {
      const prodsLiked = likedProducts.reduce((acc: IProduct[], cur) => {
        const liked = products.find(prod => prod.id === cur.productId);
        if (liked) acc.push(liked);
        return acc;
      }, []);

      setProductsLiked(prodsLiked);
    }
  }, [likedProducts, products]);

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
          <Tabs>
            <TabList>
              <Tab>Wishlist</Tab>
              <Tab>Purchases</Tab>
              <Tab>My Products</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box
                  id='cart-items-container'
                  mt={4}
                >
                  {productsLiked?.map(liked =>
                    <ProductItem
                      key={liked.id}
                      productTitle={liked.displayName}
                      imageUrl={liked.productImages[0]?.url ?? noImageFoundUrl}
                      imageAlt={liked.displayName}
                      onDelete={() => toggleWishlistHandler(liked.id)}
                      price={liked.price}
                      discount={liked.priceDiscount}
                    />
                  )}
                </Box>
              </TabPanel>
              <TabPanel>
                <p>Purchases</p>
              </TabPanel>
              <TabPanel>
                <p>My Products</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Layout>
    </>
  );
};

export default dashboard;
