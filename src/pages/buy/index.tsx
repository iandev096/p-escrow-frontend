import React from 'react';
import { Layout } from '../../components/layout';
import { ProductGrid } from '../../components/product/ProductGrid';
import Container from '../../components/Container';
import { useProducts } from '../../store/swr/Product/useProduct';
import ScreenLoader from '../../components/ScreenLoader';

interface productsProps {
}

const productsList: React.FC<productsProps> = ({ }) => {
  const { products, isPending } = useProducts();

  return (
    <>
      <ScreenLoader show={isPending} label='Getting Started' />
      <Layout>
        <Container
          bg="rgba(255,255,255,0.7)"
          borderRadius="lg"
          p="1rem"
          m="auto"
          mb="4rem"
        >
          <ProductGrid
            products={products}
          />
        </Container>
      </Layout>
    </>
  );
};

export default productsList