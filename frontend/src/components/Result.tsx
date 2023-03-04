import React from "react";
import { Box, Button, Stack, Image, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import background from "../assets/3685.jpg";
import win from "../assets/win_board.png";
import lose from "../assets/lose_board_1.png";
import {FcHome} from "react-icons/fc"
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
    localStorage.removeItem("username");
    localStorage.removeItem("scores");
    navigate("/menu");
  };
  const winScores = Number(localStorage.getItem("scores"));
  const winUser = localStorage.getItem("username");
  console.log(winScores, winUser, " jhsdgfh");
  return (
    <Box
      backgroundImage={`url(${background})`}
      backgroundSize={{ base: "cover", md: "cover", lg: "cover" }}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      h={{ base: "100vh", md: "100vh", lg: "100vh" }}
      filter="grayscale(25%) brightness(80%)"
    >
      <Box ml={{lg:"26%"}} w="120px" textAlign="center" ><Button variant={"unstyled"} onClick={home}><FcHome size={"100%"}/></Button></Box>
      {winScores >= 4 ? (
        <Box
          margin={"auto"}
          backgroundImage={`url(${win})`}
          w={{base:"80%",md:"60%",lg:"30%"}}
          display="flex"
          justifyContent="center"
          alignItems={"center"}
          flexDirection={"column"}
          gap="10px"
          backgroundSize={{ base: "cover", md: "cover", lg: "cover" }}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          h={{ base: "80vh", md: "80vh", lg: "90vh" }}
        >
          <Heading
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt="5rem"
            fontSize="4xl"
            color="yellow"
            textShadow="0px 2px 2px black"
            gap={1}
          >
            
            <Text color="brown" fontSize="lg" as="i" mt="2rem" textShadow="none">
              Final Scores:
            </Text>
            {winUser}
          </Heading>
          <Heading  textShadow="0px 1px 2px black" fontSize={"6xl"} color="green">
            {winScores}
          </Heading>
        </Box>
      ) : (
        <Box
          margin={"auto"}
          backgroundImage={`url(${lose})`}
          w={{base:"80%",md:"60%",lg:"30%"}}
          display="flex"
          justifyContent="center"
          alignItems={"center"}
          flexDirection={"column"}
          gap="10px"
          backgroundSize={{ base: "cover", md: "cover", lg: "cover" }}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          h={{ base: "80vh", md: "80vh", lg: "90vh" }}
        >
          <Heading
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt="5rem"
            fontSize="4xl"
            color="Blue"
            textShadow="0px 2px 2px black"
            gap={1}
          >
            
            <Text color="brown" fontSize="lg" as="i" mt="2rem" textShadow="none">
              Final Scores:
            </Text>
            {winUser}
          </Heading>
          <Heading  textShadow="0px 1px 2px black" fontSize={"6xl"} color="red">
            {winScores}
          </Heading>
        </Box>
      )}
    </Box>
  );
};

export default Result;
