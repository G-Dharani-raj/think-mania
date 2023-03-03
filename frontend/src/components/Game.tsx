import React from 'react'
import { Box } from '@chakra-ui/react'
import background from "../assets/3685.jpg"
const Game: React.FC = () => {
  return (
    <Box 
    backgroundImage={`url(${background})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      h="100vh"
      filter="grayscale(25%) brightness(70%)"
    >

    </Box>
  )
}

export default Game