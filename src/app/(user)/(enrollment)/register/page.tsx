"use client";
import { Grid, Card, Input, Text, Spacer, Button } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useLocalStorage } from "@/hooks/localStorage.hook";
import { User, initialUser } from "@/types/user.type";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [user, setUser] = useLocalStorage<User>("user", initialUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [kbis, setKbis] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  const handleRegister = async () => {
    if (
      email === "" ||
      password === "" ||
      passwordConfirmation === "" ||
      companyName === "" ||
      kbis === "" ||
      phone === "" ||
      website === ""
    ) {
      toast.error("Veuillez remplir tous les champs");
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const userData = {};
          await db
            .setDoc(
              db.doc(db.firestore, "users", userCredential.user.uid),
              userData
            )
            .then(() => {
              console.log("Document successfully written!");
              setUser({
                uid: userCredential.user.uid,
                email,
                isVerified: false,
                companyName,
                kbis,
                phoneNumber: phone,
                websiteURL: website,
                role: "USER",
              });
              toast.success("Votre compte a été créé avec succès");
            });
          console.log(user);
          router.push("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          console.log(errorCode, errorMessage);
          // ..
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
                Inscription
              </Text>
            </Card.Header>
            <Card.Body>
              <Text h3>Mes informations</Text>
              <Input
                label="Votre adresse email"
                placeholder="jdoe@gmail.com"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Spacer y={0.5} />
              <Grid.Container gap={0.5}>
                <Grid xs={12} md={6}>
                  <Input
                    label="Mot de passe"
                    placeholder="************"
                    type="password"
                    fullWidth
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Input
                    label="Confirmer le mot de passe"
                    placeholder=" ************"
                    type="password"
                    fullWidth
                    size="lg"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </Grid>
              </Grid.Container>
              <Spacer y={1.5} />
              <Text h3>Informations de mon entreprise</Text>
              <Input
                label="Nom de l'entreprise"
                placeholder="John Doe Inc."
                size="lg"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <Spacer y={0.5} />
              <Input
                label="KBIS"
                placeholder="XXXXXXXXXXXX"
                size="lg"
                value={kbis}
                onChange={(e) => setKbis(e.target.value)}
              />
              <Spacer y={0.5} />
              <Input
                label="Téléphone de contact"
                placeholder="06 12 34 56 78"
                size="lg"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Spacer y={0.5} />
              <Input
                label="URL de votre site web"
                placeholder="https://www.johndoe.com"
                size="lg"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </Card.Body>
            <Card.Footer>
              <Button
                color="primary"
                auto
                size="lg"
                onPress={() => handleRegister()}
              >
                M'inscrire
              </Button>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid xs={12} md={4}></Grid>
      </Grid.Container>
    </div>
  );
}
