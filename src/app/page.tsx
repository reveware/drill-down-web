"use client";
import { Button } from "@/components";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1>Welcome to the Home Page</h1>
      
      <ThemeToggle />
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="link">Link</Button>

    </main>
  );
}
