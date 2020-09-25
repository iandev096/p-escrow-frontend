import React from "react";
import { Flex, Box, Input, Select, Button, Image, Text } from "@chakra-ui/core";
import { FiSearch } from "react-icons/fi";
import Container from "../Container";
import { enumToArray } from "../../utilities/enum";
import { ProductCategory } from "../../models/product/product.enum";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

interface HomeHeaderProps { }

export type SearchForm = {
  productName: string,
  category: ProductCategory | '';
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ }) => {
  const { register, handleSubmit, errors } = useForm<SearchForm>();
  const router = useRouter();

  const homeBg = (
    <Image
      src="/img/home-bg1.png"
      position="absolute"
      h={["54%", "64%", "74%", "84%"]}
      left={["13%", "13%", "-4%", "3%"]}
      top={["52%", "47%", "22%", "13%"]}
    />
  );
  
  const onSubmit = (fd: SearchForm) => {
    if (fd.productName || fd.category) {
      router.push({
        pathname: '/buy/search-list',
        query: {
          product: fd.productName,
          category: fd.category
        }
      });
    }
  }
  
  const formBox = (
    <Container width={["90%", "80%", "60%", "50%"]} textAlign="right">
      <Text
        textTransform="uppercase"
        fontSize={["2.1rem", '2.3rem', '2.8rem']}
        textAlign="center"
        color="blue.700"
        fontWeight={[800]}
        letterSpacing={["3px"]}
        lineHeight={["0.9"]}
        my={['3rem', '3.2rem', '4rem']}
      >
        Search Products
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          p="10px"
          borderRadius="lg"
          backgroundColor="rgba(255, 255, 255, 0.7)"
        >
          <Box flexGrow={1}>
            <Input
              ref={register()}
              name='productName'
              variant="unstyled"
              placeholder="Product name"
            />
          </Box>
          <Box flexBasis={["40%", "30%"]}>
            <Select
              onChange={e => console.log(e.target.value)}
              color="gray.400"
              variant="unstyled"
              placeholder="Category"
              ref={register()}
              name='category'
            >
              {enumToArray(ProductCategory).map(category =>
                <option key={category} value={category}>
                  {category.replace(/_/g, ' ')}
                </option>
              )}
            </Select>
          </Box>
          {/* <Box display={["none", "block"]} flexBasis="30%">
          <Select  color="gray.400" variant="unstyled" placeholder="Location">
          <option>All</option>
          </Select>
        </Box> */}
        </Flex>
        <Button
          type='submit'
          variantColor="blue"
          mt={[3, 4, 5]}
          rightIcon={FiSearch}>
          SEARCH
        </Button>
      </form>
    </Container>
  );

  return (
    <Flex
      height={["25rem", "28rem", "30rem"]}
      justify="center"
      position="relative"
      mt={{ sm: "2rem" }}
      mb={['6rem']}
    >
      {homeBg}
      {formBox}
    </Flex>
  );
};
