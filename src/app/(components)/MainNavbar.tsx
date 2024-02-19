"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

const MainNavbar = () => {
  const session = useSession();

  return (
    <>
      <Navbar isBlurred isBordered maxWidth="full" position="static">
        <NavbarBrand>
          <p className="font-bold text-inherit">Discord Game Connector</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/server">
              Server
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/connections">
              Connections
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {session.status !== "authenticated" ? (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link href="/auth/sign-in" className="text-default-500">
                  Login
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  color="success"
                  href="/auth/sign-up"
                  variant="flat"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem>
              <Button
                as={Link}
                color="danger"
                variant="flat"
                onClick={() => {
                  signOut();
                }}
              >
                Log out
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default MainNavbar;
