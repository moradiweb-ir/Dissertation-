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

  return (
    <Modal
      open={showCreditCardForm}
      title="مشخصات کارت خود را وارد کنید"
      onCancel={() => setShowCreditCardForm(false)}
      centered
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <AddressElement
          options={{
            allowedCountries: ["US"],
            mode: "billing",
          }}
        />

        <div className="flex gap-5 justify-end mt-5">
          <Button
            onClick={() => setShowCreditCardForm(false)}
            disabled={loading}
          >
            انصراف
          </Button>
          <Button htmlType="submit" type="primary" loading={loading}>
            پرداخت 
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CreditCardFrom;
