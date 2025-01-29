import { API_URL } from "@/config/api";
// src/services/stripe.service.ts
import { authService } from "./auth.service";

export async function createCheckoutSession(priceId: string) {
	const response = await fetch(`${API_URL}/api/create-checkout-session`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...authService.getAuthHeaders(),
		},
		body: JSON.stringify({ priceId }),
	});

	if (!response.ok) {
		throw new Error("Erro ao criar sessão de checkout");
	}

	return response.json();
}

export async function verifyPaymentStatus(sessionId: string) {
	const response = await fetch(`${API_URL}/api/verify-payment/${sessionId}`, {
		headers: authService.getAuthHeaders(),
	});

	if (!response.ok) {
		throw new Error("Erro ao verificar status do pagamento");
	}

	return response.json();
}
