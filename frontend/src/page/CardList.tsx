import { Container, Fab, Stack } from "@mui/material";
import BasicCard from "../atom/Card";
import { Haiku } from "./API";
import { QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect } from "react";

export default function CardList() {

  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ['haikus'],
    queryFn: ():Promise<Haiku[]> =>
      fetch('http://localhost:8080/haikus').then(
        (res) =>
          res.json()
      )
  })

  // if (error) return <div>An error has occurred: {error.message}</div>

  // ref を作成しスクロールさせたい場所にある Element にセット
  const ref = React.createRef<HTMLDivElement>()
  
  useEffect(() => {
    ref!.current?.scrollIntoView({
      // behavior: 'smooth',
      
      inline: 'end',
    })
  },[ref]) 


  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth='sm'>
        {isPending ? <div>Loading...</div> : 
          <Stack spacing={2} direction='column' ref={ref}>
            {data?.map((v, i) => BasicCard({v: v, i: i}))}
          </Stack>
        }
        <Fab 
          color="primary"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}>
            <AddIcon />
          </Fab>
      </Container>
    </QueryClientProvider>
    
  )
}