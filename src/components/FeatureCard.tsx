/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

/**
 * Node modules
 */
import { motion } from "framer-motion";

type FetureCardProps = {
	classes?: string;
	children: JSX.Element;
};

const FeatureCard = ({ classes, children }: FetureCardProps) => {
	return (
		<motion.div
			className={`relative overflow-hidden p-[1pc] ring-inset ring-zinc-800/50 rounded-[14px] ${classes}`}
		>
			<motion.div className="relative isolate bg-card backdrop-blur-md rounded-xl overflow-hidden">
				{children}
			</motion.div>
		</motion.div>
	);
};

export default FeatureCard;
