import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaymentForm from './PaymentForm';
import { createStripePaymentSecret } from '../../store/action';
import Skeleton from '../shared/Skeleton';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const dispatch = useDispatch();
  useEffect(() => {
    if(!clientSecret){
      dispatch(createStripePaymentSecret(totalPrice));
    }
  }, [clientSecret]);

  if(isLoading){
    return (
      <div>
        <Skeleton/>
      </div>
    )
  }
  
  return (
    <>
      {clientSecret && (
        <Elements stripe = {stripePromise} options={{ clientSecret } }>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice}/>
        </Elements>
      )}
    </>
  )
}

export default StripePayment
