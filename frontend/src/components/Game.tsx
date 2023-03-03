import React from "react";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import background from "../assets/3685.jpg";
const Game: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
              <Box
                p="20px"
                color="white"
                mt="8"
                m="auto"
                bg="white"
                rounded="md"
                shadow="md"
                w="400px"
                h="auto"
              >
                <Text m="auto" color="black">
                  Let'start{" "}
                </Text>
              </Box>
            </ScaleFade>
          </ModalBody>
          <ModalFooter>
            <Button
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
              onClick={onToggle}
            >
              Let's Go
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Game;
