/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

import { motion } from "framer-motion";
import { Eye, Lock, Server, Shield } from "lucide-react";
import type React from "react";

const Security: React.FC = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1 },
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: "spring", stiffness: 100 },
		},
	};

	const securityFeatures = [
		{
			icon: <Shield className="w-12 h-12 text-primary" />,
			title: "Proteção Avançada",
			description:
				"Utilizamos as mais recentes tecnologias de segurança para proteger seus dados.",
		},
		{
			icon: <Lock className="w-12 h-12 text-primary" />,
			title: "Criptografia de Ponta a Ponta",
			description:
				"Todas as comunicações são criptografadas para garantir a máxima segurança.",
		},
		{
			icon: <Eye className="w-12 h-12 text-primary" />,
			title: "Monitoramento 24/7",
			description:
				"Nossa equipe de segurança monitora constantemente nossa infraestrutura.",
		},
		{
			icon: <Server className="w-12 h-12 text-primary" />,
			title: "Backups Regulares",
			description:
				"Realizamos backups frequentes para garantir a integridade dos dados.",
		},
	];

	return (
		<motion.div
			className="min-h-screen bg-deep text-white p-8 pt-16 sm:pt-20 md:pt-24"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			<motion.h1
				className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
				variants={itemVariants}
			>
				Segurança
			</motion.h1>

			<motion.div
				className="max-w-4xl mx-auto space-y-12"
				variants={itemVariants}
			>
				<motion.p
					className="text-xl text-center text-gray-300"
					variants={itemVariants}
				>
					Na WhatLead, a segurança dos seus dados é nossa prioridade máxima.
					Implementamos medidas rigorosas para garantir que suas informações
					estejam sempre protegidas.
				</motion.p>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 gap-8"
					variants={containerVariants}
				>
					{securityFeatures.map((feature, index) => (
						<motion.div
							key={index}
							className="bg-deep-purple/20 p-6 rounded-lg backdrop-blur-sm border border-primary/20"
							variants={itemVariants}
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<div className="flex items-center mb-4">
								{feature.icon}
								<h3 className="text-xl font-semibold ml-4">{feature.title}</h3>
							</div>
							<p className="text-gray-300">{feature.description}</p>
						</motion.div>
					))}
				</motion.div>
			</motion.div>

			<motion.div className="mt-16 text-center" variants={itemVariants}>
				<p className="text-gray-400">
					Para mais informações sobre nossas práticas de segurança, entre em
					contato com nossa equipe em contato@whatlead.com.br
				</p>
			</motion.div>
		</motion.div>
	);
};

export default Security;
