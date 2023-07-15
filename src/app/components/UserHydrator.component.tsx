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
      const userDoc = await db.doc(db.firestore, "users", user.uid);
      const userDocData = await db.getDoc(userDoc);
      const userData = userDocData.data();
      setUser({
        uid: user.uid,
        email: user.email,
        isVerified: userData!.isVerified,
        companyName: userData!.companyName,
        kbis: userData!.kbis,
        phoneNumber: userData!.phoneNumber,
        websiteURL: userData!.websiteURL,
        role: userData!.role,
      });
    })();
    console.log("refetching user data from Firestore...");
  }, [pathname]);
  return null;
};
