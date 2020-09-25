import React from 'react';
import { Layout } from '../components/layout';
import { Box } from '@chakra-ui/core';
import { AuthTabs } from '../components/auth/AuthTabs';

interface authProps {
}

const auth: React.FC<authProps> = ({}) => {

  return (
    <Layout>
      <Box py='10vh'>
        <AuthTabs />
      </Box>
    </Layout>
  );
};

export default auth;