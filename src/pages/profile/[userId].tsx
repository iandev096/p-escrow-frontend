import React, { useState, useContext } from 'react';
import { Layout } from '../../components/layout';
import Container from '../../components/Container';
import { Flex, Image, Button, Input, InputGroup, InputLeftElement, Stack, Divider, Alert, AlertIcon, AlertTitle, CloseButton, Box } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import CustomFormControl from '../../components/CustomFormControl';
import { emailRegex } from '../../constants/regex';
import { AuthContext } from '../../store/contexts/Auth/AuthProvider';
import { useContactDetail } from '../../store/swr/ContactDetail/useContactDetail';
import { useAlert } from 'react-alert';

interface profileProps {
}

type FormValues = {
  fullname: string;
  email: string;
  residentialAddress: string;
  city: string;
  country: string;
};

const profile: React.FC<profileProps> = ({ }) => {
  const { register, handleSubmit, errors } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>();
  const { user } = useContext(AuthContext);
  const { contactDetail, createContactDetail, updateContactDetail } = useContactDetail();
  const alert = useAlert();

  const onSubmit = async (fd: FormValues) => {
    console.log(fd);
    setLoading(true);
    try {
      if (!contactDetail) {
        await createContactDetail({
          country: fd.country,
          city: fd.city,
          residentialAddress: fd.residentialAddress
        });
        alert.show('Profile updated');
      } else {
        await updateContactDetail({
          country: fd.country,
          city: fd.city,
          residentialAddress: fd.residentialAddress
        });
        alert.show('Profile updated');
      }
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  }

  return (
    <Layout>
      <Container
        bg="rgba(255,255,255,0.7)"
        borderRadius="lg"
        m="auto"
        mb="4rem"
        mt='2rem'
        overflow='hidden'
      >
        <Flex
          backgroundColor='blue.600'
          justifyContent='center'
          alignItems='center'
          minH='286px'
          flexDirection='column'
        >
          <Image
            borderRadius='50%'
            h='8rem'
            w='8rem'
            objectFit='cover'
            src='/img/no-profile-picture.jpg'
          />
          <Button
            mt={8}
            variant='outline'
            borderColor='#ffffffe0'
            color='#ffffffdd'
            _hover={{
              borderColor: '#ffffffe0',
              color: 'blue.500',
              background: '#ffffffe0'
            }}
            leftIcon='arrow-up'>Upload Image</Button>
        </Flex>
        <Flex my='2rem' justifyContent='center'>
          <Box w={['90%', '60%', '50%', '40%']}>
            <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <CustomFormControl
                  isRequired
                  inputProps={{
                    defaultValue: user?.fullName,
                    name: "fullname",
                    type: "name",
                    isDisabled: true,
                    _disabled: { color: 'gray.500' },
                    placeholder: "Full name",
                    "aria-label": "Full name",
                  }}
                  iconProps={{ name: "info", color: "blue.600" }}
                  ref={register({
                    required: true,
                  })}
                  errorMessage={errors?.fullname?.message}
                />
                <CustomFormControl
                  isRequired
                  inputProps={{
                    defaultValue: user?.email,
                    name: "email",
                    type: "email",
                    isDisabled: true,
                    _disabled: { color: 'gray.500' },
                    placeholder: "Email",
                    "aria-label": "Email",
                  }}
                  iconProps={{ name: "email", color: "blue.600" }}
                  ref={register({
                    required: true,
                    pattern: emailRegex,
                  })}
                  errorMessage={errors.email?.message}
                />
                <Divider borderColor="gray.300" />
                <CustomFormControl
                  isRequired
                  inputProps={{
                    defaultValue: contactDetail?.country,
                    name: "country",
                    type: "text",
                    placeholder: "Country",
                    "aria-label": "Country",
                  }}
                  iconProps={{ name: "plus-square", color: "blue.600" }}
                  ref={register({
                    required: true,
                  })}
                  errorMessage={errors.country?.message}
                />
                <CustomFormControl
                  isRequired
                  inputProps={{
                    defaultValue: contactDetail?.city,
                    name: "city",
                    type: "text",
                    placeholder: "City",
                    "aria-label": "City",
                  }}
                  iconProps={{ name: "plus-square", color: "blue.600" }}
                  ref={register({
                    required: true,
                  })}
                  errorMessage={errors.city?.message}
                />
                <CustomFormControl
                  isRequired
                  inputProps={{
                    defaultValue: contactDetail?.residentialAddress,
                    name: "residentialAddress",
                    type: "text",
                    placeholder: "Residential Address",
                    "aria-label": "Residential Address",
                  }}
                  iconProps={{ name: "at-sign", color: "blue.600" }}
                  ref={register({
                    required: true,
                  })}
                  errorMessage={errors.residentialAddress?.message}
                />
                <Button
                  type="submit"
                  boxShadow="sm"
                  variant="solid"
                  variantColor="blue"
                  _hover={{ boxShadow: "md" }}
                  _active={{ boxShadow: "lg" }}
                  isLoading={loading}
                >
                  Update Profile
                </Button>
                {formError && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{formError}</AlertTitle>
                    <CloseButton
                      position="absolute"
                      right="8px"
                      top="8px"
                      onClick={() => setFormError(null)}
                    />
                  </Alert>
                )}
              </Stack>
            </form>
          </Box>
        </Flex>
      </Container>

    </Layout>
  );
};

export default profile;