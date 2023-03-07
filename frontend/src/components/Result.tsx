import React, { useState, useEffect } from "react";
import { Box, Button, Stack, Image, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import background from "../assets/3685.jpg";
import win from "../assets/win_board.png";
import lose from "../assets/lose_board_1.png";
import { FcHome } from "react-icons/fc";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
const Result: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const home = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("scores");
    navigate("/menu");
  };
  interface user {
    name: string;
    score: number;
  }
  const [leaders, setLeaders] = useState<user[]>([]);

  const winScores = Number(localStorage.getItem("scores"));
  const winUser = localStorage.getItem("username");

  const sendLeaders = async () => {
    let user = {
      name: localStorage.getItem("username"),
      score: Number(localStorage.getItem("scores")),
    };

    try {
      let res = await axios.post(
        `https://drab-yak-button.cyclic.app/user/adddetails`,
        user
      );
      console.log(res.data, "leader name posted");
      // setLeaders(res.data);
    } catch (error) {
      console.log(error);
    }
  };
useEffect(()=>{
  sendLeaders()
},[])
  const handleLeaders = async () => {
    try {
      let res = await axios.get(
        `https://drab-yak-button.cyclic.app/user/leaderboard`
      );
      console.log(res.data, "getting 10 leaders");
      setLeaders(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //console.log(winScores, winUser, " local storaage");
  console.log(leaders, "10");
  return (
    <Box
      backgroundImage={`url(${background})`}
      backgroundSize={{ base: "cover", md: "cover", lg: "cover" }}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      h={{ base: "100vh", md: "100vh", lg: "100vh" }}
      filter="grayscale(25%) brightness(80%)"
    >
      <Box ml={{ lg: "26%" }} w="120px" textAlign="center">
        <Button variant={"unstyled"} onClick={home}>
          <FcHome size={"100%"} />
        </Button>
      </Box>
      {winScores >= 6 ? (
        <Box
          margin={"auto"}
          backgroundImage={`url(${win})`}
          w={{ base: "80%", md: "60%", lg: "30%" }}
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
            <Text
              color="brown"
              fontSize="lg"
              as="i"
              mt="2rem"
              textShadow="none"
            >
              Final Scores:
            </Text>
            {winUser}
          </Heading>
          <Heading
            textShadow="0px 1px 2px black"
            fontSize={"6xl"}
            color="green"
          >
            {winScores}
          </Heading>
          <Button
            letterSpacing={"1px"}
            size="md"
            fontSize="2xl"
            fontWeight="bold"
            colorScheme="purple"
            borderRadius="full"
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
            onClick={() => {
              onOpen();
              
              handleLeaders();
            }}
          >
            Leaderboard
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Leaderboard</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* <Lorem count={2} /> */}
                <TableContainer>
                  <Table variant="striped" colorScheme="teal">
                    <TableCaption>Last 10 players scores</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Scores</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {leaders.length > 0 &&
                        leaders.map((el) => {
                          return (
                            <>
                              <Tr>
                                <Td> {el.name} </Td>
                                <Td> {el.score} </Td>
                              </Tr>
                            </>
                          );
                        })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      ) : (
        <Box
          margin={"auto"}
          backgroundImage={`url(${lose})`}
          w={{ base: "80%", md: "60%", lg: "30%" }}
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
            <Text
              color="brown"
              fontSize="lg"
              as="i"
              mt="2rem"
              textShadow="none"
            >
              Final Scores:
            </Text>
            {winUser}
          </Heading>
          <Heading textShadow="0px 1px 2px black" fontSize={"6xl"} color="red">
            {winScores}
          </Heading>
          <Button
            letterSpacing={"1px"}
            size="md"
            fontSize="2xl"
            fontWeight="bold"
            colorScheme="purple"
            borderRadius="full"
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
            onClick={() => {
              onOpen();
              handleLeaders();
            }}
          >
            Leaderboard
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Leaderboard</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* <Lorem count={2} /> */}
                <TableContainer>
                  <Table variant="striped" colorScheme="teal">
                    <TableCaption>Last 10 players scores</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Scores</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {leaders.length > 0 &&
                        leaders.map((el) => {
                          return (
                            <Tr>
                              <Td> {el.name} </Td>
                              <Td> {el.score} </Td>
                            </Tr>
                          );
                        })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </Box>
  );
};

export default Result;
