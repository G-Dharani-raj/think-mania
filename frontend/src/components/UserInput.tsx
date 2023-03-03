import { Button, Grid, GridItem, HStack, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import styles from "../styles/UserInput.module.css";
export const UserInput = () => {
  const [player1, setPlayer1] = useState<String>("");
  const [room, setRoom] = useState<Number>(1);

  console.log(player1);
  

  const handleEnterPlayer1 = () => {
    console.log("working");
  };
  return (
    <>
      <Grid  m="auto" w={"50%"}>
      <GridItem>
        <Input
          size={"40"}
          variant="flushed"
          placeholder="Enter unique username"
          onChange={(e: any) => setPlayer1(e.target.value)}
        />
        <button className={styles.enterbutton} onClick={handleEnterPlayer1}>
          Enter
        </button>
        </GridItem>
        <GridItem>
        <Input
          size={"40"}
          variant="flushed"
          placeholder="Enter Room Number to Create a Room"
          onChange={(e: any) => setRoom(Number(e.target.value))}
        />
        <button className={styles.enterbutton} onClick={handleEnterPlayer1}>
          Enter
        </button>
        </GridItem>
        <GridItem>
        <Input
          size={"40"}
          variant="flushed"
          placeholder="Enter Room Number to Join"
          onChange={(e: any) => setPlayer1(e.target.value)}
        />
        <button className={styles.enterbutton} onClick={handleEnterPlayer1}>
          Enter
        </button>
        </GridItem>
      </Grid>
    </>
  );
};

//background-image: url("paper.gif");
