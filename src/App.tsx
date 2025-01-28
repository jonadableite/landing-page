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
import Footer from "./components/Footer";

const App: React.FC = () => {
	return (
		<ReactLenis root>
			<div className="relative isolate overflow-hidden">
				<Header />
				<BrowserRouter>
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
						<Route path="/trial-form" element={<TestGratuitoForm />} />
						<Route path="/sobre" element={<About />} />
					</Routes>
				</BrowserRouter>
				<Footer />
			</div>
		</ReactLenis>
	);
};

export default App;
