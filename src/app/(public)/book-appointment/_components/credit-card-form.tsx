import React from "react";
import {
  PaymentElement,
  AddressElement,
 } from "@stripe/react-stripe-js";
import { Button, message, Modal } from "antd";

interface CreditCardFromProps {
  showCreditCardForm: boolean;
  setShowCreditCardForm: (value: boolean) => void;
  onPaymentSuccess: (paymentId : string) => void;
}

function CreditCardFrom({
  showCreditCardForm,
  setShowCreditCardForm,
  onPaymentSuccess,
}: CreditCardFromProps) {
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();

      if (true) {
        return;
      }

      
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
}

export default CreditCardFrom;
