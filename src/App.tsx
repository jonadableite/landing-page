/**
 * @copyright 2025 jonadab
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import { ReactLenis } from "lenis/react";
import { Route, Routes, useLocation } from "react-router-dom";

/**
 * Components
 */
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "./components/About";
import CTASection from "./components/CTASection";
import CheckoutPage from "./components/CheckoutPage";
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
import Security from "./components/Seguranca";
import Terms from "./components/Termos";
import Testimonials from "./components/Testimonials";
import Welcome from "./components/Welcome";

const App: React.FC = () => {
	// Obtém a localização atual para condicionar a exibição do Header e Footer
	const location = useLocation();

	// Define as rotas onde o Header e Footer não devem aparecer
	const hideHeaderFooterRoutes = ["/register", "/welcome", "/checkout"];

	// Verifica se a rota atual está na lista de rotas que ocultam o Header e Footer
	const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
		location.pathname,
	);

	return (
		<ReactLenis root>
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
									<Pricing />
									<Testimonials />
									<FAQ />
								</main>
							}
						/>
						<Route path="/sobre" element={<About />} />
						<Route path="/legal" element={<Legal />} />
						<Route path="/privacy" element={<Privacy />} />
						<Route path="/terms" element={<Terms />} />
						<Route path="/security" element={<Security />} />
						<Route path="/compliance" element={<Compliance />} />
						<Route path="/trial-form" element={<TestGratuitoForm />} />
						<Route path="/register" element={<Register />} />
						<Route path="/welcome" element={<Welcome />} />
						<Route path="/checkout" element={<CheckoutPage />} />
					</Routes>
				</div>
				{/* Renderiza o Footer apenas se não estiver na rota de registro */}
				{!shouldHideHeaderFooter && <Footer />}
			</div>
		</ReactLenis>
	);
};

export default App;
