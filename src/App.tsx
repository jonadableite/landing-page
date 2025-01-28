/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

/**
 * Node Modules
 */
import { ReactLenis } from "lenis/react";

/**
 * Components
 */

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Route, Routes } from "react-router-dom";
import CTASection from "./components/CTASection";
import Dashboard from "./components/Dashboard";
import FAQ from "./components/FAQ";
import Feature from "./components/Feature";
import FlowChartChatbot from "./components/FlowChartChatbot";
import TestGratuitoForm from "./components/Form";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";

import { BrowserRouter } from "react-router-dom";
import About from "./components/About";
import Compliance from "./components/Compliance";
import Footer from "./components/Footer";
import Legal from "./components/Legal";
import Privacy from "./components/Privacidade";
import Security from "./components/Seguranca";
import Terms from "./components/Termos";

const App: React.FC = () => {
	return (
		<ReactLenis root>
			<div className="flex flex-col min-h-screen">
				<Header />
				<BrowserRouter>
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
						</Routes>
					</div>
				</BrowserRouter>
				<Footer />
			</div>
		</ReactLenis>
	);
};

export default App;
