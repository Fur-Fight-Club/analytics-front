export interface User {
  uid: string;
  email: string;
  companyName: string;
  kbis: string;
  phoneNumber: string;
  websiteURL: string;
  isVerified: boolean;
  role: "ADMIN" | "USER";
}

export const initialUser: User = {
  uid: "",
  email: "",
  companyName: "",
  kbis: "",
  phoneNumber: "",
  websiteURL: "",
  isVerified: false,
  role: "USER",
};
