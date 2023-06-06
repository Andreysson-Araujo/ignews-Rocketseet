import {loadStripe} from "@stripe/stripe-js"

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY?? "";

if(stripePublicKey === undefined){
    throw new Error("Error.");
}

export async function getStripeJs() {
    const stripeJs = await loadStripe(stripePublicKey)

    return stripeJs
}