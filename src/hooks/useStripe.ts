import { STRIPE_CONFIG } from "@/config/stripe";
// src/hooks/useStripe.ts
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

export const useStripe = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const stripePromise = loadStripe(STRIPE_CONFIG.PUBLIC_KEY);

	const handlePayment = async (priceId: string) => {
		setLoading(true);
		setError(null);

		try {
			const stripe = await stripePromise;
			if (!stripe) throw new Error("Stripe não inicializado");

			const response = await fetch("/api/create-checkout-session", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ priceId }),
			});

			const session = await response.json();

			if (session.error) {
				throw new Error(session.error);
			}

			const { error } = await stripe.redirectToCheckout({
				sessionId: session.id,
			});

			if (error) throw error;
		} catch (err: any) {
			setError(err.message || "Erro ao processar pagamento");
		} finally {
			setLoading(false);
		}
	};

	return {
		handlePayment,
		loading,
		error,
	};
};
