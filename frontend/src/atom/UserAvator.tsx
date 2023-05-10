import Avatar from 'boring-avatars'

export default function LetterAvatars(userName: any) {
  return (
      <Avatar 
        size={40}
        name={userName}
        colors={["#FFD791", "#BFE3C0","#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
      />
  );
}