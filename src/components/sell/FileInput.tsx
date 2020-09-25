import React, { useState } from 'react';
import { FormControl, FormLabel, Input, InputProps, IconButton, Flex } from '@chakra-ui/core';

interface inputProps extends InputProps {
  id: string;
};
interface FileInputProps {
  label: string;
  inputProps: inputProps,
  onChange?: Function
}

const FileInput = React.forwardRef((
  { label, inputProps, onChange, ...rest }: FileInputProps,
  ref: (((instance: any) => void) & ((instance: HTMLInputElement) => void)) | (((instance: any) => void) & React.RefObject<HTMLInputElement>)
) => {
  const [showRetry, setShowRetry] = useState(false);
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
      <Flex>
        <Input
          ref={ref}
          id={inputProps.id}
          border='none'
          type='file'
          onChange={() => onChange().catch(() => setShowRetry(true))}
          variant='unstyled'
          {...inputProps} />
        {showRetry && <IconButton
          variantColor="orange"
          aria-label="Retry picture upload"
          size="xs"
          alignSelf='flex-start'
          icon="repeat"
          onClick={() => {
            setShowRetry(false);
            onChange().catch(() => setShowRetry(true));
          }}
        />}
      </Flex>
    </FormControl>
  );
});

export default FileInput;