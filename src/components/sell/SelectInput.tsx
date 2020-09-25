import React from 'react';
import { FormControl, Select, FormLabel, SelectProps } from '@chakra-ui/core';

interface inputProps extends SelectProps {
  id: string;
};
interface SelectInputProps {
  label: string;
  inputProps: inputProps;
  selectItems: { label: string, value: string }[];
}

const SelectInput = React.forwardRef((
  { label, inputProps, selectItems, ...rest }: SelectInputProps,
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
      <Select
        ref={ref}
        border='none'
        {...inputProps}
      >
        {selectItems.map(item =>
          <option key={item.value} value={item.value}>{item.label}</option>)}
      </Select>
    </FormControl>
  );
});

export default SelectInput;