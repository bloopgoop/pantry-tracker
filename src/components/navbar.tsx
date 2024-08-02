"use client";

import { useAuth } from "@/app/providers";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

export default function Navbar() {
  const { user, signInWithGoogle, signOutUser } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        alignContent: "right",
        alignItems: "center",
        gap: 2,
        justifyContent: "space-between",
      }}
    >
      {user ? (
        <>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Avatar src={user.photoURL} />
            <Typography component="p">{user.displayName}</Typography>
          </Box>
          <Button variant="outlined" onClick={signOutUser} sx={{height: "40px"}}>
            Log out
          </Button>
        </>
      ) : (
        <>
          <Box></Box>
          <Button variant="outlined" onClick={signInWithGoogle} sx={{height: "40px"}}>
            Sign in
          </Button>
        </>
      )}
    </Box>
  );
}
