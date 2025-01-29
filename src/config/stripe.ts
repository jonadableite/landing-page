export const STRIPE_CONFIG = {
	PRICES: {
		BASIC: {
			MONTHLY: import.meta.env.VITE_STRIPE_PRICE_BASIC_MONTHLY || "",
			ANNUAL: import.meta.env.VITE_STRIPE_PRICE_BASIC_ANNUAL || "",
		},
		PRO: {
			MONTHLY: import.meta.env.VITE_STRIPE_PRICE_PRO_MONTHLY || "",
			ANNUAL: import.meta.env.VITE_STRIPE_PRICE_PRO_ANNUAL || "",
		},
		ENTERPRISE: {
			MONTHLY: import.meta.env.VITE_STRIPE_PRICE_ENTERPRISE_MONTHLY || "",
			ANNUAL: import.meta.env.VITE_STRIPE_PRICE_ENTERPRISE_ANNUAL || "",
		},
	},
	PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
};

// Validação das variáveis
if (!STRIPE_CONFIG.PRICES.BASIC.MONTHLY) {
	console.error("VITE_STRIPE_PRICE_BASIC_MONTHLY não está definido.");
}
if (!STRIPE_CONFIG.PRICES.BASIC.ANNUAL) {
	console.error("VITE_STRIPE_PRICE_BASIC_ANNUAL não está definido.");
}
if (!STRIPE_CONFIG.PRICES.PRO.MONTHLY) {
	console.error("VITE_STRIPE_PRICE_PRO_MONTHLY não está definido.");
}
if (!STRIPE_CONFIG.PRICES.PRO.ANNUAL) {
	console.error("VITE_STRIPE_PRICE_PRO_ANNUAL não está definido.");
}
if (!STRIPE_CONFIG.PRICES.ENTERPRISE.MONTHLY) {
	console.error("VITE_STRIPE_PRICE_ENTERPRISE_MONTHLY não está definido.");
}
if (!STRIPE_CONFIG.PRICES.ENTERPRISE.ANNUAL) {
	console.error("VITE_STRIPE_PRICE_ENTERPRISE_ANNUAL não está definido.");
}
if (!STRIPE_CONFIG.PUBLIC_KEY) {
	console.error("VITE_STRIPE_PUBLISHABLE_KEY não está definido.");
}
