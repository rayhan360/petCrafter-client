/* eslint-disable react/prop-types */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(
  "pk_test_51OG3K5IZatlt8ZSlVNfH3It6mRqrCsV8ivFCq6mfeEmXu29iZ8zoJKQqSJ0j2oZ2TNgjDO6kOAru1WJeZ7g1WDXu00YiCcabtk"
);
const Payment = ({petImage, petName, email, _id}) => {
  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm petImage={petImage} petName={petName} email={email} _id={_id}></CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
