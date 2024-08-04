"use server";

import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import OpenAI from "openai";

export interface Item {
  id?: string;
  name: string;
  amount: number;
}

export async function createItem(item: Item, uid: string): Promise<string> {
  const docRef = await addDoc(collection(db, uid), {
    name: item.name,
    amount: item.amount,
  });
  console.log("Document written with ID: ", docRef.id);
  return docRef.id;
}

export async function readItems(uid: string) {
  const querySnapshot = await getDocs(collection(db, uid));
  const items: Item[] = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    console.log(doc.id);
    items.push({
      id: doc.id,
      name: doc.data().name,
      amount: doc.data().amount,
    });
  });
  return items;
}

export async function updateItem(id: string, item: Item, uid: string) {
  const docRef = doc(db, uid, id as string);
  console.log(docRef);
  await updateDoc(docRef, {
    name: item.name,
    amount: item.amount,
  });
  console.log("Document successfully updated!");
  return docRef.id;
}

export async function deleteItem(id: string, uid: string) {
  const docRef = doc(db, uid, id as string);
  deleteDoc(docRef).then(() => console.log("Document successfully deleted!"));
}

export async function classifyImage(b64image: string) {}

export async function suggestRecipe(ingredients: string[]) {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    messages: [
      { role: "user", content: "What are some recipes I can make with these ingredients?" },
      { role: "user", content: ingredients.join(", ") },
    ],
  });

  console.log(completion.choices[0].message);
  return completion.choices[0].message;
}
