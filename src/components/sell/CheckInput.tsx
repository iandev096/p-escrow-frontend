import React from 'react';
import { CheckboxGroup, Checkbox, CheckboxGroupProps, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core';
import { Controller, Control } from 'react-hook-form';

interface checkGroupProps extends CheckboxGroupProps {
  id: string;
}
interface CheckInputProps {
  checkItems: { label: string, value: string }[];
  checkGroupProps: checkGroupProps;
  label: string;
  errorMessage?: string;
  control: Control
}

const CheckInput: React.FC<CheckInputProps> = (
  { checkItems, checkGroupProps, label, errorMessage, control, ...rest }
) => {

  return (
    <Controller 
      name={checkGroupProps.name}
      control={control}
      render={(props) => 
        <FormControl
          bg="rgba(255,255,255,0.5)"
          borderRadius="lg"
          boxShadow='sm'
          padding='1rem'
          isRequired
          {...rest}
        >
          <FormLabel htmlFor={checkGroupProps.id}>{label}</FormLabel>
          <CheckboxGroup
            variantColor="blue"
            defaultValue={[]}
            maxHeight='213px'
            overflowY='scroll'
            onChange={values => {
              props.onChange(values);
            }}
            {...checkGroupProps}
          >
            {checkItems.map(item => <Checkbox key={item.label} mr={4} value={item.value}>{item.label}</Checkbox>)}
          </CheckboxGroup>
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
      }
    />
 );
};

export default CheckInput;