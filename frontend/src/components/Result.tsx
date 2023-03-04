import React, { useState } from "react";
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
  const handleLeaders = async () => {
    try {
      let res = await axios.get(
        `https://drab-yak-button.cyclic.app/user/leaderboard`
      );
      console.log(res.data, "jasdghasvdjhavskj");
      setLeaders(res.data);
    } catch (error) {
      console.log(error);
    }
  };
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
      <Box ml="26%" w="120px" textAlign="center">
        <Button variant={"unstyled"} onClick={home}>
          <FcHome size={"100%"} />
        </Button>
      </Box>
      {winScores >= 5 ? (
        <Box
          margin={"auto"}
          backgroundImage={`url(${win})`}
          w={"30%"}
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
                      <Tr>
                        {leaders.length > 0 &&
                          leaders.map((el) => {
                            return (
                              <>
                                <Td> {el.name} </Td>
                                <Td> {el.score} </Td>
                              </>
                            );
                          })}
                      </Tr>
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
          w={"30%"}
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
                      <Tr>
                        {leaders.length > 0 &&
                          leaders.map((el) => {
                            return <Td> </Td>;
                          })}
                      </Tr>
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
