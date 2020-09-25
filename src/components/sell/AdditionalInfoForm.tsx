import React from 'react';
import { Flex, Box, Image, PseudoBox, Text, Stack, Button, ButtonGroup } from '@chakra-ui/core';
import TextInput from './TextInput';
import CustomNumberInput from './NumberInput';
import { useForm } from 'react-hook-form';
import { ProductStatus } from '../../models/product/product.enum';
import SelectInput from './SelectInput';

interface AdditionalInfoFormProps {
  onContinue: (data: AdditionalInfoFormValues) => any;
  onBack: Function;
}

export type AdditionalInfoFormValues = {
  price: number;
  location: string;
  status: ProductStatus;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({ onContinue, onBack }) => {
  const { register, handleSubmit, errors } = useForm<AdditionalInfoFormValues>();

  return (
    <Flex h='calc(100vh - 4rem)'>
      <Box
        h='100%'
        flexBasis='50%'
        transform='skewX(-5deg)'
        display={['none', 'none', 'flex']}
        transformOrigin='top'
        overflow='hidden'
        backgroundColor='white'>
        <Image transform='skewX(5deg)' src='/img/additional_info.png' />
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
          >Additional Info</Text>
        </PseudoBox>
        <form onSubmit={handleSubmit(onContinue)} >
          <Stack mt='1rem' spacing={4}>
            <CustomNumberInput
              inputProps={{
                id: 'price',
                name: 'price',
                isInvalid: errors.price ? true : false
              }}
              label='Price'
              ref={register({
                required: true,
                min: 0
              })}
            />
            <TextInput
              inputProps={{
                id: 'location',
                name: 'location',
                isInvalid: errors.location ? true : false
              }}
              label='Location'
              ref={register({
                required: true
              })}
            />
            <SelectInput
              inputProps={{
                id: 'status',
                name: 'status',
                placeholder: 'Select Status',
                isInvalid: errors.status ? true : false    
              }}
              label='Status'
              ref={register({ required: true })}
              selectItems={[
                {value: 'Available', label: 'Available'},
                {value: 'Not_Available', label: 'Not Available'}
              ]}
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

export default AdditionalInfoForm