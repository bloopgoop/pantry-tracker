"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Inventory from "@/app/inventory";
import Navbar from "@/components/navbar";
import { InventorySkeleton } from "@/components/inventory-skeleton";
import { Button } from "@mui/material";
import { getAuth } from "firebase/auth";
import { app } from "@/firebase";
import { suggestRecipe } from "./actions";
import { Suspense } from "react";
import { useCamera, useAuth } from "@/app/providers";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { user } = useAuth();
  const { cameraOpen } = useCamera();
  const router = useRouter();

  function handleSuggestRecipe() {
    if (!user) {
      router.push("/login");
      return;
    }
    const ingredients: string[] = [];
    // for 
    // suggestRecipe();
  }

  console.log(user);
  return (
    <Container
      maxWidth="lg"
      sx={
        cameraOpen
          ? { display: "none" }
          : {
              display: "block",
            }
      }
    >
      <Navbar />
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Inventory
        </Typography>
        <Suspense fallback={<InventorySkeleton />}>
          <Inventory />
        </Suspense>
      </Box>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" onClick={handleSuggestRecipe}>
          Suggest a recipe for me
        </Button>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Recipes
        </Typography>
      </Box>
    </Container>
  );
}
