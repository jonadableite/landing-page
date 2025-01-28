/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

import { motion } from "framer-motion";
import { FaChartLine, FaRobot, FaWhatsapp } from "react-icons/fa";

const FloatingIcons = () => {
	return (
		<div className="absolute inset-0 perspective-1000">
			<motion.div
				animate={{
					rotateX: [0, 10, 0],
					rotateY: [0, 15, 0],
				}}
				transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
				className="relative w-full h-full"
			>
				{[FaWhatsapp, FaChartLine, FaRobot].map((Icon, index) => (
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
						className="absolute text-primary/20 text-7xl"
						style={{
							top: `${20 + index * 25}%`,
							left: `${15 + index * 30}%`,
						}}
					>
						<Icon />
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};

export default FloatingIcons;
