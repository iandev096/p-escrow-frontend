import React from "react";
import { PseudoBox, Box, Text, Link as CLink } from "@chakra-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";
import { IconType } from "react-icons/lib";

interface BaseProps {
  icon: IconType;
  title: string;
  onClick?: Function;
}
interface Props extends BaseProps {
  path?: string;
  href?: string;
  as?: string;
}

const MenuItemContainer: React.FC<{ active: boolean; onClick?: Function }> = ({
  children,
  active,
  onClick,
}) => {
  return (
    <PseudoBox
      bg="gray.100"
      color={active ? "blue.700" : "gray.500"}
      backgroundColor={active ? "blue.100" : "initial"}
      _hover={{
        color: "blue.500",
        cursor: "pointer",
      }}
      _active={{ backgroundColor: "blue.50", color: "blue.700" }}
      px={3}
      py={[3, 1]}
      borderRadius="lg"
      onClick={() => onClick && onClick()}
    >
      {children}
    </PseudoBox>
  );
};

const MenuItemContent: React.FC<{ icon: IconType; title: string }> = ({
  icon,
  title,
}) => {
  return (
    <>
      <Box as={icon} color="inherit" mr={1} />
      <Text fontWeight="medium" color="inherit">
        {title}
      </Text>
    </>
  );
};

export const NavItem: React.FC<Props> = ({ path, href, as, icon, title }) => {
  const router = useRouter();
  
  return (
    <MenuItemContainer active={router.pathname === path || router.pathname == href}>
      <Link href={href ?? path} as={as ?? path}>
        <Box display="flex" alignItems="center" as="a">
          <MenuItemContent icon={icon} title={title} />
        </Box>
      </Link>
    </MenuItemContainer>
  );
};

export const UnLinkedNavItem: React.FC<BaseProps> = ({ icon, title, onClick }) => {
  return (
    <MenuItemContainer onClick={onClick} active={false}>
      <Box display="flex" alignItems="center" as="a">
        <MenuItemContent icon={icon} title={title} />
      </Box>
    </MenuItemContainer>
  );
};
