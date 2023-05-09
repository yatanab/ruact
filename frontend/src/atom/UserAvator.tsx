import * as React from 'react';
import Avatar from 'boring-avatars'
import Stack from '@mui/material/Stack';

export default function LetterAvatars(userName: any) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar 
        size={40}
        name={userName}
        colors={["#FFBD87", "#FFD791", "#F7E8A6", "#D9E8AE", "#BFE3C0"]}
      />
    </Stack>
  );
}