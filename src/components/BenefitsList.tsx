// src/components/BenefitsList.tsx
/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */
import { motion } from "framer-motion";

export const BenefitsList = () => {
	const benefits = [
		{
			icon: "🚀",
			text: "Automação Inteligente",
		},
		{
			icon: "🛡️",
			text: "Proteção Anti-Ban",
		},
		{
			icon: "📊",
			text: "Relatórios Detalhados",
		},
		{
			icon: "⚡",
			text: "Alta Performance",
		},
		{
			icon: "🔒",
			text: "Segurança Máxima",
		},
		{
			icon: "💬",
			text: "Multi Conversas",
		},
		{
			icon: "🎯",
			text: "Disparos Direcionados",
		},
		{
			icon: "📱",
			text: "Multi Dispositivos",
		},
	];

	return (
		<div className="w-full overflow-hidden bg-deep-purple/10 backdrop-blur-md py-4 rounded-xl">
			<motion.div
				initial={{ x: "0%" }}
				animate={{ x: "-50%" }}
				transition={{
					duration: 20,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				}}
				className="flex gap-4 whitespace-nowrap"
			>
				{[...benefits, ...benefits].map((benefit, index) => (
					<motion.div
						key={index}
						whileHover={{ scale: 1.05, y: -5 }}
						className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-deep-purple/30 border border-primary/20"
					>
						<span className="text-2xl">{benefit.icon}</span>
						<span className="text-gray-200 font-medium">{benefit.text}</span>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};

export default BenefitsList;
