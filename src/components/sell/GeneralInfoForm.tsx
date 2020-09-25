import React from 'react';
import { Flex, Box, Image, PseudoBox, Text, Stack, Button } from '@chakra-ui/core';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import { useForm } from 'react-hook-form';

interface GeneralInfoFormProps {
  onContinue: (data: GeneralInfoFormValues) => any
}

export type GeneralInfoFormValues = {
  fullname: string;
  displayName: string;
  description: string;
}

const GeneralInfoForm: React.FC<GeneralInfoFormProps> = ({ onContinue }) => {
  const { register, handleSubmit, errors } = useForm<GeneralInfoFormValues>();

  return (
    <Flex h='calc(100vh - 4rem)'>
      <Box
        h='100%'
        flexBasis='50%'
        transform='skewX(-5deg)'
        display={['none', 'none', 'flex']}
        transformOrigin='top'
        backgroundColor='white'>
        <Image src='/img/general_info.png' />
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
          >General Info</Text>
        </PseudoBox>
        <form onSubmit={handleSubmit(onContinue)}>
          <Stack mt='1rem' spacing={4}>
            <TextInput
              inputProps={{
                id: 'full-name',
                name: 'fullname',
                isInvalid: errors.fullname ? true : false
              }}
              label='Product full name'
              ref={register({
                required: true
              })}
            />
            <TextInput
              inputProps={{
                id: 'display-name',
                name: 'displayName',
                isInvalid: errors.displayName ? true : false
              }}
              label='Product display name'
              ref={register({
                required: true
              })}
            />
            <TextAreaInput
              inputProps={{
                id: 'description',
                name: 'description',
                isInvalid: errors.description ? true : false
              }}
              label='Description'
              ref={register({
                required: true
              })}
            />
            <Button
              boxShadow='sm'
              variantColor='blue'
              w='100%'
              type='submit'
            >Continue</Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default GeneralInfoForm