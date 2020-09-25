import React, { useEffect } from 'react';
import { Flex, Box, PseudoBox, Stack, ButtonGroup, Button, Image, Text } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import CheckInput from './CheckInput';
import { enumToArray } from '../../utilities/enum';
import { ProductCategory } from '../../models/product/product.enum';

interface CategoriesInfoFormProps {
  onContinue: (data: CategoriesFormValues) => any;
  onBack: Function;
}

export type CategoriesFormValues = {
  categories: ProductCategory[];
}

const CategoriesInfoForm: React.FC<CategoriesInfoFormProps> = ({ onBack, onContinue }) => {
  const { watch, handleSubmit, errors, control } = useForm<CategoriesFormValues>();

  return (
    <Flex h='calc(100vh - 4rem)'>
      <Box
        h='100%'
        flexBasis='50%'
        transform='skewX(-5deg)'
        display={['none', 'none','flex']}
        transformOrigin='top'
        overflow='hidden'
        backgroundColor='white'>
        <Image transform='skewX(5deg)' src='/img/categories.png' />
      </Box>
      <Box
        h='100%'
        flexBasis={['100%', '100%', '50%']}
        padding='2rem'
      >
        <PseudoBox
          bg="rgba(255,255,255,0.5)"
          borderRadius="lg"
          p="1rem"
          boxShadow='md'
        >
          <Text
            fontSize='1.5rem'
            fontWeight='800'
            textTransform='uppercase'
            letterSpacing='2px'
            textAlign='center'
          >Categories Info</Text>
        </PseudoBox>
        <form onSubmit={handleSubmit(onContinue)} >
          <Stack mt='1rem' spacing={4}>
            <CheckInput
              checkItems={
                enumToArray(ProductCategory)
                  .map(item =>
                    ({
                      label: (item as string).replace(/_/g, ' '),
                      value: item as string
                    })
                  )
              }
              control={control}
              checkGroupProps={{
                name: 'categories',
                id: 'categories',
              }}
              label='Select Categories'
              errorMessage={errors.categories && 'Please make a selection'}
            />
            <ButtonGroup display='flex' spacing={4}>
              <Button
                boxShadow='sm'
                variant='outline'
                variantColor='blue'
                flex='1'
                onClick={() => onBack()}
              >Back</Button>
              <Button
                boxShadow='sm'
                variantColor='blue'
                flex='1'
                type='submit'
              >Continue</Button>
            </ButtonGroup>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default CategoriesInfoForm