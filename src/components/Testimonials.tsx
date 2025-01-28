/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

// Importar as imagens
import carlosImage from "@/assets/avatar-1.jpg";
import anaImage from "@/assets/avatar-2.jpg";
import robertoImage from "@/assets/avatar-3.jpg";

interface Testimonial {
	id: number;
	name: string;
	role: string;
	company: string;
	image: string;
	quote: string;
	rating: number;
}

const testimonials: Testimonial[] = [
	{
		id: 1,
		name: "Carlos Silva",
		role: "CEO",
		company: "TechInova",
		image: carlosImage,
		quote:
			"A WhatLead revolucionou nossa estratégia de marketing. Aumentamos nossas conversões em 300% em apenas 3 meses!",
		rating: 5,
	},
	{
		id: 2,
		name: "Ana Ferreira",
		role: "Diretora de Marketing",
		company: "GlobalShop",
		image: anaImage,
		quote:
			"Implementação fácil e resultados rápidos. Nossa equipe adorou a interface intuitiva e as análises detalhadas.",
		rating: 5,
	},
	{
		id: 3,
		name: "Roberto Mendes",
		role: "Proprietário",
		company: "Café Aroma",
		image: robertoImage,
		quote:
			"Como pequeno empresário, a WhatLead me permitiu competir com grandes marcas. O ROI superou todas as expectativas!",
		rating: 5,
	},
];

const Testimonials: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	const nextTestimonial = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
	}, []);

	const prevTestimonial = useCallback(() => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - 1 + testimonials.length) % testimonials.length,
		);
	}, []);

	useEffect(() => {
		if (isAutoPlaying) {
			const timer = setInterval(nextTestimonial, 8000); // Muda a cada 8 segundos
			return () => clearInterval(timer);
		}
	}, [isAutoPlaying, nextTestimonial]);

	const handleMouseEnter = () => setIsAutoPlaying(false);
	const handleMouseLeave = () => setIsAutoPlaying(true);

	return (
		<section className="relative py-24 overflow-hidden min-h-screen flex items-center justify-center">
			{/* Animated Background Elements */}
			<motion.div
				className="absolute inset-0 z-0"
				animate={{
					background: [
						"radial-gradient(circle at 20% 20%, rgba(60, 37, 211, 0.046) 0%, transparent 50%)",
						"radial-gradient(circle at 80% 80%, rgba(98, 37, 211, 0.066) 0%, transparent 50%)",
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

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
						Histórias de Sucesso
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						Descubra como empresas estão transformando seu marketing com a
						WhatLead
					</p>
				</motion.div>

				<div
					className="relative"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<AnimatePresence mode="wait">
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: 0.5, ease: "easeInOut" }}
							className="bg-deep-purple/30 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl"
						>
							<div className="flex flex-col md:flex-row items-center">
								<motion.div
									className="md:w-1/3 mb-8 md:mb-0"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.2, duration: 0.5 }}
								>
									<motion.img
										src={testimonials[currentIndex].image}
										alt={testimonials[currentIndex].name}
										className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-primary"
										whileHover={{ scale: 1.1, rotate: 5 }}
										transition={{ type: "spring", stiffness: 300 }}
									/>
								</motion.div>
								<motion.div
									className="md:w-2/3 md:pl-8"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3, duration: 0.5 }}
								>
									<blockquote className="text-xl md:text-2xl text-white italic mb-6">
										"{testimonials[currentIndex].quote}"
									</blockquote>
									<motion.div
										className="flex items-center justify-center md:justify-start mb-4"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.5, duration: 0.5 }}
									>
										{[...Array(testimonials[currentIndex].rating)].map(
											(_, i) => (
												<motion.div
													key={i}
													initial={{ opacity: 0, scale: 0 }}
													animate={{ opacity: 1, scale: 1 }}
													transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
												>
													<FiStar className="text-yellow-400 text-2xl" />
												</motion.div>
											),
										)}
									</motion.div>
									<motion.div
										className="text-center md:text-left"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.7, duration: 0.5 }}
									>
										<p className="text-lg font-semibold text-white">
											{testimonials[currentIndex].name}
										</p>
										<p className="text-gray-300">
											{testimonials[currentIndex].role},{" "}
											{testimonials[currentIndex].company}
										</p>
									</motion.div>
								</motion.div>
							</div>
						</motion.div>
					</AnimatePresence>

					<div className="absolute top-1/2 transform -translate-y-1/2 left-4 right-4 flex justify-between">
						<motion.button
							onClick={prevTestimonial}
							className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3"
							whileHover={{
								scale: 1.1,
								backgroundColor: "rgba(255, 255, 255, 0.3)",
							}}
							whileTap={{ scale: 0.9 }}
						>
							<FiChevronLeft className="text-3xl" />
						</motion.button>
						<motion.button
							onClick={nextTestimonial}
							className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3"
							whileHover={{
								scale: 1.1,
								backgroundColor: "rgba(255, 255, 255, 0.3)",
							}}
							whileTap={{ scale: 0.9 }}
						>
							<FiChevronRight className="text-3xl" />
						</motion.button>
					</div>
				</div>

				<motion.div
					className="mt-16 flex justify-center space-x-3"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8, duration: 0.5 }}
				>
					{testimonials.map((_, index) => (
						<motion.button
							key={index}
							className={`w-3 h-3 rounded-full ${
								index === currentIndex ? "bg-primary" : "bg-gray-400"
							}`}
							onClick={() => setCurrentIndex(index)}
							whileHover={{ scale: 1.2 }}
							whileTap={{ scale: 0.8 }}
						/>
					))}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1, duration: 0.5 }}
					className="mt-12 text-center"
				></motion.div>
			</div>
		</section>
	);
};

export default Testimonials;
