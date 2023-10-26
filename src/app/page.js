"use client";
import { Button } from "@mantine/core";
import { useSession, signOut, signIn } from "next-auth/react";
import React from "react";
import NavbarApp from "./components/navbar/page";

const InactivityTimeout = 15 * 60 * 1000; // 15 minutes
export default function Home() {
  const { data: session } = useSession();
  React.useEffect(() => {
    if (session === null) {
      signIn();
    }
  }, [session]);

  React.useEffect(() => {
    let inactivityTimeout;

    function resetInactivityTimer() {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(logout, InactivityTimeout);
    }

    function logout() {
      // Call the logout action provided by next-auth
      signOut();
    }

    if (session) {
      resetInactivityTimer();

      window.addEventListener("mousemove", resetInactivityTimer);
      window.addEventListener("keydown", resetInactivityTimer);
      // Add more events as needed

      return () => {
        clearTimeout(inactivityTimeout);
        window.removeEventListener("mousemove", resetInactivityTimer);
        window.removeEventListener("keydown", resetInactivityTimer);
      };
    }
  }, [session]);
  return (
    <main>
      {session && <NavbarApp />}
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"></div>
    </main>
  );
}
