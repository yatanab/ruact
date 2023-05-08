import { Stack } from "@mui/material";
import BasicCard from "./component/Card";
import { content } from "./component/Card";

export default function CardList() {

  const contents: content[] = [
    {
      title: "test1",
      body: "hogehogehugahuge"
    },
    {
      title: "test2",
      body: "hogehogehugahuge"
    },
    {
      title: "test3",
      body: "hogehogehugahuge"
    }
  ]

  

  return (
    <Stack spacing={2}>
      {contents.map(v => BasicCard(v))}
    </Stack>
  )
}