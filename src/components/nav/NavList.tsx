import React, { useContext, useState, useEffect } from "react";
import { PseudoBox } from "@chakra-ui/core";
import { NavItem, UnLinkedNavItem } from "./NavItem";
import { FiHome, FiCreditCard, FiShoppingBag, FiShoppingCart, FiUser, FiLogOut, FiSettings, FiSliders } from "react-icons/fi";
import { AuthContext } from "../../store/contexts/Auth/AuthProvider";
import LogoutDialog from "../auth/LogoutDialog";
import { useRouter } from "next/router";

interface NavListProps {
  collapsed: boolean;
}

export const NavList: React.FC<NavListProps> = ({ collapsed }) => {
  const { user, logout } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (user) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [user]);

  return (
    <>
      <PseudoBox
        position={["fixed", "relative"]}
        left={[0, "initial"]}
        top={[0, "initial"]}
        pt={[6, "initial"]}
        px={[1, "initial"]}
        backgroundColor={["white", "initial"]}
        w={["63vw", "initial"]}
        h={["100%", "initial"]}
        display={{ base: collapsed ? "block" : "none", sm: "flex" }}
        zIndex={[1000, 0]}
      >
        <NavItem path="/" icon={FiHome} title="Home" />
        <NavItem path="/buy" icon={FiCreditCard} title="Buy" />
        {isLoggedIn && <NavItem path='/sell' icon={FiShoppingBag} title="Sell" />}
        {isLoggedIn && <NavItem path='/cart' href='/cart/[userId]' as={"/cart/" + user?.userId} icon={FiShoppingCart} title="Cart" />}
        {isLoggedIn && <NavItem path='/profile' href="/profile/[userId]" as={"/profile/" + user?.userId} icon={FiSettings} title="Profile" />}
        {isLoggedIn && <NavItem path='/dashboard' href="/dashboard/[userId]" as={"/dashboard/" + user?.userId} icon={FiSliders} title="Dashboard" />}
        {!isLoggedIn && <NavItem path="/auth" icon={FiUser} title="Login" />}
        {isLoggedIn && <UnLinkedNavItem icon={FiLogOut} onClick={() => setShowLogout(true)} title="Logout" />}
      </PseudoBox>
      <LogoutDialog
        isOpen={showLogout}
        noHandler={() => setShowLogout(false)}
        yesHandler={() => {
          logout();
          setShowLogout(false);
          router.replace('/');
        }}
      />
    </>
  );
};
