import React, { useContext } from "react";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Image,
} from "@chakra-ui/core";
import { SignupForm } from "./SignupForm";
import { LoginForm } from "./LoginForm";
import { AuthContext } from "../../store/contexts/Auth/AuthProvider";

interface AuthTabsProps {}

export const AuthTabs: React.FC<AuthTabsProps> = ({}) => {
  const { login, signup } = useContext(AuthContext);
  return (
    <Box
      bg="white"
      m="auto"
      maxW={[320, 350]}
      p={14}
      boxShadow="sm"
      rounded="lg"
    >
      <Image src="/img/logo.png" w={80} mx="auto" mb={8} />
      <Tabs m={4} isFitted>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Sign up</Tab>
        </TabList>
        <TabPanels mt={3}>
          <TabPanel>
            <LoginForm loginHandler={login} />
          </TabPanel>
          <TabPanel>
            <SignupForm signupHandler={signup} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
