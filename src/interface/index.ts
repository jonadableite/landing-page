export interface Plan {
	name: string;
	price: {
		monthly: number;
		annual: number;
	};
	features: string[];
	icon: React.ReactNode;
	bgGradient: string;
	recommended: boolean;
	priceId: {
		monthly: string;
		annual: string;
	};
}

export interface SubscriptionData {
	plan: string;
	maxInstances: number;
	messagesPerDay: number;
}

export interface LoginCredentials {
	email: string;
	password: string;
}
// src/interface/index.ts
export interface LoginResponse {
	user: User;
	token: string;
	planStatus?: {
		plan: string;
		isTrialExpired: boolean;
		hasActiveSubscription: boolean;
		status: "active" | "expired" | "trial";
	};
}

export interface User {
	id: string;
	name: string;
	email: string;
	profile: string;
	plan: string;
	companyId?: string;
}
