// Footer.tsx
/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

import { motion, useScroll, useTransform } from "framer-motion";
import {
	ArrowUp,
	Facebook,
	Github,
	Globe,
	Instagram,
	Linkedin,
	Mail,
	Sparkles,
	Twitter,
	Youtube,
} from "lucide-react";
import { useRef, useState } from "react";

export default function Footer() {
	const footerRef = useRef(null);
	const [hoveredLink, setHoveredLink] = useState<string | null>(null);
	const [isNewsletterFocused, setIsNewsletterFocused] = useState(false);
	const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

	const { scrollYProgress } = useScroll({
		target: footerRef,
		offset: ["start end", "end end"],
	});

	const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
	const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

	const socialLinks = [
		{
			name: "Github",
			icon: <Github />,
			url: "#",
			color: "hover:text-gray-100",
		},
		{
			name: "Twitter",
			icon: <Twitter />,
			url: "#",
			color: "hover:text-blue-400",
		},
		{
			name: "Instagram",
			icon: <Instagram />,
			url: "#",
			color: "hover:text-pink-500",
		},
		{
			name: "LinkedIn",
			icon: <Linkedin />,
			url: "#",
			color: "hover:text-blue-600",
		},
		{
			name: "Youtube",
			icon: <Youtube />,
			url: "#",
			color: "hover:text-red-500",
		},
		{
			name: "Facebook",
			icon: <Facebook />,
			url: "#",
			color: "hover:text-blue-500",
		},
	];

	const footerLinks = [
		{
			title: "Produto",
			links: ["Funcionalidades", "Preços", "Cases", "Integrações", "API"],
		},
		{
			title: "Empresa",
			links: ["Sobre nós", "Carreiras", "Blog", "Parceiros", "Imprensa"],
		},
		{
			title: "Recursos",
			links: ["Documentação", "Tutoriais", "Guias", "Webinars", "Relatórios"],
		},
		{
			title: "Legal",
			links: [
				{ name: "Privacidade", path: "/privacy" },
				{ name: "Termos", path: "/terms" },
				{ name: "Reembolso", path: "/reembolso" },
				{ name: "Segurança", path: "/security" },
				{ name: "Compliance", path: "/compliance" },
				{ name: "Licenças", path: "/legal" },
			],
		},
	];

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer ref={footerRef} className="relative bg-deep overflow-hidden">
			{/* Animated Background */}
			<motion.div
				className="absolute inset-0 z-0"
				animate={{
					background: [
						"radial-gradient(circle at 20% 20%, rgba(80, 37, 211, 0.05) 0%, transparent 50%)",
						"radial-gradient(circle at 80% 80%, rgba(83, 37, 211, 0.05) 0%, transparent 50%)",
					],
				}}
				transition={{
					duration: 8,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "reverse",
				}}
			/>

			{/* Floating Particles */}
			{[...Array(20)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute w-1 h-1 bg-primary/20 rounded-full"
					animate={{
						y: ["0vh", "100vh"],
						x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
					}}
					transition={{
						duration: Math.random() * 10 + 15,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
				/>
			))}

			<motion.div
				style={{ y, opacity }}
				className="max-w-7xl mx-auto px-4 py-16 relative z-10"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
					{/* Brand Section */}
					<div className="lg:col-span-2 space-y-6">
						<motion.div
							whileHover={{ scale: 1.05 }}
							className="flex items-center gap-2"
						>
							<motion.div
								animate={{ rotate: 360 }}
								transition={{
									duration: 20,
									repeat: Number.POSITIVE_INFINITY,
									ease: "linear",
								}}
							>
								<Sparkles className="w-8 h-8 text-primary" />
							</motion.div>
							<span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
								WhatLead
							</span>
						</motion.div>

						<p className="text-gray-400 text-lg">
							Transformando o futuro da comunicação digital com automação
							inteligente e tecnologia de ponta.
						</p>

						{/* Social Links */}
						<div className="flex flex-wrap gap-4">
							{socialLinks.map((social) => (
								<motion.a
									key={social.name}
									href={social.url}
									whileHover={{ scale: 1.2, rotate: 5 }}
									whileTap={{ scale: 0.9 }}
									onHoverStart={() => setHoveredSocial(social.name)}
									onHoverEnd={() => setHoveredSocial(null)}
									className={`
                    w-10 h-10 rounded-full
                    bg-deep-purple/20 backdrop-blur-sm
                    flex items-center justify-center
                    text-gray-400 ${social.color}
                    border border-gray-800
                    transition-all duration-300
                    hover:border-primary
                  `}
								>
									{social.icon}
									<motion.div
										className="absolute -inset-1 rounded-full bg-primary/10 blur-sm z-0"
										initial={{ opacity: 0 }}
										animate={{ opacity: hoveredSocial === social.name ? 1 : 0 }}
									/>
								</motion.a>
							))}
						</div>
					</div>

					{/* Footer Links */}
					{footerLinks.map((section) => (
						<div key={section.title}>
							<h3 className="text-white font-semibold mb-6">{section.title}</h3>
							<ul className="space-y-4">
								{section.links.map((link) => (
									<motion.li
										key={typeof link === "string" ? link : link.name}
										onHoverStart={() =>
											setHoveredLink(
												typeof link === "string" ? link : link.name,
											)
										}
										onHoverEnd={() => setHoveredLink(null)}
									>
										<a
											href={typeof link === "string" ? "#" : link.path}
											className="text-gray-400 hover:text-white transition-colors relative group flex items-center gap-2"
										>
											<motion.span
												animate={
													hoveredLink ===
														(typeof link === "string" ? link : link.name)
														? { x: 10 }
														: { x: 0 }
												}
											>
												{typeof link === "string" ? link : link.name}
											</motion.span>
											<motion.span
												initial={{ scaleX: 0 }}
												animate={{
													scaleX:
														hoveredLink ===
															(typeof link === "string" ? link : link.name)
															? 1
															: 0,
												}}
												className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
											/>
										</a>
									</motion.li>
								))}
							</ul>
						</div>
					))}

					{/* Newsletter Section */}
					<div className="lg:col-span-2">
						<h3 className="text-white font-semibold mb-6">Newsletter</h3>
						<motion.div
							animate={isNewsletterFocused ? { scale: 1.02 } : { scale: 1 }}
							className="space-y-4"
						>
							<div className="relative">
								<input
									type="email"
									placeholder="Seu melhor email"
									onFocus={() => setIsNewsletterFocused(true)}
									onBlur={() => setIsNewsletterFocused(false)}
									className="w-full px-4 py-3 rounded-lg bg-deep-purple/20 backdrop-blur-sm border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
								/>
								<motion.div
									className="absolute -inset-1 rounded-lg bg-primary/10 blur-sm z-0"
									initial={{ opacity: 0 }}
									animate={{ opacity: isNewsletterFocused ? 1 : 0 }}
								/>
							</div>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium relative group overflow-hidden"
							>
								<span className="relative z-10 flex items-center justify-center gap-2">
									Inscrever-se
									<Mail className="w-5 h-5" />
								</span>
								<motion.div
									className="absolute inset-0 bg-white/20"
									initial={{ x: "-100%" }}
									whileHover={{ x: "100%" }}
									transition={{ duration: 0.5 }}
								/>
							</motion.button>
						</motion.div>
					</div>
				</div>

				{/* Bottom Bar */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					className="mt-16 pt-8 border-t border-gray-800"
				>
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<div className="flex items-center gap-2 text-gray-400">
							<Globe className="w-4 h-4" />
							<span>© 2025 WhatLead. Todos os direitos reservados.</span>
						</div>
					</div>
				</motion.div>

				{/* Action Buttons */}
				<div className="fixed bottom-8 right-8 flex flex-col gap-4">
					<motion.button
						onClick={scrollToTop}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white shadow-lg hover:shadow-primary/50 transition-shadow"
					>
						<ArrowUp className="w-6 h-6" />
					</motion.button>
				</div>
			</motion.div>
		</footer>
	);
}
