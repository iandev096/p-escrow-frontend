import React from 'react';
import { FormControl, FormLabel, InputGroup, InputLeftElement, Input, InputProps } from '@chakra-ui/core';

interface inputProps extends InputProps {
  id: string;
};
interface TextInputProps {
  label: string;
  inputProps: inputProps,
  leftIcon?: React.ReactNode
}

const TextInput = React.forwardRef((
  { label, inputProps, leftIcon, ...rest }: TextInputProps,
  ref: (((instance: any) => void) & ((instance: HTMLInputElement) => void)) | (((instance: any) => void) & React.RefObject<HTMLInputElement>)
) => {

  return (
    <FormControl
      bg="rgba(255,255,255,0.5)"
      borderRadius="lg"
      boxShadow='sm'
      padding='1rem'
      isRequired
      {...rest}
    >
      <FormLabel htmlFor={inputProps.id}>{label}</FormLabel>
      <InputGroup>
        {leftIcon && <InputLeftElement children={leftIcon} />}
        <Input
          isInvalid={inputProps.isInvalid}
          errorBorderColor='red.300'
          id={inputProps.id}
          ref={ref}
          border='none'
          {...inputProps} />
      </InputGroup>
    </FormControl>
  );
});

export default TextInput;