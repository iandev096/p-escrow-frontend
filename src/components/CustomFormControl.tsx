import React from 'react';
import { FormControl, InputGroup, InputLeftElement, Icon, Input, FormErrorMessage, InputProps, IconProps, FormControlProps } from '@chakra-ui/core';

interface CustomFormControlProps extends FormControlProps {
  inputProps: InputProps;
  iconProps: IconProps;
  errorMessage?: string
}

const CustomFormControl = React.forwardRef((
  { inputProps, iconProps, errorMessage, ...rest }: CustomFormControlProps,
  ref: (((instance: any) => void) & ((instance: HTMLInputElement) => void)) | (((instance: any) => void) & React.RefObject<HTMLInputElement>)
) => {

  return (
    <FormControl {...rest}>
      <InputGroup>
        <InputLeftElement
          children={<Icon  {...iconProps} />}
        />
        <Input
          ref={ref}
          {...inputProps}
        />
      </InputGroup>
      <FormErrorMessage>
        {errorMessage}
      </FormErrorMessage>
    </FormControl>
  );
});

export default CustomFormControl;