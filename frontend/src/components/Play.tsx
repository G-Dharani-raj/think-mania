import React from 'react'
import{Box,Button} from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import background from "../assets/2921.jpg"
const Play:React.FC = () => {
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
   filter=" brightness(70%)"
   >
    <Button onClick={home}>Home</Button>
    
   </Box>
  )
}

export default Play