import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

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
    queryKey: ['hey'],
    queryFn: () =>
      fetch('http://localhost:8080/test').then(
        (res) => res.json(),
      ),
  })

  if (isPending) return <div>Loading...</div>

  if (error) return <div>An error has occurred: {error.message}</div>

  return (
    <div>
      <h1>{data.str}</h1>
    </div>
  )
}