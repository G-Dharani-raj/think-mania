import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Box,Image } from '@chakra-ui/react'
import background from "../assets/2000.jpg"
import intro from "../assets/Think_(1)-transformed.png"
import Lottie from "lottie-react"
import bomb from "../assets/105336-bomb-animation.json"

const Loader: React.FC = () => {
  const navigate = useNavigate()

useEffect(()=>{
  const timer = setTimeout(()=>{
    navigate("/game")
  },8000);
  return ()=> clearTimeout(timer)
},[navigate]);
  return (
   <Box
   backgroundImage={`url(${background})`}
      backgroundSize={{base:"cover"}}
      backgroundRepeat="no-repeat"
      h="100vh"
     
   >
    <Box border="0.5px solid #4c012c" w="60%" h="100%" m="auto">
      <Box border="0px solid yellow" w="85%" h="85%" m="auto" mt="3rem" pt="1rem">
        {/* <Text  color="whitesmoke" fontSize="3xl" fontWeight="extrabold" m="auto" mt="12rem">Welcome To Think Mania</Text> */}
        <Image w="550px" m="auto" mt="3rem" src = {intro} alt="loading"/>
     <Lottie style={{width:"280px",margin:"auto",marginTop:"-5rem" }} animationData={bomb}/>
      </Box>
   
    </Box>
   
   </Box>
  )
}

export default Loader
