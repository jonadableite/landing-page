// src/components/AgentTypesSection.tsx


/**
 * @copyright 2025 jonadab-whatlead
 * @license Apache-2.0
 */


import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
	Bot, // Keep Bot as a fallback or for general use if needed
	Brain, // Icon for LLM
	Plug, // Icon for A2A
	ListOrdered, // Icon for Sequential
	Columns, // Icon for Parallel
	Repeat, // Icon for Loop
	Workflow, // Icon for Workflow
	ClipboardList, // Icon for Task
} from "lucide-react";
import { useRef, useState } from "react";


// Define the types of agents based on the provided text with updated icons
const agentTypes = [
	{
		icon: Brain, // Changed icon to Brain
		title: "Agente LLM",
		description:
			"Agente fundamental baseado em Grandes Modelos de Linguagem, ideal para conversas, análise de texto e tarefas que exigem compreensão da linguagem natural.",
		color: "from-blue-500 to-purple-500",
	},
	{
		icon: Plug, // Changed icon to Plug
		title: "Agente A2A",
		description:
			"Integra agentes externos que implementam o protocolo Agent-to-Agent (A2A) da Google, permitindo a interoperabilidade com sistemas externos.",
		color: "from-green-500 to-emerald-500",
	},
	{
		icon: ListOrdered, // Changed icon to ListOrdered
		title: "Agente Sequencial",
		description:
			"Executa vários sub-agentes em sequência ordenada, onde cada agente recebe a saída do anterior como entrada.",
		color: "from-yellow-500 to-orange-500",
	},
	{
		icon: Columns, // Changed icon to Columns
		title: "Agente Paralelo",
		description:
			"Executa vários subagentes simultaneamente, ideal para tarefas independentes que podem ser processadas em paralelo.",
		color: "from-pink-500 to-rose-500",
	},
	{
		icon: Repeat, // Changed icon to Repeat
		title: "Agente Loop",
		description:
			"Executa subagentes em loops iterativos, refinando os resultados com cada iteração até atingir os critérios de convergência.",
		color: "from-purple-500 to-indigo-500",
	},
	{
		icon: Workflow, // Changed icon to Workflow
		title: "Agente de Fluxo de Trabalho",
		description:
			"Cria fluxos de trabalho complexos com interface visual usando LangGraph e React Flow, oferecendo o máximo de controle e flexibilidade.",
		color: "from-red-500 to-orange-500",
	},
	{
		icon: ClipboardList, // Changed icon to ClipboardList
		title: "Agente de Tarefas",
		description:
			"Inspirado pelo CrewAI, permite atribuir tarefas específicas a agentes com prompts estruturados e saídas esperadas bem definidas.",
		color: "from-teal-500 to-cyan-500",
	},
];


export default function AgentTypesSection() {
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, { once: true, margin: "-100px" });
	const [hoveredAgentType, setHoveredAgentType] = useState<number | null>(null);


	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});


	const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
	const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);


	return (
		<section
			ref={containerRef}
			className="relative min-h-screen overflow-hidden bg-gradient-to-br from-deep-purple via-deep to-deep-purple/90 py-20 px-4"
		>
			{/* Floating Particles (Optional - keep or remove) */}
			{[...Array(30)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute w-1 h-1 bg-primary/30 rounded-full"
					animate={{
						y: ["0vh", "100vh"],
						x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
					}}
					transition={{
						duration: Math.random() * 10 + 20,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
				/>
			))}


			<div className="max-w-7xl mx-auto relative z-10">
				{/* Header Section */}
				<motion.div
					style={{ y, opacity }}
					className="text-center space-y-8 mb-20"
				>
					<motion.div
						animate={{
							scale: [1, 1.02, 1],
							opacity: [0.5, 1, 0.5],
						}}
						transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
						className="inline-block"
					>
						<h2 className="text-6xl md:text-7xl font-bold leading-tight">
							<span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
								Tipos de
							</span>
							<br />
							<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
								Agentes
							</span>
						</h2>
					</motion.div>


					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
					>
						Conheça todos os tipos de agentes disponíveis na plataforma WhatLead e
						escolha o ideal para o seu caso de uso.
					</motion.p>
				</motion.div>


				{/* Agent Types Grid */}
				<motion.div
					variants={{
						hidden: { opacity: 0 },
						show: {
							opacity: 1,
							transition: {
								staggerChildren: 0.15,
							},
						},
					}}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
				>
					{agentTypes.map((agent, index) => (
						<motion.div
							key={index}
							variants={{
								hidden: { opacity: 0, y: 20 },
								show: { opacity: 1, y: 0 },
							}}
							whileHover={{ scale: 1.03, y: -5 }}
							onHoverStart={() => setHoveredAgentType(index)}
							onHoverEnd={() => setHoveredAgentType(null)}
							className="relative p-8 rounded-2xl bg-deep-purple/30 backdrop-blur-lg border border-gray-700 shadow-xl group"
						>
							<motion.div
								className={`absolute inset-0 bg-gradient-to-r ${agent.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
							/>

							<div className="relative z-10">
								<motion.div
									animate={
										hoveredAgentType === index ? { rotate: [0, 10, -10, 0] } : {}
									}
									transition={{ duration: 0.4 }}
									className="text-primary mb-6 p-4 bg-white/5 rounded-xl w-fit"
								>
									{/* Render the icon component */}
									<agent.icon className="w-8 h-8" />
								</motion.div>

								<h3 className="text-2xl font-bold text-white mb-3">
									{agent.title}
								</h3>
								<p className="text-gray-300">{agent.description}</p>
							</div>

							<motion.div
								className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								style={{
									background: `linear-gradient(45deg, ${agent.color})`,
									filter: "blur(20px)",
									zIndex: -1,
								}}
							/>
						</motion.div>
					))}
				</motion.div>

				{/* Removed CTA Button section */}
			</div>

			{/* Scroll Progress */}
			<motion.div
				style={{ scaleX: scrollYProgress }}
				className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary transform origin-left"
			/>
		</section>
	);
}
