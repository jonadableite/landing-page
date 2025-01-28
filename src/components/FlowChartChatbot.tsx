/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

import confetti from "canvas-confetti";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
	FiCheck,
	FiMessageCircle,
	FiSend,
	FiSettings,
	FiStar,
	FiZap,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface FlowStep {
	id: string;
	text: string;
	icon: JSX.Element;
	color: string;
	gradient: string;
	description: string;
}

const flowSteps: FlowStep[] = [
	{
		id: "start",
		text: "Disparos em Massa",
		icon: <FiMessageCircle className="text-2xl" />,
		color: "from-blue-500 to-blue-600",
		gradient: "bg-gradient-to-r from-blue-500/20 to-blue-600/20",
		description: "Envie campanhas personalizadas para milhares de contatos",
	},
	{
		id: "config",
		text: "Chatbots Inteligentes",
		icon: <FiSettings className="text-2xl" />,
		color: "from-purple-500 to-purple-600",
		gradient: "bg-gradient-to-r from-purple-500/20 to-purple-600/20",
		description: "Crie fluxos de conversação automatizados com IA avançada",
	},
	{
		id: "process",
		text: "Processamento",
		icon: <FiZap className="text-2xl" />,
		color: "from-yellow-500 to-yellow-600",
		gradient: "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20",
		description: "Processe milhares de mensagens simultaneamente",
	},
	{
		id: "complete",
		text: "Análise de Engajamento",
		icon: <FiCheck className="text-2xl" />,
		color: "from-green-500 to-green-600",
		gradient: "bg-gradient-to-r from-green-500/20 to-green-600/20",
		description: "Acompanhe o engajamento e identifique leads quentes",
	},
	{
		id: "feedback",
		text: "Feedback",
		icon: <FiStar className="text-2xl" />,
		color: "from-pink-500 to-pink-600",
		gradient: "bg-gradient-to-r from-pink-500/20 to-pink-600/20",
		description: "Análise completa de resultados e métricas",
	},
];

const chatMessages = [
	{ type: "bot", text: "👋 Olá! Como posso ajudar?" },
	{ type: "user", text: "Quero saber mais sobre a automação" },
	{
		type: "bot",
		text: "Claro! Nossa plataforma oferece automação completa para WhatsApp 🚀",
	},
	{ type: "user", text: "Qual o preço?" },
	{
		type: "bot",
		text: "Temos planos a partir de R$97/mês com trial gratuito! 💎",
	},
];

const FlowChartChatbot = () => {
	const navigate = useNavigate();
	const componentRef = useRef(null);
	const isInView = useInView(componentRef, { once: true, margin: "-100px" });
	const [activeStep, setActiveStep] = useState(0);
	const [messages, setMessages] = useState<typeof chatMessages>([]);
	const [isTyping, setIsTyping] = useState(false);
	const [messageIndex, setMessageIndex] = useState(0);

	useEffect(() => {
		if (isInView) {
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
			});
		}
	}, [isInView]);

	useEffect(() => {
		if (isInView) {
			const addMessage = async () => {
				if (messageIndex < chatMessages.length) {
					setIsTyping(true);
					await new Promise((resolve) => setTimeout(resolve, 1000));
					setIsTyping(false);
					setMessages((prev) => [...prev, chatMessages[messageIndex]]);
					setMessageIndex(messageIndex + 1);
				}
			};
			addMessage();
		}
	}, [messageIndex, isInView]);

	useEffect(() => {
		if (isInView) {
			const interval = setInterval(() => {
				setActiveStep((prev) => (prev + 1) % flowSteps.length);
			}, 3000);
			return () => clearInterval(interval);
		}
	}, [isInView]);

	const triggerConfetti = () => {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
	};

	const handleTrialClick = () => {
		navigate("/trial-form");
	};

	return (
		<div
			id="automacao"
			ref={componentRef}
			className="relative min-h-screen bg-gradient-to-b from-deep to-deep-purple p-4 sm:p-8 z-10"
		>
			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* Lado Esquerdo - Copy e Features */}
				<div className="lg:col-span-7">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
						transition={{ duration: 0.8 }}
						className="space-y-8"
					>
						<div className="text-center mb-12">
							<h1 className="text-4xl sm:text-5xl font-bold mb-6">
								<span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
									Potencialize seu
								</span>
								<br />
								<span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
									Marketing no WhatsApp
								</span>
							</h1>
							<p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
								Automatize, escale e impulsione seus resultados com nossa
								plataforma de automação inteligente para WhatsApp.
							</p>
						</div>

						{/* Cards de Features */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{flowSteps.map((step, index) => (
								<motion.div
									key={step.id}
									initial={{ opacity: 0, y: 20 }}
									animate={
										isInView
											? {
													opacity: 1,
													y: 0,
													scale: activeStep === index ? 1.05 : 1,
												}
											: { opacity: 0, y: 20 }
									}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									className={`
                    p-6 rounded-2xl ${step.gradient}
                    border border-white/10 backdrop-blur-sm
                    hover:border-primary/50 transition-all duration-300
                  `}
									onClick={() => {
										setActiveStep(index);
										triggerConfetti();
									}}
								>
									<div className="flex items-start space-x-4">
										<div
											className={`
                      p-3 rounded-xl bg-gradient-to-r ${step.color}
                      flex items-center justify-center
                    `}
										>
											{step.icon}
										</div>
										<div>
											<h3 className="text-lg font-semibold text-white mb-2">
												{step.text}
											</h3>
											<p className="text-sm text-gray-300">
												{step.description}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>

						{/* CTA Section */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="text-center mt-12"
						>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleTrialClick}
								className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-xl hover:shadow-primary/50 transition-all duration-300"
							>
								Iniciar Trial Gratuito
							</motion.button>
							<p className="text-gray-400 mt-4">
								7 dias grátis • Sem cartão de crédito • Cancele quando quiser
							</p>
						</motion.div>
					</motion.div>
				</div>

				{/* Lado Direito - Chat Interface */}
				<div className="lg:col-span-5">
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
						transition={{ duration: 0.8 }}
						className="sticky top-8 bg-gray-100 rounded-3xl overflow-hidden border border-gray-300"
					>
						{/* Chat Header */}
						<div className="bg-[#075E54] p-4">
							<div className="flex items-center space-x-3">
								<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
									<FiMessageCircle className="text-white text-xl" />
								</div>
								<div>
									<h3 className="text-white font-semibold">
										Assistente Virtual
									</h3>
									<p className="text-white/70 text-sm">Online agora</p>
								</div>
							</div>
						</div>

						{/* Chat Messages */}
						<div className="h-[400px] sm:h-[500px] overflow-y-auto p-4 space-y-4">
							<AnimatePresence>
								{messages.map((message, index) => (
									<motion.div
										key={index}
										initial={{
											opacity: 0,
											x: message.type === "bot" ? -20 : 20,
										}}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0 }}
										className={`flex ${
											message.type === "bot" ? "justify-start" : "justify-end"
										}`}
									>
										<div
											className={`
                      max-w-[80%] px-4 py-2 rounded-lg
                      ${message.type === "bot" ? "bg-[#DCF8C6]" : "bg-white"}
                      text-black shadow-md
                    `}
										>
											{message.text}
										</div>
									</motion.div>
								))}
							</AnimatePresence>

							{isTyping && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="flex gap-2 px-4 py-2"
								>
									<span className="w-2 h-2 bg-[#25D366] rounded-full animate-bounce" />
									<span
										className="w-2 h-2 bg-[#25D366] rounded-full animate-bounce"
										style={{ animationDelay: "0.2s" }}
									/>
									<span
										className="w-2 h-2 bg-[#25D366] rounded-full animate-bounce"
										style={{ animationDelay: "0.4s" }}
									/>
								</motion.div>
							)}
						</div>

						{/* Chat Input */}
						<div className="p-4 border-t border-gray-300">
							<div className="flex items-center space-x-2">
								<input
									type="text"
									placeholder="Digite sua mensagem..."
									className="flex-1 bg-white rounded-full px-4 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
								/>
								<button className="p-3 bg-[#25D366] rounded-full">
									<FiSend className="text-white text-xl" />
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default FlowChartChatbot;
