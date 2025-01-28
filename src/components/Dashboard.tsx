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
			className="min-h-screen p-8 overflow-hidden relative"
		>
			<motion.div
				style={{ y }}
				className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10"
			>
				{/* Left Side: Charts */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					className="sticky top-8 space-y-8"
				>
					<motion.div
						variants={itemVariants}
						className="bg-deep-purple/30 backdrop-blur-lg border border-gray-700 p-6 rounded-xl shadow-lg"
					>
						{/* Chart Navigation */}
						<div className="flex space-x-4 mb-6">
							{["Disparos", "Engajamento", "Distribuição"].map((tab, index) => (
								<motion.button
									key={index}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setActiveChart(index)}
									className={`px-4 py-2 rounded-lg transition-all ${
										activeChart === index
											? "bg-primary text-white"
											: "bg-deep-purple/50 text-gray-400 hover:text-white"
									}`}
								>
									{tab}
								</motion.button>
							))}
						</div>

						{/* Active Chart */}
						<motion.div
							key={activeChart}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
							className="h-[400px]"
						>
							{activeChart === 0 && <BarChart />}
							{activeChart === 1 && <LineChart />}
							{activeChart === 2 && <PieChart />}
						</motion.div>
					</motion.div>
				</motion.div>

				{/* Right Side: Copy & Stats */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					className="space-y-12"
				>
					{/* Header */}
					<motion.div variants={itemVariants} className="space-y-6">
						<motion.h1
							className="text-6xl font-bold leading-tight"
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
						<p className="text-xl text-gray-300 leading-relaxed">
							Visualize e otimize suas campanhas em tempo real com nossa
							plataforma intuitiva de análise de dados.
						</p>
					</motion.div>

					{/* Stats Grid */}
					<motion.div
						variants={containerVariants}
						className="grid grid-cols-2 gap-4"
					>
						{stats.map((stat, index) => (
							<motion.div
								key={index}
								variants={itemVariants}
								whileHover={{ scale: 1.05, y: -5 }}
								onHoverStart={() => setHoveredStat(index)}
								onHoverEnd={() => setHoveredStat(null)}
								className="relative p-6 rounded-xl bg-deep-purple/30 border border-gray-700 shadow-lg group"
							>
								<motion.div
									className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-xl"
									initial={{ opacity: 0 }}
									animate={{ opacity: hoveredStat === index ? 1 : 0 }}
									transition={{ duration: 0.3 }}
								/>

								<div className="relative z-10 flex items-start gap-4">
									<div className="text-primary">{stat.icon}</div>
									<div>
										<h4 className="text-2xl font-bold text-white mb-1">
											{stat.value}
										</h4>
										<p className="text-sm text-gray-400">{stat.label}</p>
										<motion.p
											initial={{ opacity: 0, height: 0 }}
											animate={{
												opacity: hoveredStat === index ? 1 : 0,
												height: hoveredStat === index ? "auto" : 0,
											}}
											className="text-xs text-primary mt-2"
										>
											{stat.description}
										</motion.p>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>

					{/* Features List */}
					<motion.div variants={containerVariants} className="space-y-4">
						{features.map((feature, index) => (
							<motion.div
								key={index}
								variants={itemVariants}
								className="flex items-center space-x-2 text-gray-300"
							>
								<ChevronRight className="text-primary" />
								<span>{feature}</span>
							</motion.div>
						))}
					</motion.div>

					{/* CTA Button */}
					<motion.button
						variants={itemVariants}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => {
							scroller.scrollTo("precos", {
								duration: 800,
								delay: 0,
								smooth: "easeInOutQuart",
								offset: -70,
							});
						}}
						className="w-full px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-primary to-secondary rounded-xl shadow-xl hover:shadow-primary/50 transition-all duration-300"
					>
						Começar Agora
					</motion.button>
				</motion.div>
			</motion.div>

			{/* Gradient for smooth transition to next section */}
			<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-deep to-transparent pointer-events-none" />
		</motion.section>
	);
}
