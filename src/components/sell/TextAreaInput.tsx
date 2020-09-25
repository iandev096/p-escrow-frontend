import React from 'react';
import { FormControl, FormLabel, InputGroup, InputProps, Textarea } from '@chakra-ui/core';

interface inputProps extends InputProps {
  id: string;
};
interface TextInputProps {
  label: string;
  inputProps: inputProps,
}

const TextAreaInput: React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<any>> = React.forwardRef(({ label, inputProps, ...rest }, ref) => {

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
        <Textarea ref={ref} id='' border='none' {...inputProps} />
      </InputGroup>
    </FormControl>
  );
});

export default TextAreaInput;