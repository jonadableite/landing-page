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
import Feature from "./components/Feature";
import FlowChartChatbot from "./components/FlowChartChatbot";
import TestGratuitoForm from "./components/Form";
import HowItWorks from "./components/HowItWorks";

import { BrowserRouter } from "react-router-dom";

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
								</main>
							}
						/>
						<Route path="/trial-form" element={<TestGratuitoForm />} />
					</Routes>
				</BrowserRouter>
			</div>
		</ReactLenis>
	);
};

export default App;
