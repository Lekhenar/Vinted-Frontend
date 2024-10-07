import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

function CheckoutForm({ title, price }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      setIsPaying(true);
      if (elements == null) {
        setIsLoading(false);
        return;
      }

      const { error: submitError } = await elements.submit();

      if (submitError) {
        setErrorMessage(submitError.message);
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",

        {
          title: title,
          amount: price,
        }
      );

      const clientSecret = response.data.client_secret;
      // console.log(clientSecret);

      const stripeResponse = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "http://localhost:5173/",
        },
        redirect: "if_required",
      });

      if (stripeResponse.error) {
        setErrorMessage(stripeResponse.error.message);
        setIsLoading(false);
        return;
      }
      console.log(stripeResponse);

      if (stripeResponse.paymentIntent.status === "succeeded") {
        setSuccess(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setIsPaying(false);
  };

  return success ? (
    <p className="success">Merci pour votre achat ! 🚀</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || !elements || isPaying}>Payer</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
}

export default CheckoutForm;
