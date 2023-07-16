"use client";

import { useLocalStorage } from "@/hooks/localStorage.hook";
import { User, initialUser } from "@/types/user.type";
import spin from "@assets/spin.json";
import { Button, Spacer } from "@nextui-org/react";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const { width, height } = useWindowSize();
  const [user, setUser] = useLocalStorage<User>("user", initialUser);

  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "auto",
        width: "35rem",
      }}
    >
      <Confetti
        width={width}
        height={height}
        numberOfPieces={50}
        wind={0}
        recycle={true}
        drawShape={(ctx) => {
          // draw image
          const img = new Image();
          img.src = "https://i.imgur.com/r6VZngj.jpg";
          ctx.drawImage(img, 0, 0, 100, 100);
        }}
      />
      <Lottie animationData={spin} />
      <h4>{error.message}</h4>
      <Spacer y={2} />
      <Button onClick={() => router.push("/")}>
        Revenir au menu principal
      </Button>
    </div>
  );
}
