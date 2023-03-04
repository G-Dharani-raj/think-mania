import React from "react";
import { Grid, GridItem, Input, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/UserInput.module.css";
import logo from "../assets/Comp 1.json";
import Lottie from "lottie-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { ScaleFade } from "@chakra-ui/react";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import background from "../assets/3685.jpg";
import axios from "axios";
const Game: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen } = useDisclosure();
  const [player, setPlayer] = useState<string>("");
  const [room, setRoom] = useState<Number>(1);
  const [showLogo, setShowLogo] = useState(true);
  const [showPlay, setShowPlay] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
      onOpen();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const toast = useToast();
  ////sending user's name to backend
  const handleEnterPlayer = async () => {
    let playerName = player;
    try {
      console.log("working", playerName);
      let data = await axios.post(`http://localhost:8080/user/checkname`, {
        name: player,
      });
      window.localStorage.setItem("username", player );
      toast({
        title: "Account created.",
        description: "Looks fine, Let's go!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Account created.",
        description: "Username already taken!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <Box
      backgroundImage={`url(${background})`}
      backgroundSize={{ base: "cover", md: "cover", lg: "cover" }}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      h={{ base: "100vh", md: "100vh", lg: "100vh" }}
      filter="grayscale(25%) brightness(70%)"
    >
      <Modal isOpen={showModal} onClose={() => {}}>
        <ModalContent
          transform={showModal ? "scale(2)" : "scale(1.5)"}
          transition="all 0.2s"
          bgColor="rgba(0,0,0,0)"
        >
          <ModalHeader
            m="auto"
            letterSpacing={3}
            fontSize={{ base: "5xl", md: "8xl", lg: "5xl" }}
            fontWeight="extrabold"
            color="white"
          >
            Welcome
          </ModalHeader>
          <Text
            m="auto"
            color="yellow"
            mt="-1rem"
            fontSize={{ base: "lg", md: "2xl", lg: "lg" }}
            letterSpacing={2}
          >
            Game On, Brainiacs!</Text>
{ !showPlay ?<Text color="white" fontSize="sm" textAlign="center">Are you a true movie lover? Let's find out with this guessing game !</Text>:
 <Text color="white" fontSize="md" textAlign="center"> Think you're a true movie buff? Guess the movie from just a few clues !</Text> }          
          <ModalBody
            w="auto"
            h="auto"
            // border="2px solid yellow"
            m="auto"
            color={"White"}
          >
            <ScaleFade initialScale={0.9} in={isOpen}>
              {/* {showLogo && <Box ></Box>} */}
              <Box
                p="20px"
                color="white"
                mt={{ base: "8", md: "30", lg: "8" }}
                m="auto"
                bg={showLogo ? "none" : "#8d2949"}
                rounded="md"
                shadow="2xl"
                w={{ base: "300px", md: "350px", lg: "400px" }}
                h="auto"
              >
                {showLogo ? (
                  <Lottie
                    style={{ width: "200px", margin: "auto" }}
                    animationData={logo}
                  />
                ) : (
                  <Grid m="auto" w={"60%"} gap="5">
                    <GridItem>
                      <Input
                        bgColor={"white"}
                        h="40px"
                        px={2}
                        border="4px solid yellow"
                        rounded="2xl"
                        color={"black"}
                        variant="unstyled"
                        placeholder="Enter Unique Name"
                        onChange={(e: any) => setPlayer(e.target.value)}
                      />
                      {/* <button
                      className={styles.enterbutton}
                      onClick={handleEnterPlayer1}
                    >
                      Enter
                    </button> */}
                    </GridItem>
                    {/* <GridItem> */}
                    {/* <Input
                     bgColor={"yellow"}
                     h="40px"
                     px={2}
                      border="1px solid black"
                      rounded="2xl"
                     color={'black'}
                    
                      variant="unstyled"
                      placeholder="Enter Room Number"
                      onChange={(e: any) => setRoom(Number(e.target.value))}
                    /> */}
                    {/* <button
                      className={styles.enterbutton}
                      onClick={handleEnterPlayer1}
                    >
                      Create Room
                    </button> */}
                    {/* </GridItem> */}
                    <GridItem>
                      {/* <Input
                     bgColor={"yellow"}
                     h="40px"
                     px={2}
                      border="1px solid yellow"
                      rounded="2xl"
                     color={'black'}
                    
                      variant="unstyled"
                      placeholder="Enter Room no to Join"
                      onChange={(e: any) => setPlayer1(e.target.value)}
                    /> */}

                      <button
                        className={styles.enterbutton}
                        onClick={handleEnterPlayer}
                      >
                        Enter
                      </button>
                      {/* <button
                      className={styles.enterbutton}
                      onClick={handleEnterPlayer1}
                    >
                      Join Room
                    </button> */}
                    </GridItem>
                  </Grid>
                )}
              </Box>
            </ScaleFade>
          </ModalBody>
          <ModalFooter>
            {!showPlay  ? (
              <Button
                letterSpacing={1}
                size="md"
                fontSize="2xl"
                fontWeight="bold"
                colorScheme="green"
                borderRadius="full"
                px={10}
                py={6}
                boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
                _hover={{
                  bg: "green.700",
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.25)",
                }}
                _active={{
                  bg: "green.800",
                  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
                }}
                _focus={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
                m="auto"
                onClick={() => {
                  setShowLogo(false);
                  onOpen();
                  setShowPlay(true);
                }}
              >
                Let's Go
              </Button>
            ) : (
              <Link to="/game" style={{ margin: "auto" }}>
                {" "}
                <Button
                isDisabled={!player}
                  letterSpacing={3}
                  size="md"
                  fontSize="2xl"
                  fontWeight="bold"
                  colorScheme="green"
                  borderRadius="full"
                  px={10}
                  py={6}
                  boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
                  _hover={{
                    bg: "green.700",
                    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.25)",
                  }}
                  _active={{
                    bg: "green.800",
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
                  }}
                  _focus={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
                  onClick={() => {
                    setShowLogo(false);
                    onOpen();
                    setShowPlay(true);
                  }}
                >
                  Play
                </Button>
              </Link>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Game;
