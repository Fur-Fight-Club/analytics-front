"use client";

import { Card, Text } from "@nextui-org/react";
import { numbers } from "@utils/number.utils";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

type KpiAdminCardProps = {
  label: string;
  amount: any;

  animationCount?: boolean;
};

export const KpiAdminCard = ({
  label,
  amount,
  animationCount,
}: KpiAdminCardProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, amount, { duration: 3.5 });

    return animation.stop;
  }, [amount]);

  return (
    <Card>
      <Card.Body
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          h3
          css={{
            color: "#ff4b4b",
            fontSize: "3rem",
            fontWeight: 900,
          }}
        >
          {!animationCount ? (
            numbers.suffix(amount)
          ) : (
            <motion.div>{rounded}</motion.div>
          )}
        </Text>
        <Text
          css={{
            color: "#464646",
            fontSize: ".75rem",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          {label}
        </Text>
      </Card.Body>
    </Card>
  );
};
