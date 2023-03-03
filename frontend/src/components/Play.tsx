import React from 'react'
import{Box,Button} from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import background from "../assets/2921.jpg"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { Input } from '@chakra-ui/react';

const Play:React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const navigate = useNavigate()
  const home = ()=>{
    navigate("/menu")
  }
  return (
   <Box 
   backgroundImage={`url(${background})`}
   backgroundSize={{base:"cover",md:"cover",lg:"cover"}}
   backgroundPosition="center"
   backgroundRepeat="no-repeat"
   h={{base:"100vh",md:"100vh",lg:"100vh"}}
   filter=" brightness(70%)"
   >
    
    <Button onClick={home}>Home</Button>
   
    
    <Modal
        //   initialFocusRef={initialRef}
        //   finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent 
        transform={isOpen ? "scale(2)" : "scale(1.5)"}
        transition="all 0.2s"
        bgColor="rgba(0,0,0,0)" >
          <ModalCloseButton />
          <ModalBody pb={0} mt={10} >
            <FormControl>
              <Input
              bgColor={"white"}
              h="40px"
              px={2}
              border="4px solid yellow"
              rounded="2xl"
              color={"black"}
              variant="unstyled"
                placeholder="Enter Room no to Join"
                
                
              />
            
            </FormControl>
          </ModalBody>

          <ModalFooter>
           
            <Button 
             letterSpacing={1}
             size="md"
             fontSize="2xl"
             fontWeight="bold"
             colorScheme="purple"
             borderRadius="full"
             px={10}
             py={6}
             boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
             _hover={{
               bg: "purple.700",
               boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.25)",
             }}
             _active={{
              bg: "purple.800",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
            }}
            _focus={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
            m="auto"
            onClick={onClose}>Submit</Button>
          </ModalFooter>

          
        </ModalContent>
      </Modal>


   </Box>
  )
}

export default Play