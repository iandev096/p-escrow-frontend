import React from 'react';
import { FormControl, FormLabel, InputGroup, InputLeftElement, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, InputProps } from '@chakra-ui/core';

interface inputProps extends InputProps {
  id: string;
};
interface TextInputProps {
  label: string;
  inputProps: inputProps,
  leftIcon?: React.ReactNode
}

const CustomNumberInput = React.forwardRef((
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
        <NumberInput
          border='none'
          width='100%'
          defaultValue={0}
          >
          <NumberInputField
            isInvalid={inputProps.isInvalid}
            ref={ref}
            border='none'
            name={inputProps.name}
            errorBorderColor='red.300'
            {...inputProps}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </InputGroup>
    </FormControl>
  );
});

export default CustomNumberInput;