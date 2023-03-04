import React from "react";
import { Box, Button, Stack, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import background from "../assets/2921.jpg";
import win from "../assets/win_board.png";
import lose from "../assets/lose_board_1.png";
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
import { Input } from "@chakra-ui/react";

const Result: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const navigate = useNavigate();
  const home = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('scores')
    navigate("/menu");
  };
  const winScores = Number(localStorage.getItem("scores"));
  const winUser = localStorage.getItem("username");
  console.log(winScores, winUser, " jhsdgfh");
  return (
    <Box
      backgroundImage={`url(${background})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
         h={"100vh"}
      filter=" brightness(70%)"
    >
      <Button onClick={home}>Home</Button>
{winScores >= 4?
      <Box  margin={"auto"} backgroundImage={`url(${win})`}
           w={'30%'} display="flex"  justifyContent="center" alignItems={'center'} 
           flexDirection={"column"} gap="10px"
          backgroundSize={{ base: "cover", md: "cover", lg: "cover" }}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          h={{ base: "80vh", md: "80vh", lg: "90vh" }}
          >
       <h1>{ winUser} </h1>
       <h1>{ winScores} </h1>
      </Box>
      :
      <Box  margin={"auto"} backgroundImage={`url(${lose})`}
           w={'30%'} display="flex"  justifyContent="center" alignItems={'center'} 
           flexDirection={"column"} gap="10px"
          backgroundSize={{ base: "cover", md: "cover", lg: "cover" }}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          h={{ base: "80vh", md: "80vh", lg: "90vh" }}
          >
       <h1>{ winUser} </h1>
       <h1>{ winScores} </h1>
      </Box>}
    </Box>
  );
};

export default Result;
