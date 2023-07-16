import { User } from "@/types/user.type";

export const checkIfUserIsLoggedIn = (user: User) => {
  return user?.role?.includes("USER") || user?.role?.includes("ADMIN");
};

export const checkIfUserIsAdmin = (user: User) => {
  return user?.role?.includes("ADMIN");
};

export const getInitials = (firstName: string, lastName: string) => {
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};
