import { Box, Heading,VStack } from '@chakra-ui/react'
import React from 'react';

const NoRoutes = () => {
  return (
    <Box h="100vh" w="100%" alignItems="center" mt="5%" >
      <VStack>
        <Heading size="lg" as="h3" fontWeight="400" p="1%">No Routes Found</Heading>  
        <Heading size="lg" as="h3" fontWeight="400" p="1%">404</Heading>  
      </VStack>
    </Box>
  )
}

export default NoRoutes