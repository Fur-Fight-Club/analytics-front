import { User } from "@/types/user.type";

export const checkIfUserIsLoggedIn = (user: User) => {
  return user.role.includes("USER") || user.role.includes("ADMIN");
};

export const checkIfUserIsAdmin = (user: User) => {
  return user.role.includes("ADMIN");
};
