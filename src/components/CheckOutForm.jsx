import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import { AUthfirebase } from "../Auth/AuthApi";
import axios from "axios";

const CheckOutForm = () => {
  const { user } = useContext(AUthfirebase);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosInterface = useAxios();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const money = parseFloat(event.target.Money.value);

    if (!money || money <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    if (!stripe || !elements) {
      setError("Stripe or Elements is not loaded.");
      return;
    }

    try {
      // Generate client secret
      const response = await axiosInterface.post("/create-payment-intent", {
        money: money,
      });
      const clientSecret = response.data.clientSecret;
      if (!clientSecret) {
        throw new Error("Failed to get client secret from the server.");
      }
      setClientSecret(clientSecret);

      // Proceed with payment after clientSecret is set
      const card = elements.getElement(CardElement);

      if (!card) {
        setError("Card details not entered.");
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        //("Payment method error:", error);
        setError(error.message);
        return;
      }

      //("Payment method created:", paymentMethod);
      setError("");

      // Confirm payment
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });

      if (confirmError) {
        //("Confirm payment error:", confirmError);
        setError(confirmError.message);
        return;
      }

      //("Payment intent:", paymentIntent);

      if (paymentIntent.status === "succeeded") {
        //("Transaction succeeded. ID:", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // Save payment to the database
        const payment = {
          email: user.email,
          price: money,
          transactionId: paymentIntent.id,
          date: new Date(),
        };

        const saveResponse = await axios.post(
          "http://localhost:3000/payments",
          payment
        );
        //("Payment saved:", saveResponse.data);

        // Display success message
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thank you for your donation!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (err) {
      console.error("Error in payment process:", err);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className=" w-11/12 mx-auto my-auto font-extrabold lg:p-32">
      <form
        className=" font-extrabold w-5/12 mx-auto p-7"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="donation"
          className="text-lg font-extrabold text-gray-700"
        >
          Donate Amount
        </label>
        <input
          type="number"
          id="donation"
          placeholder="Enter donation amount"
          name="Money"
          className="p-3 ml-5 font-extrabold border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-700"
        />
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button
          disabled={!stripe}
          className="btn btn-sm btn-primary my-4"
          type="submit"
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-600">
            {" "}
            Your transaction id: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;
