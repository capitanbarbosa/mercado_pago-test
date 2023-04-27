import React, { useState } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Payment from "../components/Payment";
import Checkout from "../components/Checkout";
import Footer from "../components/Footer";
import InternalProvider from "../components/ContextProvider";
import { SpinnerCircular } from "spinners-react";

// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
initMercadoPago("APP_USR-d6037396-00f1-4813-bb05-94a656473bf7");

const Home = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    quantity: "1",
    price: "10",
    amount: 10,
    description: "Some book",
  });

  const handleClick = () => {
    setIsLoading(true);
    fetch("/api/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        return response.json();
      })
      .then((preference) => {
        setPreferenceId(preference.id);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderSpinner = () => {
    if (isLoading) {
      return (
        <div className="spinner-wrapper">
          <SpinnerCircular сolor="#009EE3" />
        </div>
      );
    }
  };

  return (
    <InternalProvider
      context={{ preferenceId, isLoading, orderData, setOrderData }}
    >
      <main>
        {renderSpinner()}
        <Checkout onClick={handleClick} description />
        <Payment />
      </main>
      <Footer />
    </InternalProvider>
  );
};

export default Home;
