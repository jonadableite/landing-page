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
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import {
	type Variants,
	motion,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import { CirclePlay, Star, Users, Shield, Zap, TrendingUp, CheckCircle } from "lucide-react";
/**
 * Node Modules
 */
import { useRef } from "react";
import ReactPlayer from "react-player/youtube";
import { useNavigate } from "react-router-dom";
/**
 * Analytics
 */
import { trackCTAClick } from "../lib/analytics";
import { useUTM } from "../lib/utm";
import clarityService from "../lib/clarity";

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
	const navigate = useNavigate();
	const dashboardLinhaRef = useRef<HTMLElement>(null);
	const { params: utmParams } = useUTM();

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

	const handleStartTrial = () => {
		trackCTAClick('hero_primary_cta', {
			button_text: 'Começar Agora - Grátis',
			position: 'hero_section',
			...utmParams,
		});
		
		// Track no Clarity
		clarityService.trackCTAClick(
			'hero_primary_cta',
			'hero_section',
			'/trial-form'
		);
		
		navigate("/trial-form");
	};

	const handleWatchDemo = () => {
		trackCTAClick('hero_secondary_cta', {
			button_text: 'Ver Demonstração',
			position: 'hero_section',
			...utmParams,
		});
		
		// Track no Clarity
		clarityService.trackCTAClick(
			'hero_watch_demo',
			'hero_section',
			'#demo-video'
		);
	};

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
						🚀 Plataforma #1 em Automação WhatsApp
					</motion.p>

					<motion.h2
						variants={heroChildVariants}
						className="text-4xl font-semibold !leading-tight mb-4 md-text-5xl md:mb-5 lg:text-6xl"
					>
						Multiplique suas vendas no WhatsApp{" "}
						<motion.span
							className="relative isolate ms-4 inline-block"
							initial={{ rotate: -5 }}
							animate={{ rotate: 0 }}
							transition={{ duration: 0.5, delay: 0.8 }}
						>
							<LayoutTextFlip
								text=""
								words={["em até 10x", "sem ban"]}
								duration={3000}
							/>
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
						className="text-muted-foreground md:text-xl mb-6"
					>
						Automatize suas vendas, aumente conversões e escale seu negócio com nossa plataforma completa de WhatsApp Marketing.
					</motion.p>

					{/* Prova Social com Animated Tooltip - Reposicionada para máxima conversão */}
					<motion.div
						variants={heroChildVariants}
						className="flex items-center justify-center gap-3 mb-8"
					>
						<div className="flex -space-x-2">
							<AnimatedTooltip
								items={[
									{
										id: 1,
										name: "Maria Silva",
										designation: "Empreendedora Digital",
										image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
									},
									{
										id: 2,
										name: "João Santos",
										designation: "CEO Startup",
										image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
									},
									{
										id: 3,
										name: "Ana Costa",
										designation: "Marketing Manager",
										image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
									},
									{
										id: 4,
										name: "Carlos Lima",
										designation: "E-commerce Owner",
										image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
									},
									{
										id: 5,
										name: "Lucia Ferreira",
										designation: "Consultora de Vendas",
										image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80"
									}
								]}
							/>
						</div>
						<div className="h-3.5 w-[0.85px] bg-white/65"></div>
						<span className="font-inter font-normal text-[#D0D0D0] text-xs leading-tight sm:text-sm">
							Mais de 30.100 usuários já usaram
						</span>
					</motion.div>

					{/* Features com ícones - Anti-ban, etc. */}
					<motion.div
						variants={heroChildVariants}
						className="flex flex-wrap justify-center gap-4 mb-8 md:gap-6"
					>
						<div className="flex items-center space-x-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/20">
							<Shield className="w-5 h-5" />
							<span className="text-sm font-medium">100% Anti-Ban</span>
						</div>
						<div className="flex items-center space-x-2 bg-blue-500/10 text-blue-600 px-4 py-2 rounded-full border border-blue-500/20">
							<Zap className="w-5 h-5" />
							<span className="text-sm font-medium">Automação Inteligente</span>
						</div>
						<div className="flex items-center space-x-2 bg-[#1e1b4a]/10 text-blue-400 px-4 py-2 rounded-full border border-[#1e1b4a]/20">
							<CheckCircle className="w-5 h-5" />
							<span className="text-sm font-medium">Resultados Garantidos</span>
						</div>
					</motion.div>

					<motion.div
						variants={heroChildVariants}
						className="flex justify-center gap-2 mt-6 md:mt-10"
					>
						<Button onClick={handleStartTrial}>Iniciar Teste Gratuito</Button>
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
										url="https://youtu.be/y5lEL2idvNU?si=q2K4yWsI7UK4IKzJ"
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
