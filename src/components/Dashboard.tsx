/**
 * @copyright 2025 jonadab-whatlead
 * @license Apache-2.0
 */
import {
	motion,
	useInView,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import { Activity, ChevronRight, Send, TrendingUp, Users } from "lucide-react";
import { useRef, useState } from "react";
import { scroller } from "react-scroll";
import { BarChart, LineChart, PieChart } from "./charts";

export default function Dashboard() {
	const ref = useRef(null);
	const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });
	const [hoveredStat, setHoveredStat] = useState(null);
	const [activeChart, setActiveChart] = useState(0);

	const { scrollYProgress } = useScroll({
		target: ref,
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

	const stats = [
		{
			icon: <Send className="w-6 h-6" />,
			label: "Disparos",
			value: "1,234",
			description: "Mensagens enviadas com sucesso",
		},
		{
			icon: <Users className="w-6 h-6" />,
			label: "Contatos",
			value: "5,678",
			description: "Leads ativos na sua lista",
		},
		{
			icon: <Activity className="w-6 h-6" />,
			label: "Taxa de Abertura",
			value: "68%",
			description: "Mensagens lidas pelos destinatários",
		},
		{
			icon: <TrendingUp className="w-6 h-6" />,
			label: "Respostas",
			value: "42%",
			description: "Taxa de interação com suas mensagens",
		},
	];

	const features = [
		"Automação inteligente de mensagens",
		"Segmentação avançada de contatos",
		"Relatórios detalhados em tempo real",
		"Integração com múltiplas plataformas",
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.section
			ref={ref}
			id="analise"
			style={{ opacity }}
			className="min-h-screen px-4 py-8 sm:p-8 overflow-hidden relative"
		>
			<motion.div
				style={{ y }}
				className="max-w-7xl mx-auto relative z-10"
			>
				{/* Mobile-First Layout */}
				<div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
					{/* Header Section - Mobile First */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate={isInView ? "visible" : "hidden"}
						className="lg:order-2 space-y-6 sm:space-y-8 lg:space-y-12"
					>
						{/* Header */}
						<motion.div variants={itemVariants} className="space-y-4 sm:space-y-6 text-center lg:text-left">
							<motion.h1
								className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
								animate={{ opacity: [0.5, 1, 0.5] }}
								transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
							>
								<span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
									Transforme seus
								</span>
								<br />
								<span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
									Resultados
								</span>
							</motion.h1>
							<p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
								Visualize e otimize suas campanhas em tempo real com nossa
								plataforma intuitiva de análise de dados.
							</p>
						</motion.div>

						{/* Stats Grid - Mobile Optimized */}
						<motion.div
							variants={containerVariants}
							className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
						>
							{stats.map((stat, index) => (
								<motion.div
									key={index}
									variants={itemVariants}
									whileHover={{ scale: 1.02, y: -2 }}
									whileTap={{ scale: 0.98 }}
									onHoverStart={() => setHoveredStat(index)}
									onHoverEnd={() => setHoveredStat(null)}
									className="relative p-4 sm:p-6 rounded-xl bg-deep-purple/30 border border-gray-700 shadow-lg group"
								>
									<motion.div
										className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-xl"
										initial={{ opacity: 0 }}
										animate={{ opacity: hoveredStat === index ? 1 : 0 }}
										transition={{ duration: 0.3 }}
									/>

									<div className="relative z-10 flex items-start gap-3 sm:gap-4">
										<div className="text-primary flex-shrink-0">{stat.icon}</div>
										<div className="min-w-0 flex-1">
											<h4 className="text-xl sm:text-2xl font-bold text-white mb-1">
												{stat.value}
											</h4>
											<p className="text-xs sm:text-sm text-gray-400 truncate">
												{stat.label}
											</p>
											<motion.p
												initial={{ opacity: 0, height: 0 }}
												animate={{
													opacity: hoveredStat === index ? 1 : 0,
													height: hoveredStat === index ? "auto" : 0,
												}}
												className="text-xs text-primary mt-2 leading-tight"
											>
												{stat.description}
											</motion.p>
										</div>
									</div>
								</motion.div>
							))}
						</motion.div>

						{/* Features List - Mobile Optimized */}
						<motion.div variants={containerVariants} className="space-y-3 sm:space-y-4">
							{features.map((feature, index) => (
								<motion.div
									key={index}
									variants={itemVariants}
									className="flex items-center space-x-2 text-sm sm:text-base text-gray-300"
								>
									<ChevronRight className="text-primary w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
									<span className="leading-relaxed">{feature}</span>
								</motion.div>
							))}
						</motion.div>

						{/* CTA Button - Mobile Optimized */}
						<motion.button
							variants={itemVariants}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => {
								scroller.scrollTo("precos", {
									duration: 800,
									delay: 0,
									smooth: "easeInOutQuart",
									offset: -70,
								});
							}}
							className="w-full px-6 py-4 sm:px-8 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-primary to-secondary rounded-xl shadow-xl hover:shadow-primary/50 transition-all duration-300 min-h-[48px] flex items-center justify-center"
						>
							Começar Agora
						</motion.button>
					</motion.div>

					{/* Charts Section - Mobile Optimized */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate={isInView ? "visible" : "hidden"}
						className="lg:order-1 lg:sticky lg:top-8 space-y-6 sm:space-y-8"
					>
						<motion.div
							variants={itemVariants}
							className="bg-deep-purple/30 backdrop-blur-lg border border-gray-700 p-4 sm:p-6 rounded-xl shadow-lg"
						>
							{/* Chart Navigation - Mobile Optimized */}
							<div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
								{["Disparos", "Engajamento", "Distribuição"].map((tab, index) => (
									<motion.button
										key={index}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setActiveChart(index)}
										className={`flex-1 sm:flex-none px-4 py-3 sm:py-2 rounded-lg transition-all text-sm sm:text-base font-medium min-h-[44px] sm:min-h-auto flex items-center justify-center ${
											activeChart === index
												? "bg-primary text-white shadow-lg"
												: "bg-deep-purple/50 text-gray-400 hover:text-white hover:bg-deep-purple/70"
										}`}
									>
										{tab}
									</motion.button>
								))}
							</div>

							{/* Active Chart - Mobile Optimized */}
							<motion.div
								key={activeChart}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
								className="h-[250px] sm:h-[300px] lg:h-[400px] overflow-hidden"
							>
								{activeChart === 0 && <BarChart />}
								{activeChart === 1 && <LineChart />}
								{activeChart === 2 && <PieChart />}
							</motion.div>
						</motion.div>
					</motion.div>
				</div>
			</motion.div>

			{/* Gradient for smooth transition to next section */}
			<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-deep to-transparent pointer-events-none" />
		</motion.section>
	);
}
