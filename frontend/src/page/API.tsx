import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'


// TODO 外だし
export type Haiku = {
  kami_no_ku: string,
  naka_no_ku: string,
  shimo_no_ku: string,
  auther: string,
  description: string,
}

type User = {
  id: number,
  userId: string,
  name: string,
}

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: ():Promise<User[]> =>
      fetch('http://localhost:8080/api/users').then(
        (res) =>
          res.json()
      )
  })

  if (isPending) return <div>Loading...</div>

  if (error) return <div>An error has occurred: {error.message}</div>

  return (
    <div>
      <h1>{JSON.stringify(data)}</h1>
    </div>
  )
}