/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

import {
	AnimatePresence,
	motion,
	useInView,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import {
	FiDollarSign,
	FiMessageCircle,
	FiMinus,
	FiPlus,
	FiSettings,
	FiShield,
} from "react-icons/fi";

const FAQItem = ({ question, answer, icon: Icon }) => {
	const [isOpen, setIsOpen] = useState(false);
	const itemRef = useRef(null);
	const isInView = useInView(itemRef, { once: true, margin: "-100px" });

	return (
		<motion.div
			ref={itemRef}
			initial={{ opacity: 0 }}
			animate={isInView ? { opacity: 1 } : { opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="mb-6 bg-deep-purple/20 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 border border-gray-700"
		>
			<motion.button
				className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
				onClick={() => setIsOpen(!isOpen)}
				whileHover={{ backgroundColor: "rgba(11, 4, 22, 0.4)" }}
				transition={{ duration: 0.2 }}
			>
				<div className="flex items-center space-x-4">
					<motion.div
						className="bg-gradient-to-r from-primary to-secondary p-3 rounded-full"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<Icon className="text-white text-xl" />
					</motion.div>
					<span className="text-lg font-medium text-white">{question}</span>
				</div>
				<motion.div
					animate={{ rotate: isOpen ? 45 : 0 }}
					transition={{ duration: 0.3 }}
				>
					{isOpen ? (
						<FiMinus className="text-primary text-2xl" />
					) : (
						<FiPlus className="text-primary text-2xl" />
					)}
				</motion.div>
			</motion.button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<div className="p-6 pt-0">
							<p className="text-gray-300 leading-relaxed">{answer}</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

const FAQ = () => {
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { margin: "-40% 0px -40% 0px" });

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const springConfig = { stiffness: 300, damping: 30, restDelta: 0.001 };

	const opacity = useSpring(
		useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
		springConfig,
	);

	const y = useSpring(
		useTransform(scrollYProgress, [0, 1], [50, -50]),
		springConfig,
	);

	const faqs = [
		{
			question: "Como funciona o sistema de automação?",
			answer:
				"Nosso sistema de automação utiliza IA avançada para gerenciar suas conversas no WhatsApp. Você pode criar fluxos personalizados, agendar mensagens e analisar o engajamento dos seus contatos, tudo em uma interface intuitiva e fácil de usar.",
			icon: FiMessageCircle,
		},
		{
			question: "Quais são os planos de preço disponíveis?",
			answer:
				"Oferecemos planos flexíveis para atender às necessidades de diferentes empresas. Nossos preços começam a partir de R$97/mês, com um período de teste gratuito de 7 dias. Todos os planos incluem suporte prioritário, atualizações regulares e recursos essenciais para impulsionar seu negócio.",
			icon: FiDollarSign,
		},
		{
			question: "A plataforma é segura e está em conformidade com a LGPD?",
			answer:
				"Absolutamente! A segurança é nossa prioridade máxima. Nossa plataforma utiliza criptografia de ponta a ponta e está totalmente em conformidade com a Lei Geral de Proteção de Dados (LGPD). Implementamos medidas rigorosas para garantir que seus dados e os de seus clientes estejam sempre protegidos e seguros.",
			icon: FiShield,
		},
		{
			question: "Posso integrar com outras ferramentas que já uso?",
			answer:
				"Sim! Nossa plataforma foi projetada para ser altamente integrável. Oferecemos integrações nativas com diversas ferramentas populares de CRM, e-commerce e marketing. Além disso, disponibilizamos uma API robusta e bem documentada para que você possa criar integrações personalizadas com facilidade.",
			icon: FiSettings,
		},
	];

	return (
		<motion.section
			ref={sectionRef}
			style={{ opacity }}
			className="py-24 px-4 overflow-hidden relative"
		>
			<motion.div style={{ y }} className="max-w-5xl mx-auto relative z-10">
				<motion.div
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
						<span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
							Perguntas Frequentes
						</span>
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						Tire suas dúvidas sobre nossa plataforma de automação para WhatsApp
						e descubra como podemos impulsionar seu negócio.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="space-y-6"
				>
					{faqs.map((faq, index) => (
						<FAQItem key={index} {...faq} />
					))}
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					className="text-center mt-16"
				>
					<p className="text-gray-300 mb-8 text-lg">
						Ainda tem dúvidas? Nossa equipe está pronta para ajudar!
					</p>
					<motion.a
						href="https://wa.me/5512988444921"
						target="_blank"
						rel="noopener noreferrer"
						whileHover={{
							scale: 1.05,
							boxShadow: "0 0 20px rgba(51, 17, 115, 0.3)",
						}}
						whileTap={{ scale: 0.95 }}
						className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-primary/50 transition-all duration-300"
					>
						Fale com um Especialista
					</motion.a>
				</motion.div>
			</motion.div>

			{/* Gradient for smooth transition to next section */}
			<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-deep to-transparent pointer-events-none" />
		</motion.section>
	);
};

export default FAQ;
