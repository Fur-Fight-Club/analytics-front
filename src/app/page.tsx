"use client";

import animation from "@assets/analyticsAnimation.json";
import { Col, Row, Spacer, Text } from "@nextui-org/react";
import Lottie from "lottie-react";
import NavbarFFC from "./components/NavbarFFC";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <NavbarFFC />
      <main className={styles.main}>
        <Row>
          <Col>
            <Spacer y={5} />
            <Text
              h1
              css={{
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
              }}
            >
              Bienvenu sur SuperProjetAnalytics
            </Text>
            <Spacer y={2} />
            <Text h2>
              Inscrit toi et connecte ton super site pour avoir des statistiques{" "}
            </Text>
          </Col>
          <Col>
            <Lottie animationData={animation} />
          </Col>
        </Row>
      </main>
    </>
  );
}
