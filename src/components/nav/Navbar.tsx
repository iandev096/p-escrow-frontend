import React, { useState } from "react";
import { Flex, Image } from "@chakra-ui/core";
import { NavItem } from "./NavItem";
import { NavList } from "./NavList";
import { NavBackdrop } from "./NavBackdrop";
import { NavCollapseToggle } from "./NavCollapseToggle";
import Link from "next/link";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [showCollapse, setShowCollapse] = useState(false);

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        as="nav"
        h="4rem"
        px={[5]}
        w="100%"
        bg="white"
        borderBottom='1px solid rgba(0,0,0,0.2)'
      >
        <Link href='/' as='/'>
          <Image maxW="3rem" src="/img/logo.png" alt="logo" />
        </Link>
        <NavList collapsed={showCollapse} />
        <NavCollapseToggle onClick={() => setShowCollapse(true)} />
      </Flex>
      <NavBackdrop
        collapsed={showCollapse}
        onClick={() => setShowCollapse(false)}
      />
    </>
  );
};
