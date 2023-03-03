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
  const [player, setPlayer] = useState<String>("");
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
      axios
        .post(`https://drab-gray-lobster-yoke.cyclic.app/register`)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            toast({
              title: "Account created.",
              description: "We've created your account for you.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          } else if (res.status == 403) {
            toast({
              title: "User already exists.",
              description: "Try with another awesome name",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <Box
      backgroundImage={`url(${background})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      h="100vh"
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
            fontSize="5xl"
            fontWeight="extrabold"
            color="white"
          >
            Welcome
          </ModalHeader>
          <Text
            m="auto"
            color="yellow"
            mt="-1rem"
            fontSize={"lg"}
            letterSpacing={2}
          >
            Game On, Brainiacs!
          </Text>
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
                mt="8"
                m="auto"
                bg={showLogo ? "none" : "#8d2949"}
                rounded="md"
                shadow="2xl"
                w="400px"
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
                      <button
                        className={styles.enterbutton}
                        onClick={handleEnterPlayer}
                      >
                        Enter
                      </button>
                    </GridItem>
                  </Grid>
                )}
              </Box>
            </ScaleFade>
          </ModalBody>
          <ModalFooter>
            {!showPlay ? (
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
