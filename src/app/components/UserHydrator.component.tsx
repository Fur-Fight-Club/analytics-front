"use client";

import { db } from "@/firebase";
import { useLocalStorage } from "@/hooks/localStorage.hook";
import { User, initialUser } from "@/types/user.type";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useEffect } from "react";

interface UserHydratorProps {}

export const UserHydrator: React.FunctionComponent<
  UserHydratorProps
> = ({}) => {
  const pathname = usePathname();
  const [user, setUser] = useLocalStorage<User>("user", initialUser);
  useEffect(() => {
    (async () => {
      const userData = await db.user.get(user.uid);
      setUser({
        uid: user.uid,
        email: user.email,
        ...userData,
      });
    })();
    console.log("refetching user data from Firestore...");
  }, [pathname]);
  return null;
};
