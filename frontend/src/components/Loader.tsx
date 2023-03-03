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
    navigate("/menu")
  },8000);
  return ()=> clearTimeout(timer)
},[navigate]);
  return (
   <Box
   backgroundImage={`url(${background})`}
      backgroundSize={{base:"cover",md:"cover",lg:"cover"}}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      h={{base:"100vh",md:"100vh",lg:"100vh"}}
     
   >
    <Box border="0.5px solid rgb(0,0,0,0)" w={{base:"100%",md:"80%",lg:"60%"}} h="100%" m="auto">
      <Box  w={{base:"100%",md:"85%",lg:"85%"}} h="85%" m="auto" mt="3rem" pt="1rem">
        {/* <Text  color="whitesmoke" fontSize="3xl" fontWeight="extrabold" m="auto" mt="12rem">Welcome To Think Mania</Text> */}
        <Image w={{base:"480px",md:"600px",lg:"500px"}} m="auto" mt={{base:"9rem",md:"10rem",lg:"3rem"}} src = {intro} alt="loading"/>
        <Box  m="auto"  w={{base:"250px",md:"400px",lg:"255px"}}><Lottie style={{margin:"auto",marginTop:"-5rem" }} animationData={bomb}/></Box> 
      </Box>
   
    </Box>
   
   </Box>
  )
}

export default Loader
