import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight, Star } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { priceId, plan, price, billingCycle, user, companyId } =
		location.state || {};
	const [showConfetti, setShowConfetti] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setShowConfetti(true);
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
			});
		}, 500);
	}, []);

	const handleProceedToCheckout = () => {
		if (priceId) {
			// Estratégia de funil: primeiro leva para upsell, depois checkout
			navigate("/upsell", {
				state: { priceId, plan, price, billingCycle, companyId },
			});
		} else {
			// Se não houver priceId, redirecione para o dashboard ou página inicial
			navigate("/");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-deep-purple via-electric to-neon-green flex items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="bg-deep-purple/80 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-electric/30"
			>
				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2 }}
					className="text-center mb-8"
				>
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
						Bem-vindo ao Futuro, {user?.name}!
					</h1>
					<p className="text-xl text-gray-300">
						Sua jornada para o sucesso começa agora.
					</p>
				</motion.div>

				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.4 }}
					className="bg-deep/50 rounded-2xl p-6 mb-8"
				>
					<h2 className="text-2xl font-semibold text-white mb-4">
						Seu Plano: {plan || "Gratuito"}
					</h2>
					{priceId ? (
						<ul className="space-y-3">
							<li className="flex items-center text-gray-300">
								<CheckCircle className="text-neon-green mr-2" size={20} />
								Preço: R$ {price?.toFixed(2) || "0.00"} /{" "}
								{billingCycle === "monthly" ? "mês" : "ano"}
							</li>
							<li className="flex items-center text-gray-300">
								<CheckCircle className="text-neon-green mr-2" size={20} />
								Faturamento: {billingCycle === "monthly" ? "Mensal" : "Anual"}
							</li>
						</ul>
					) : (
						<p className="text-gray-300">Você está no plano gratuito.</p>
					)}
					<li className="flex items-center text-gray-300 mt-3">
						<Star className="text-yellow-400 mr-2" size={20} />
						Acesso imediato a todos os recursos do seu plano
					</li>
				</motion.div>

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="w-full py-4 bg-gradient-to-r from-primary to-electric text-deep-purple font-bold text-lg rounded-xl shadow-lg flex items-center justify-center group transition-all duration-300"
					onClick={handleProceedToCheckout}
				>
					{priceId ? "Finalizar Assinatura" : "Ir para o Dashboard"}
					<ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
				</motion.button>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
					className="mt-6 text-center text-gray-400"
				>
					Estamos ansiosos para ver o seu sucesso!
				</motion.p>

				{showConfetti && (
					<div className="absolute top-0 left-0 w-full h-full pointer-events-none">
						<div className="w-full h-full" id="confetti-canvas"></div>
					</div>
				)}
			</motion.div>
		</div>
	);
};

export default Welcome;
