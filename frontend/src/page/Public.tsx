import { Typography } from "@mui/material"

import Landing from "./component/Landing"

export default function PublicPage() {
  return (
    <div>
      <Typography variant="h6" component="div">{"Public Root Page"}</Typography>
      <Landing />
    </div>
  )
}