import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import "./AnimateButton.css"

const Links = [
              {name:'Appx Budget',link:'appxbudget'},
              {name:'Live Budget',link:'livebudget'},
              {name:'Trip Plan',link:'traveldetail'},
            ];



const NavLink = (props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box borderRadius={'0px'} className='button' px={4} zIndex={'999'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={10} alignItems={'center'}>
            <Link to={'/'}>
                <Box fontSize={'18px'} fontWeight={'500'}>Home</Box>
            </Link>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              <Link to={'/appxbudget'}>
              <Box fontSize={'18px'} fontWeight={'500'}>
                Get Approximate Budget
              </Box>
              </Link>
            </HStack>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              <Link to={'/livebudget'}>
              <Box fontSize={'18px'} fontWeight={'500'}>
                Get Live Budget
                </Box>
              </Link>
            </HStack>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              <Link to={'/traveldetail'}>
              <Box fontSize={'18px'} fontWeight={'500'}>
                Trip Plan
                </Box>
              </Link>
            </HStack>
          </HStack>
          
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <Link to={`${link.link}`}>
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
