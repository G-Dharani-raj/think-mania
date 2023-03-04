import React,{useEffect,useState} from 'react'
import {Box,Flex,Text,Image}  from "@chakra-ui/react"
import intro from "../assets/intro.png"
import display from "../assets/display.png"
import gameboard from "../assets/gameboard.png"
import lose from "../assets/lose.png"
import win from "../assets/win.png"
const Tutorial = () => {
    const slides = [
      {
        img: `${intro}`,
      },
      {
        img: `${display}`,
      },
      {
        img: `${gameboard}`,
      },
      {
        img: `${win}`,
      },
      {
        img: `${lose}`,
      },
    ];
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesCount = slides.length;
    const carouselStyle = {
      transition: "all .5s",
      ml: `-${currentSlide * 100}%`,
    };
    const SLIDES_INTERVAL_TIME = 3000;
    const ANIMATION_DIRECTION = "right";
    useEffect(() => {
      const prevSlide = () => {
        setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
      };
  
      const nextSlide = () => {
        setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
      };
  
      const automatedSlide = setInterval(() => {
        ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
      }, SLIDES_INTERVAL_TIME);
      return () => clearInterval(automatedSlide);
    }, [slidesCount]);
    return (
      <Flex
        mt="-4rem"
        w="full"
        bg="#edf3f8"
        p="4"
        alignItems="center"
        justifyContent="center"
      >
        <Flex w="full" overflow="hidden">
          <Flex  pos="relative" h="350px" w="full" {...carouselStyle}>
            {slides.map((slide, sid) => (
              <Box key={`slide-${sid}`} flex="none" boxSize="full" shadow="md">
                <Text
                  mt={3}
                  
                  color="white"
                  fontSize="xs"
                  p="8px 12px"
                  pos="absolute"
                  top="0"
                  whiteSpace="nowrap"
                >
                  {sid + 1} / {slidesCount}
                </Text>
                <Image
                  src={slide.img}
                  alt="carousel image"
                  boxSize="full"
                  backgroundSize="cover"
                />
              </Box>
            ))}
          </Flex>
        </Flex>
      </Flex>
    );
  };

export default Tutorial