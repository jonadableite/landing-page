/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

/**
 * Assets
 */
import { dashboardLinha } from "@/assets";
import Brand from "@/components/Brand";
/**
 * Components
 */
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
	type Variants,
	motion,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import { CirclePlay } from "lucide-react";
/**
 * Node Modules
 */
import { useRef } from "react";
import ReactPlayer from "react-player/youtube";

/**
 * Constants
 */
import { heroData } from "@/constants";

/**
 * Framer motion variants
 */
const heroVariant: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			staggerChildren: 0.2,
		},
	},
};

const heroChildVariants: Variants = {
	hidden: { y: 50, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.7,
			ease: "easeOut",
		},
	},
};

const imageVariants: Variants = {
	hidden: { scale: 0.8, opacity: 0 },
	visible: {
		scale: 1,
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: "easeOut",
			delay: 0.5,
		},
	},
};

const Hero = () => {
	const dashboardLinhaRef = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: dashboardLinhaRef,
		offset: ["start 1080px", "50% start"],
	});

	const scrollYTransform = useTransform(scrollYProgress, [0, 1], [0.85, 1.1]);

	const scale = useSpring(scrollYTransform, {
		stiffness: 300,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<section className="py-10 md:py-16 overflow-hidden relative">
			<motion.div
				variants={heroVariant}
				initial="hidden"
				animate="visible"
				className="container text-center"
			>
				<div className="max-w-screen-md mx-auto">
					<motion.p
						variants={heroChildVariants}
						className="text-sm uppercase tracking-wider bg-secondary/50 text-secondary-foreground max-w-max mx-auto px-3 py-1 rounded-full border-t border-blue-500/10 backdrop-blur-3xl mb-6 md:mb-10"
					>
						{heroData.sectionSubtitle}
					</motion.p>

					<motion.h2
						variants={heroChildVariants}
						className="text-4xl font-semibold !leading-tight mb-4 md-text-5xl md:mb-5 lg:text-6xl"
					>
						{heroData.sectionTitle}
						<motion.span
							className="relative isolate ms-4 inline-block"
							initial={{ rotate: -5 }}
							animate={{ rotate: 0 }}
							transition={{ duration: 0.5, delay: 0.8 }}
						>
							{heroData.decoTitle}
							<motion.span
								className="absolute -z-10 top-2 -left-6 -right-4 bottom-0.5 bg-foreground/5 rounded-full px-8 ms-3 border-t border-foreground/20 shadow-[inset_0px_0px_30px_0px] shadow-foreground/20 md:top-3 md:bottom-1 lg:top-4 lg:bottom-2"
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								transition={{ duration: 0.5, delay: 1 }}
							></motion.span>
						</motion.span>
					</motion.h2>

					<motion.p
						variants={heroChildVariants}
						className="text-muted-foreground md:text-xl"
					>
						{heroData.sectionText}
					</motion.p>

					<motion.div
						variants={heroChildVariants}
						className="flex justify-center gap-2 mt-6 md:mt-10"
					>
						<Button>Iniciar Teste Gratuito</Button>
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="ghost">
									<CirclePlay />
									Assistir Demonstração
								</Button>
							</DialogTrigger>
							<DialogContent className="p-0 overflow-hidden max-w-[640px] xl:max-w-[1000px]">
								<AspectRatio ratio={16 / 9}>
									<ReactPlayer
										url="https://www.youtube.com/watch?v=QVXE1EzMrfw"
										style={{
											minWidth: "100%",
											minHeight: "100%",
											maxWidth: "100%",
											maxHeight: "100%",
										}}
									/>
								</AspectRatio>
							</DialogContent>
						</Dialog>
					</motion.div>
				</div>

				<motion.div
					variants={imageVariants}
					className="relative mt-12 max-w-screen-xl mx-auto isolate rounded-xl md:mt-16"
				>
					<motion.figure
						className="bg-background/60 border border-slate-800 backdrop-blur-3xl rounded-xl shadow-2xl overflow-hidden"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.95 }}
						initial={{
							y: 120,
							opacity: 0,
							filter: "blur(5px)",
						}}
						animate={{
							y: 0,
							opacity: 1,
							filter: "blur(0)",
						}}
						transition={{
							duration: 1.5,
							delay: 0.5,
							ease: "backInOut",
						}}
						ref={dashboardLinhaRef}
						style={{ scale }}
					>
						<img
							src={dashboardLinha}
							width={1468}
							height={815}
							alt="WhatLead dashboard"
							className="w-full h-auto"
						/>
					</motion.figure>

					{/* Blurry glow effect */}
					<motion.div
						className="absolute bg-primary inset-5 blur-[50px] -z-10"
						initial={{
							scale: 0.8,
							opacity: 0,
						}}
						animate={{
							opacity: [0.5, 0.8, 0.5],
							scale: [1, 1.1, 1],
						}}
						transition={{
							duration: 5,
							delay: 0.5,
							ease: "backInOut",
							repeat: Number.POSITIVE_INFINITY,
							repeatType: "reverse",
						}}
					></motion.div>
					<motion.div
						className="absolute inset-0 bg-primary blur-[200px] scale-y-75 scale-x-125 rounded-full -z-10"
						initial={{
							scale: 0.4,
							opacity: 0,
						}}
						animate={{
							opacity: [0.3, 0.6, 0.3],
							scale: [1, 1.2, 1],
						}}
						transition={{
							duration: 7,
							delay: 1.5,
							repeat: Number.POSITIVE_INFINITY,
							repeatType: "reverse",
							ease: "backInOut",
						}}
					></motion.div>
				</motion.div>

				{/* Gradiente de desvanecimento */}
				<div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent"></div>

				{/* Brand */}
				<div className="mt-12 relative z-10">
					<Brand />
				</div>
			</motion.div>
		</section>
	);
};

export default Hero;
