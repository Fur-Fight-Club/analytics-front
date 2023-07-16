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

// Function that generate x random rgba colors at 1 and .2 opacity
export const generateRandomColors = (x: number) => {
  const colors = [];
  for (let i = 0; i < x; i++) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    // @ts-ignore
    colors.push([`rgba(${r},${g},${b},1)`, `rgba(${r},${g},${b},.2)`]);
  }
  return colors;
};
