import React from 'react';
import { Box, BoxProps } from '@chakra-ui/core';

interface ContainerProps extends BoxProps {
}

const Container: React.FC<ContainerProps> = ({ children, ...rest }) => {

  return (
    <Box
      w={["98%", "90%", "80%"]}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Container