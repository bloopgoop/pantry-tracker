"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Inventory from "@/components/inventory/inventory";
import Navbar from "@/components/navbar";
import ReactMarkdown from "react-markdown";
import { components } from "@/react-markdown";
import { InventorySkeleton } from "@/components/inventory/inventory-skeleton";
import { Button } from "@mui/material";
import { suggestRecipe, readItems, Item } from "./actions";
import { Suspense } from "react";
import { useCamera, useAuth } from "@/app/providers";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [recipeSuggestion, setRecipeSuggestion] = useState<string>("");
  const { user } = useAuth();
  const { cameraOpen } = useCamera();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchData = async () => {
      const res = await readItems(user.uid);
      setItems(res);
    };
    fetchData();
  }, [user]);

  async function handleSuggestRecipe() {
    if (!user) {
      router.push("/landing");
      return;
    }
    const ingredients: string[] = [];
    items.forEach((item) => {
      ingredients.push(item.amount.toString() + " " + item.name);
    });
    const message = await suggestRecipe(ingredients);
    setRecipeSuggestion(message.content || "No recipe found");
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
          <Inventory rows={items} setRows={setItems} user={user} />
        </Suspense>
      </Box>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          onClick={handleSuggestRecipe}
          sx={{ marginLeft: "auto", marginBottom: 2 }}
        >
          Suggest a recipe for me
        </Button>
        {recipeSuggestion && (
          <Box sx={{ p: 4, backgroundColor: "#f1f1f1", width: "100%" }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 2, color: "crimson" }}
            >
              AI suggestion
            </Typography>
            <ReactMarkdown components={components} className="">
              {recipeSuggestion}
            </ReactMarkdown>
          </Box>
        )}
      </Box>
    </Container>
  );
}
