import React from 'react';
import { Box } from '@chakra-ui/core';

interface NavBackdropProps {
  collapsed: boolean,
  onClick: Function,
}

export const NavBackdrop: React.FC<NavBackdropProps> = ({collapsed, onClick}) => {
  
  return (
    <>{collapsed && (
      <Box
        position="fixed"
        display={{ sm: "none" }}
        top="0"
        bottom="0"
        left="0"
        right="0"
        backgroundColor="gray.700"
        opacity={0.6}
        zIndex={900}
        onClick={() => onClick()}
      />
    )}</>
  );
};
