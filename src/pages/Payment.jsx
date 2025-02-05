import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../components/CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PUBLISHED_KEY);
//(stripePromise);

const Payment = () => {
  return (
    <div>
      <div className="font-extrabold text-2xl text-center mt-10">
        <Elements stripe={stripePromise}>
          <CheckOutForm></CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
