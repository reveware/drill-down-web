"use client";
import { Button } from "@/components";

export default function Home() {
  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1>Welcome to the Home Page</h1>
      <Button>Click Me</Button>
    </main>
  );
}
