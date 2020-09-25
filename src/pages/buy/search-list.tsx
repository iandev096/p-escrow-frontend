import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/layout';
import Container from '../../components/Container';
import { Text, Divider, Flex, Image, Box, Stack, PseudoBox } from '@chakra-ui/core';
import SearchListItem from '../../components/product/SearchListItem';
import useProducts from '../../store/swr/Product/useProduct';
import { noImageFoundUrl } from '../../constants/image';
import { useRouter } from 'next/router';
import { IProduct } from '../../models/product/product.interface';
import { ProductCategory } from '../../models/product/product.enum';
import { GetProductFilterDto } from '../../models/product/Product.dto';

interface searchListProps {

}

const searchList: React.FC<searchListProps> = ({ }) => {
  const [products, setProducts] = useState<IProduct[]>();
  const { query } = useRouter();
  const { searchProducts } = useProducts();

  useEffect(() => {
    console.log(query)
    let qParams: GetProductFilterDto = {};
    if (!query) return;

    if (query?.category) qParams.categories = [query?.category as ProductCategory];
    if (query?.product) qParams.search = query.product as string;

    if (query?.category || query?.product) {
      const cat = query?.category ? [query?.category as ProductCategory] : [];
      searchProducts(qParams)
        .then(prods => {
          console.log(prods);
          setProducts(prods);
        })
    }
  }, [query]);

  return (
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
        >Search List</Text>
        <Divider />
        <Box>
          {products?.map(product => (
            <PseudoBox
              key={product.id}
              px={4}
              py={4}
              borderBottomWidth="1px"
              _last={{ borderBottomWidth: 0 }}
            >
              <SearchListItem
                productId={product.id}
                imageUrl={product?.productImages[0]?.url ?? noImageFoundUrl}
                imageAlt={product.displayName}
                productTitle={product.displayName}
                price={product.price}
                discount={product.priceDiscount}
              />
            </PseudoBox>
          ))}
        </Box>
      </Container>
    </Layout>
  );
};

export default searchList