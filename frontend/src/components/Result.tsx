import React from 'react'
import{Box,Button , Stack, Image} from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import background from "../assets/2921.jpg"
import win from "../assets/win_board.png"
import lose from "../assets/lose_board_1.png"
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

const Result:React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const navigate = useNavigate()
  const home = ()=>{
    navigate("/menu")
  }
  return (
   <Box 
   backgroundImage={`url(${background})`}
   backgroundSize="cover"
   backgroundRepeat="no-repeat"
//    h={{base:"200vh", lg:"100vh"}}
   filter=" brightness(70%)"
   >
    
    <Button onClick={home}>Home</Button>
   
    
    <Box  display={{base:"block", lg:"flex"}}  w="90%" margin={"auto"}> 
        <Box margin={"auto"}  >
            <Image src={win} w="500px"/>
        </Box>
       
        <Box margin={"auto"}  >
            <Image src={lose} w="500px"/>
        </Box>

    </Box>


 







   </Box>
  )
}

export default Result