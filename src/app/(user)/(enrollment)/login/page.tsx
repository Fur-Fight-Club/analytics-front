"use client";
import { auth, db } from "@/firebase";
import { useLocalStorage } from "@/hooks/localStorage.hook";
import { User, initialUser } from "@/types/user.type";
import { Button, Card, Grid, Input, Spacer, Text } from "@nextui-org/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [user, setUser] = useLocalStorage<User>("user", initialUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      toast.error("Veuillez remplir tous les champs");
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          toast.success("Vous êtes connecté");
          console.log(userCredential);
          const userDoc = await db.doc(
            db.firestore,
            "users",
            userCredential.user.uid
          );
          const userDocData = await db.getDoc(userDoc);
          const userData = userDocData.data();
          console.log(userData);
          setUser({
            uid: userCredential.user.uid,
            email,
            isVerified: userData!.isVerified,
            companyName: userData!.companyName,
            kbis: userData!.kbis,
            phoneNumber: userData!.phoneNumber,
            websiteURL: userData!.websiteURL,
            role: userData!.role,
            clientId: userData!.clientId,
            clientSecret: userData!.clientSecret,
          });

          if (userData!.role === "ADMIN") {
            router.push("/admin");
          } else {
            router.push("/dashboard");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          console.log(errorCode, errorMessage);
        });
    }
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Grid.Container>
        <Grid xs={12} md={4}></Grid>
        <Grid xs={12} md={4}>
          <Card
            style={{
              padding: "2rem",
              flexDirection: "column",
            }}
          >
            <Card.Header>
              <Text
                h1
                css={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Connexion
              </Text>
            </Card.Header>
            <Card.Body>
              <Input
                label="Votre adresse email"
                placeholder="jdoe@gmail.com"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Spacer y={0.5} />
              <Input
                label="Mot de passe"
                placeholder="************"
                type="password"
                fullWidth
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Card.Body>
            <Card.Footer>
              <Button
                color="primary"
                auto
                size="lg"
                onPress={() => handleLogin()}
              >
                Me connecter
              </Button>
              <Button light onPress={() => router.push("register")}>
                Pas de compte ?
              </Button>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid xs={12} md={4}></Grid>
      </Grid.Container>
    </div>
  );
}
