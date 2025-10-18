/**
 * @copyright 2025 jonadab
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import { ReactLenis } from "lenis/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * Components
 */
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "./components/About";
import CTASection from "./components/CTASection";
import CheckoutPage from "./components/CheckoutPage";
import CheckoutFlow from "./components/CheckoutFlow";
import Compliance from "./components/Compliance";
import Dashboard from "./components/Dashboard";
import FAQ from "./components/FAQ";
import Feature from "./components/Feature";
import FlowChartChatbot from "./components/FlowChartChatbot";
import Footer from "./components/Footer";
import TestGratuitoForm from "./components/Form";
import HowItWorks from "./components/HowItWorks";
import Legal from "./components/Legal";
import Pricing from "./components/Pricing";
import Privacy from "./components/Privacidade";
import Register from "./components/Register";
import Reembolso from "./components/Reembolso";
import Security from "./components/Seguranca";
import Terms from "./components/Termos";
import Testimonials from "./components/Testimonials";
import Welcome from "./components/Welcome";
import UpsellPage from "./components/UpsellPage";

// Novos componentes otimizados
import StickyCallToAction from "./components/StickyCallToAction";
import ExitIntentModal from "./components/ExitIntentModal";

// Following Pointer
import { FollowerPointerCard } from "@/components/ui/following-pointer";

// Analytics e UTM
import { initializeAnalytics } from "./lib/analytics";
import { UTMManager } from "./lib/utm";
import { initializeClarity } from "./lib/clarity";
import { useScrollTracking, useExitIntentTracking } from "./hooks/useScrollTracking";

const App: React.FC = () => {
	// Obtém a localização atual para condicionar a exibição do Header e Footer
	const location = useLocation();

	// Define as rotas onde o Header e Footer não devem aparecer
	const hideHeaderFooterRoutes = ["/register", "/welcome", "/checkout"];

	// Verifica se a rota atual está na lista de rotas que ocultam o Header e Footer
	const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
		location.pathname,
	);

	// Hooks de tracking para otimização de conversões
	useScrollTracking({
		sectionName: location.pathname,
		scrollDepths: [25, 50, 75, 100],
		minTimeOnSection: 5000,
	});

	useExitIntentTracking();

	// Inicializar analytics e UTM na montagem do componente
	useEffect(() => {
		// Inicializar analytics (GTM e Facebook Pixel)
		initializeAnalytics({
			gtmId: 'GTM-XXXXXXX', // Substitua pelo seu GTM ID
			facebookPixelId: '000000000000000', // Substitua pelo seu Facebook Pixel ID
		});

		// Inicializar Microsoft Clarity para análise de comportamento e conversões
		initializeClarity('tom5vd9sxc'); // Substitua pelo seu Project ID do Clarity

		// Inicializar captura de parâmetros UTM (a captura é automática no construtor)
		new UTMManager();
	}, []);

	return (
		<ReactLenis root>
			<FollowerPointerCard title="WhatLeads">
				<div className="flex flex-col min-h-screen relative">
					{/* Renderiza o Header apenas se não estiver na rota de registro */}
					{!shouldHideHeaderFooter && <Header />}
					<div className="flex-grow">
						<Routes>
							<Route
								path="/"
								element={
									<main>
										<Hero />
										<Feature />
										<HowItWorks />
										<Dashboard />
										<FlowChartChatbot />
										<CTASection />
										<Testimonials />
										<Pricing />
										<FAQ />
									</main>
								}
							/>
							<Route path="/sobre" element={<About />} />
							<Route path="/legal" element={<Legal />} />
							<Route path="/privacy" element={<Privacy />} />
							<Route path="/terms" element={<Terms />} />
							<Route path="/reembolso" element={<Reembolso />} />
							<Route path="/security" element={<Security />} />
							<Route path="/compliance" element={<Compliance />} />
							<Route path="/trial-form" element={<TestGratuitoForm />} />
							<Route path="/register" element={<Register />} />
							<Route path="/welcome" element={<Welcome />} />
							<Route path="/upsell" element={<UpsellPage originalPlan="Starter" onAccept={() => window.location.href = 'https://pay.hotmart.com/example?upsell=premium'} onDecline={() => window.location.href = '/checkout'} />} />
							<Route path="/checkout" element={<CheckoutPage />} />
							<Route path="/checkout-flow/:plan" element={
								<CheckoutFlow
									planName="Starter"
									planPrice="R$ 97"
									checkoutUrl="https://pay.hotmart.com/example"
								/>
							} />
						</Routes>
					</div>
					{/* Renderiza o Footer apenas se não estiver na rota de registro */}
					{!shouldHideHeaderFooter && <Footer />}

					{/* Componentes globais de conversão */}
					{!shouldHideHeaderFooter && (
						<>
							<StickyCallToAction />
							<ExitIntentModal />
						</>
					)}
				</div>
			</FollowerPointerCard>
		</ReactLenis>
	);
};

export default App;
