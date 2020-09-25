import React, { useState, useReducer, useCallback, useEffect, useContext } from 'react';
import { Layout } from '../../components/layout';
import { Box, Text } from '@chakra-ui/core';
import GeneralInfoForm, { GeneralInfoFormValues } from '../../components/sell/GeneralInfoForm';
import AdditionalInfoForm, { AdditionalInfoFormValues } from '../../components/sell/AdditionalInfoForm';
import CategoriesInfoForm, { CategoriesFormValues } from '../../components/sell/CategoriesInfoForm';
import PicturesForm from '../../components/sell/PicturesForm';
import { useRouter } from 'next/router';
import { useProducts } from '../../store/swr/Product/useProduct';
import { CreateProductDto, UpdateProductDto } from '../../models/product/Product.dto';
import { IProduct } from '../../models/product/product.interface';
import { ProductCategory } from '../../models/product/product.enum';
import ScreenLoader from '../../components/ScreenLoader';
import { ErrorModal } from '../../components/ErrorModal';
import { AuthContext } from '../../store/contexts/Auth/AuthProvider';

interface sellProps {
  onContinue: Function;
  onBack: Function;
}

type formState = {
  general: GeneralInfoFormValues,
  additional: AdditionalInfoFormValues,
  categories: CategoriesFormValues,
  pictures: any,
}

const sell: React.FC<sellProps> = ({ onContinue, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [displayMode, setDisplayMode] = useState<keyof formState>('general');
  const [generalInfo, setGeneralInfo] = useState<GeneralInfoFormValues>();
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfoFormValues>();
  const [categories, setCategories] = useState<CategoriesFormValues>();
  const [product, setProduct] = useState<IProduct>();
  const [error, setError] = useState({ show: false, message: '' });
  const { addProductCategory, createProduct, updateProduct, uploadProductImage } = useProducts();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const createProductHandler = async (data: CreateProductDto) => {
    try {
      const prod = await createProduct(data);
      setProduct(prod);
      setDisplayMode('categories');
    } catch (err) {
      if (err.status != 401)
        setError({ show: true, message: 'There was an error creating the product' });
    }
  }

  const updateProductHandler = useCallback(async (data: UpdateProductDto) => {
    setIsLoading(true);
    try {
      const prod = await updateProduct(data, product.id);
      setProduct(prod);
      setDisplayMode('categories');
    } catch (err) {
      if (err.status != 401)
        setError({ show: true, message: 'There was an error updating the product' });
    }
    setIsLoading(false);
  }, [product]);

  const additionalInfoSubmitHandler = useCallback(async (data: CreateProductDto) => {
    if (product) {
      await updateProductHandler(data);
    } else {
      await createProductHandler(data);
    }
  }, [updateProductHandler]);

  const addProductToCategoryHanlder = useCallback(async (productCategories: ProductCategory[]) => {
    setIsLoading(true);
    if (!product) return;
    try {
      await addProductCategory(productCategories, product.id);
      setDisplayMode('pictures');
    } catch (err) {
      if (err.status != 401)
        setError({ show: true, message: 'There was an error adding product categories' });
    }
    setIsLoading(false);
  }, [product]);

  const uploadProductImageHandler = useCallback(async (data: FormData) => {
    setIsLoading(true);
    try {
      data.append(
        'callback',
        `${process.env.baseApiUrl}/products/cloudinary-callback?productId=${product.id}&userId=${user.userId}&imageType=thumbnail`
      );
      await uploadProductImage(data);
    } catch (err) {
      setError({ show: true, message: 'There was an error uploading the product image' });
    }
    setIsLoading(false);
  }, [product, user]);

  return (
    <>
      <ScreenLoader show={isLoading} />
      <ErrorModal
        isOpen={error.show}
        onClose={() => setError({ show: false, message: '' })}
        errorMessage={error.message}
      />
      <Layout>
        <Box display={displayMode === 'general' ? 'initial' : 'none'}>
          <GeneralInfoForm onContinue={(fd) => {
            setDisplayMode('additional');
            setGeneralInfo(fd);
          }} />
        </Box>
        <Box display={displayMode === 'additional' ? 'initial' : 'none'}>
          <AdditionalInfoForm
            onBack={() => setDisplayMode('general')}
            onContinue={(fd) => {
              setAdditionalInfo(fd);
              const prodData: CreateProductDto = {
                currency: 'GH₵',
                description: generalInfo.description,
                displayName: generalInfo.displayName,
                fullName: generalInfo.fullname,
                lat: 0,
                lng: 0,
                location: fd.location,
                price: fd.price,
                priceDiscount: 0,
                status: fd.status
              };
              additionalInfoSubmitHandler(prodData);
            }}
          />
        </Box>
        <Box display={displayMode === 'categories' ? 'initial' : 'none'}>
          <CategoriesInfoForm
            onBack={() => setDisplayMode('additional')}
            onContinue={(fd) => {
              setCategories(fd);
              addProductToCategoryHanlder(fd.categories)
            }}
          />
        </Box>
        <Box display={displayMode === 'pictures' ? 'initial' : 'none'}>
          <PicturesForm
            onBack={() => setDisplayMode('categories')}
            onContinue={() => router.replace('/')}
            onProductImageUpload={uploadProductImageHandler}
          />
        </Box>
      </Layout>
    </>
  );
};

export default sell;