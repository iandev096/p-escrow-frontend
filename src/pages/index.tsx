import { Layout } from "../components/layout";
import { HomeHeader } from "../components/home/HomeHeader";
import { ProductSection } from "../components/home/ProductSection";
import { useProducts } from "../store/swr/Product/useProduct";
import ScreenLoader from "../components/ScreenLoader";

export default function Home() {
  const { products, isPending } = useProducts();

  return (
    <>
    <ScreenLoader show={isPending} label='Getting Started' />
    <Layout>
      <HomeHeader />
      <ProductSection heading="Featured Products" products={products} />
      <ProductSection heading="Recent Products" products={products} />
    </Layout>
    </>
  );
}
