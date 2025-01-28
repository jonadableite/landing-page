// src/components/Brand.tsx
/**
 * @copyright 2025 jonadab-whatlead
 * @license Apache-2.0
 */
import BenefitsList from "@/components/BenefitsList";

/**
 * Node Modules
 */
import { motion } from "framer-motion";

/**
 * Assets
 * */

/**
 * Framer Motion Variants
 * */
import * as variants from "@/lib/motionVariants";

const Brand = () => {
	// Definindo um array de índices para os elementos flutuantes
	const floatingElements = [0, 1, 2];

	return (
		<div className="relative z-10 py-8">
			<div className="container max-w-screen-lg">
				<motion.p
					variants={variants.fadeInUp}
					initial="start"
					whileInView="end"
					viewport={{ once: true }}
					className="text-center mb-4 md:mb-6 text-white/80"
				>
					Lidere o Futuro da Comunicação Digital.
				</motion.p>

				<BenefitsList />

				{/* 3D Floating Elements */}
				<div className="absolute inset-0 perspective-1000 pointer-events-none">
					<motion.div
						animate={{
							rotateX: [0, 10, 0],
							rotateY: [0, 15, 0],
						}}
						transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
						className="relative w-full h-full"
					>
						{/* Floating Icons */}
						{floatingElements.map((index) => (
							<motion.div
								key={index}
								animate={{
									y: [-20, 20],
									x: [-15, 15],
									rotate: [-10, 10],
								}}
								transition={{
									duration: 4,
									delay: index * 0.5,
									repeat: Number.POSITIVE_INFINITY,
									repeatType: "reverse",
								}}
								className="absolute text-primary/30 text-4xl md:text-6xl lg:text-8xl"
								style={{
									top: `${20 + index * 25}%`,
									left: `${15 + index * 30}%`,
								}}
							></motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Brand;
