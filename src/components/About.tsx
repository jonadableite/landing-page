/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
	FiGlobe,
	FiHeart,
	FiShield,
	FiTarget,
	FiTrendingUp,
	FiUsers,
} from "react-icons/fi";

import logo1 from "/src/assets/logo1.png";
import logo2 from "/src/assets/logo2.png";
import logo3 from "/src/assets/logo3.png";
import logo4 from "/src/assets/logo4.png";

const AboutCard = ({ icon: Icon, title, description, gradient, delay }) => (
	<motion.div
		className="relative group"
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5, delay }}
		viewport={{ once: true }}
	>
		<motion.div
			className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${gradient}`}
		/>
		<motion.div
			className="bg-deep-purple/30 backdrop-blur-xl rounded-2xl p-8 border border-gray-700 relative z-10 h-full"
			whileHover={{ y: -5 }}
			transition={{ type: "spring", stiffness: 300 }}
		>
			<motion.div
				className={`w-16 h-16 ${gradient} rounded-xl mb-6 flex items-center justify-center`}
				whileHover={{ rotate: [0, -10, 10, 0] }}
				transition={{ duration: 0.5 }}
			>
				<Icon className="w-8 h-8 text-white" />
			</motion.div>
			<h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
			<p className="text-gray-300 leading-relaxed">{description}</p>
		</motion.div>
	</motion.div>
);

const StatisticItem = ({ number, label, gradient }) => (
	<motion.div
		className="text-center"
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true }}
	>
		<motion.div
			className={`text-5xl font-bold mb-2 ${gradient} bg-clip-text text-transparent`}
			whileHover={{ scale: 1.1 }}
		>
			{number}
		</motion.div>
		<p className="text-gray-300">{label}</p>
	</motion.div>
);

const LogoItem = ({ src, alt }) => (
	<div className="flex-shrink-0 w-48 h-24 mx-8 flex items-center justify-center">
		<img
			src={src}
			alt={alt}
			className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
		/>
	</div>
);

const InfiniteLogoSlider = ({ logos, speed = 25 }) => {
	const [width, setWidth] = useState(0);
	const carousel = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (carousel.current) {
			setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
		}
	}, []);

	return (
		<div className="relative w-full overflow-hidden">
			<motion.div
				ref={carousel}
				className="flex"
				animate={{
					x: [-width, 0],
				}}
				transition={{
					x: {
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "loop",
						duration: speed,
						ease: "linear",
					},
				}}
			>
				{logos.concat(logos).map((logo, index) => (
					<LogoItem key={index} {...logo} />
				))}
			</motion.div>
		</div>
	);
};

const About = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const { scrollYProgress } = useScroll({ target: ref });
	const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const cards = [
		{
			icon: FiTarget,
			title: "Missão Institucional",
			description:
				"Promovemos a excelência em comunicação digital através de soluções tecnológicas inovadoras, garantindo eficiência e resultados mensuráveis para nossos clientes.",
			gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
		},
		{
			icon: FiShield,
			title: "Compromisso com a Segurança",
			description:
				"Asseguramos a proteção integral dos dados e a conformidade com a LGPD, mantendo os mais elevados padrões de segurança digital do mercado.",
			gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
		},
		{
			icon: FiTrendingUp,
			title: "Desenvolvimento Contínuo",
			description:
				"Investimos constantemente em pesquisa e desenvolvimento, mantendo nossa plataforma sempre atualizada com as mais recentes inovações tecnológicas.",
			gradient: "bg-gradient-to-r from-primary to-secondary",
		},
		{
			icon: FiUsers,
			title: "Capital Humano",
			description:
				"Nossa equipe multidisciplinar é composta por especialistas altamente qualificados, comprometidos com a excelência e satisfação dos clientes.",
			gradient: "bg-gradient-to-r from-orange-500 to-red-500",
		},
		{
			icon: FiGlobe,
			title: "Presença Global",
			description:
				"Atendemos clientes em diversos países, adaptando nossas soluções às necessidades específicas de cada mercado e cultura.",
			gradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
		},
		{
			icon: FiHeart,
			title: "Responsabilidade Social",
			description:
				"Mantemos um compromisso ativo com a sustentabilidade e o desenvolvimento social, contribuindo para um futuro mais inclusivo e sustentável.",
			gradient: "bg-gradient-to-r from-rose-500 to-pink-500",
		},
	];

	const statistics = [
		{
			number: "98%",
			label: "Satisfação dos Clientes",
			gradient: "bg-gradient-to-r from-primary to-secondary",
		},
		{
			number: "10+",
			label: "Países Atendidos",
			gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
		},
		{
			number: "10M+",
			label: "Mensagens Processadas",
			gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
		},
		{
			number: "24/7",
			label: "Suporte Especializado",
			gradient: "bg-gradient-to-r from-orange-500 to-red-500",
		},
	];

	const clientLogos = [
		{ src: logo1, alt: "Cliente 1" },
		{ src: logo2, alt: "Cliente 2" },
		{ src: logo3, alt: "Cliente 3" },
		{ src: logo4, alt: "Cliente 4" },
	];

	return (
		<section
			ref={ref}
			className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-deep-DEFAULT to-deep-purple/90 relative overflow-hidden"
		>
			{/* Animated Background Elements */}
			<motion.div
				className="absolute inset-0 z-0"
				animate={{
					background: [
						"radial-gradient(circle at 20% 20%, rgba(37, 211, 102, 0.15) 0%, transparent 50%)",
						"radial-gradient(circle at 80% 80%, rgba(37, 211, 102, 0.15) 0%, transparent 50%)",
					],
				}}
				transition={{
					duration: 10,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "reverse",
				}}
			/>

			{/* Floating Particles */}
			{[...Array(20)].map((_, i) => (
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

			<div className="max-w-7xl mx-auto px-4 relative z-10">
				{/* Header Section */}
				<motion.div style={{ y }} className="text-center mb-20">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-5xl md:text-6xl font-bold mb-8"
					>
						<span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
							Excelência em Inovação Digital
						</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
					>
						A WhatLead é uma empresa líder em soluções de comunicação digital,
						comprometida com a excelência e inovação no desenvolvimento de
						tecnologias que transformam a maneira como as empresas se relacionam
						com seus clientes.
					</motion.p>
				</motion.div>

				{/* Statistics Section */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
					{statistics.map((stat, index) => (
						<StatisticItem key={index} {...stat} />
					))}
				</div>

				{/* Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
					{cards.map((card, index) => (
						<AboutCard key={index} {...card} delay={index * 0.1} />
					))}
				</div>

				{/* Client Logos Section */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mb-20"
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
						Empresas que Confiam em Nós
					</h2>
					<div className="relative w-full max-w-5xl mx-auto">
						<div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-deep-DEFAULT to-transparent z-10" />
						<div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-deep-DEFAULT to-transparent z-10" />
						<InfiniteLogoSlider logos={clientLogos} speed={30} />
					</div>
				</motion.div>

				{/* Call to Action */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					className="text-center"
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
						Construa o Futuro Conosco
					</h2>
					<p className="text-gray-300 mb-8 text-lg max-w-3xl mx-auto">
						Junte-se a milhares de empresas que já transformaram sua comunicação
						digital com nossas soluções inovadoras.
					</p>
					<motion.button
						whileHover={{
							scale: 1.05,
							boxShadow: "0 0 30px rgba(37, 211, 102, 0.3)",
						}}
						whileTap={{ scale: 0.95 }}
						className="px-12 py-5 bg-gradient-to-r from-primary to-secondary text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-primary/50 transition-all duration-300"
					>
						Agende uma Demonstração
					</motion.button>
				</motion.div>
			</div>
		</section>
	);
};

export default About;
