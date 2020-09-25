import React, { useState } from 'react';
import { Flex, Box, PseudoBox, Stack, ButtonGroup, Button, Text, Image, IconButton } from '@chakra-ui/core';
import { useForm, useFieldArray } from 'react-hook-form';
import FileInput from './FileInput';
import ScreenLoader from '../ScreenLoader';
import PictureLoadedModal from './PictureLoadedModal';
import PictureNotUploadedModal from './PictureNotUploadedModal';

interface PicturesFormProps {
  onProductImageUpload: (data: FormData) => Promise<void>;
  onContinue: () => any;
  onBack: Function;
}

type PicturesFormValues = {
  primaryImage: any;
}

const PicturesForm: React.FC<PicturesFormProps> = ({ onBack, onContinue, onProductImageUpload }) => {
  const { control, errors, register, watch } = useForm<PicturesFormValues>();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "secondaryImage",
    // keyName: "id", default to "id", you can change the key name
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadEnded, setLoadEnded] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [showPictureNotUploadedModal, setPictureNotUploadedModal] = useState(false);

  const addField = () => {
    if (fields.length === 4) return;
    append({ secondaryImage: '' });
  }

  const generateImageFormData = (imageData: FileList, productId: string, userId: string) => {
    const formdata = new FormData();
    formdata.append('file', imageData[0], imageData[0].name);
    formdata.append('upload_preset', 'g18hxhcx');
    // formdata.append(
    //   'callback',
    //   `${process.env.baseApiUrl}/products/cloudinary-callback?productId=${productId}&userId=${userId}&imageType=thumbnail`
    // );
    formdata.append('folder', `products/${userId}/`);
    return formdata;
  }

  const fileChangeHandler = async (imageData: FileList, productId: string, userId: string, onError?: Function) => {
    setIsLoading(true)
    const formdata = generateImageFormData(imageData, productId, userId);

    try {
      await onProductImageUpload(formdata);
      setImageUploaded(true);
      setIsLoading(false);
    }
    catch (err) {
      setIsLoading(false);
      throw err;
    }
  }

  return (
    <>
      <ScreenLoader
        show={isLoading}
      />
      <PictureLoadedModal
        show={loadEnded}
        onClose={() => setLoadEnded(false)}
        onContinue={() => onContinue()}
      />
      <PictureNotUploadedModal
        show={showPictureNotUploadedModal}
        onClose={() => setPictureNotUploadedModal(false)}
        onContinue={() => onContinue()}
      />
      <Flex h='calc(100vh - 4rem)'>
        <Box
          h='100%'
          flexBasis='50%'
          transform='skewX(-5deg)'
          display={['none', 'none', 'flex']}
          transformOrigin='top'
          overflow='hidden'
          backgroundColor='white'>
          <Image transform='skewX(5deg)' src='/img/pictures.png' />
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
            >Pictures</Text>
          </PseudoBox>
          <form>
            <Stack mt='1rem' spacing={4}>
              <FileInput
                label='Select primary image'
                inputProps={{
                  id: 'primary-image',
                  name: 'primaryImage',
                  isDisabled: watch('primaryImage')?.length ? true : false,
                  isInvalid: errors.primaryImage ? true : false
                }}
                onChange={
                  () => fileChangeHandler(
                    watch('primaryImage'),
                    'productId',
                    'userid')
                }
                ref={register({ required: true })}
              />
              <Stack spacing={4}>
                {fields.map((field) =>
                  <FileInput
                    label='Select secodary image'
                    inputProps={{
                      id: Date.now().toString(),
                      name: field.id,
                      isInvalid: watch<string, FileList>(field.id)?.length ? true : false,
                    }}
                    onChange={
                      () => fileChangeHandler(
                        watch<string, FileList>(field.id),
                        'productId',
                        'userid'
                      )
                    }
                    ref={register()}
                    key={field.id}
                  />)}
                <IconButton
                  variantColor="blue"
                  aria-label="Add picture field"
                  size="sm"
                  alignSelf='flex-start'
                  icon="add"
                  onClick={() => addField()}
                />
              </Stack>
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
                  onClick={() => {
                    if (!imageUploaded) {
                      setPictureNotUploadedModal(true);
                    } else {
                      onContinue();
                    }
                  }}
                >Done</Button>
              </ButtonGroup>
            </Stack>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default PicturesForm;