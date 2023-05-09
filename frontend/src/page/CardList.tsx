import { Stack } from "@mui/material";
import BasicCard from "../atom/Card";
import { Haiku } from "./API";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";

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

  if (isPending) return <div>Loading...</div>

  if (error) return <div>An error has occurred: {error.message}</div>


  return (
    <QueryClientProvider client={queryClient}>
      <Stack spacing={2}>
        {data?.map((v, i) => BasicCard({v: v, i: i}))}
      </Stack>
    </QueryClientProvider>
    
  )
}