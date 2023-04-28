import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

export default function Payment() {
  const [mpReady, setMpReady] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        await initMercadoPago("APP_USR-d6037396-00f1-4813-bb05-94a656473bf7");
        setMpReady(true);
      } catch (err) {
        console.error("Failed to initialize MercadoPago SDK", err);
      }
    }
    init();
  }, []);

  return <div>{mpReady ? <Wallet /> : <p>Loading...</p>}</div>;
}
