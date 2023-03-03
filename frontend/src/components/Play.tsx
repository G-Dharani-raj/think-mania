import React,{useState,useEffect,useRef} from 'react'
import{Box,Button,Grid, GridItem} from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import background from "../assets/2921.jpg"
import "../styles/Buzz.css"
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
  Text
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { Input } from '@chakra-ui/react';

const Play:React.FC = () => {
  const [countdown, setCountdown] = useState(10);
  const [timerRunning, setTimerRunning] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setCountdown(10);
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  useEffect(() => {
    if (timerRunning && countdown > 0) {
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    if (countdown === 0) {
      clearInterval(countdownIntervalRef.current!);
      setTimerRunning(false);
    }
    return () => clearInterval(countdownIntervalRef.current!);
  }, [countdown, timerRunning]);

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
   filter=" brightness(90%)"
   >
    
    <Button onClick={home}>Home</Button>
   
    
    <Modal
        //   initialFocusRef={initialRef}
        //   finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent 
        transform={isOpen ? "scale(2)" : "scale(1.5)"}
        transition="all 0.2s"
        bgColor="rgba(0,0,0,0)" >
         
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
                placeholder="Enter room id to join"
                
                
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
            disabled={timerRunning}
            onClick={()=>{
              onClose()
              startTimer()
            
            }}
            
            >Submit</Button>
          </ModalFooter>

          
        </ModalContent>
      </Modal>
      <Box
      
        m="auto"
        rounded="full"
        borderWidth="3px"
        borderColor="white.900"
        w="100px"
        h="100px"
        mt="-2rem"
        mb="-5rem"
      >
        <Box

          w="100%"
          h="100%"
          rounded="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="red.500"
          textAlign="center"
          lineHeight="150px"
          fontSize="3xl"
          fontWeight="bold"
          color="white"
          
        >
          {countdown}
        </Box>
      </Box>
      {/* <Button
        colorScheme="green"
        size="lg"
       
        mt="4"
      >
        Start
      </Button> */}
      {/* <Button
        colorScheme="red"
        size="lg"
       
        ml="4"
        mt="4"
      >
        Stop
      </Button> */}
    
      
      <Box
      bg="gray.800"
      w="30%"
      h="150px"
      m="auto"
      mt="3rem"
      rounded="md"
      boxShadow="md"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="4xl"
      color="white"
      textAlign="center"
      border="10px dotted yellow"
    >
      {/* Your content goes here */}
    </Box>
        <Box py="5"
                color="white"
                mt={{base:"8",md:"30",lg:"8"}}
                m="auto"
                bg={"#8d2949"}
                rounded="md"
                shadow="2xl"
                w={{base:"300px",md:"350px",lg:"350px"}}
                h="auto">
        <Grid m="auto" w={"60%"} gap="5">
                  <GridItem  >
                    <Input
                     bgColor={"white"}
                      h="40px"
                      px={2}
                       border="4px solid yellow"
                       rounded="2xl"
                      color={'black'}
                       variant="unstyled"
                      placeholder="Enter Answer"
                     
                    />
                
                  </GridItem>
                  
                  <GridItem px="50px" >

                    <Button
                    letterSpacing={1}
                    size="md"
                    fontSize="xl"
                    fontWeight="bold"
                    colorScheme="green"
                    borderRadius="full"
                    px={6}
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
                    disabled={timerRunning} 
                    onClick={startTimer}
                      >
                      Submit
                     </Button>
    
                  </GridItem>
                </Grid>
        </Box>
   




        
       <Box   w="20%" h="auto" px="63px" m="auto" mt={"4rem"}>
     <Button variant="unstyled" onClick={stopTimer}
        disabled={!timerRunning}>
           <button  className="button-82-pushable" role="button">
  <span className="button-82-shadow"></span>
  <span className="button-82-edge"></span>
  <span className="button-82-front text">
    BuzZ
  </span>
</button>
          </Button> 
       </Box>
    

   </Box>
  )
}

export default Play








