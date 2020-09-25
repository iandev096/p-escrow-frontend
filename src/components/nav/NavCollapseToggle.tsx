import React from "react";
import { Box } from "@chakra-ui/core";
import { FiAlignRight } from "react-icons/fi";

interface NavCollapseToggleProps {
  onClick: Function;
}

export const NavCollapseToggle: React.FC<NavCollapseToggleProps> = ({onClick}) => {

  return (
    <Box
      onClick={() => onClick()}
      as={FiAlignRight}
      display={["block", "none"]}
      color="grey.800"
      size={8}
    />
  );
};
