/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

import { motion } from "framer-motion";
import type React from "react";

const Legal: React.FC = () => {
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
				Informações Legais
			</motion.h1>

			<motion.div
				className="max-w-3xl mx-auto space-y-8"
				variants={itemVariants}
			>
				<motion.section variants={itemVariants}>
					<h2 className="text-2xl font-semibold mb-4">Declaração Legal</h2>
					<p className="text-gray-300">
						A WhatLead está comprometida em operar dentro dos limites da lei e
						em conformidade com todas as regulamentações aplicáveis. Este
						documento fornece informações importantes sobre nossas práticas
						legais e conformidade.
					</p>
				</motion.section>

				<motion.section variants={itemVariants}>
					<h2 className="text-2xl font-semibold mb-4">Conformidade com LGPD</h2>
					<p className="text-gray-300">
						Estamos em total conformidade com a Lei Geral de Proteção de Dados
						(LGPD). Tomamos medidas rigorosas para proteger os dados pessoais de
						nossos usuários e garantir que sejam processados de maneira legal e
						transparente.
					</p>
				</motion.section>

				<motion.section variants={itemVariants}>
					<h2 className="text-2xl font-semibold mb-4">Direitos Autorais</h2>
					<p className="text-gray-300">
						Todo o conteúdo presente neste site, incluindo textos, imagens,
						logotipos e software, é propriedade da WhatLead ou usado com
						permissão. A reprodução não autorizada é estritamente proibida.
					</p>
				</motion.section>

				<motion.section variants={itemVariants}>
					<h2 className="text-2xl font-semibold mb-4">
						Isenção de Responsabilidade
					</h2>
					<p className="text-gray-300">
						Embora nos esforcemos para fornecer informações precisas e
						atualizadas, não garantimos a exatidão, integridade ou adequação das
						informações contidas neste site para qualquer finalidade específica.
					</p>
				</motion.section>
			</motion.div>

			<motion.div className="mt-12 text-center" variants={itemVariants}>
				<p className="text-gray-400">
					Para mais informações legais, entre em contato com nosso departamento
					jurídico em juridico@whatlead.com.br
				</p>
			</motion.div>
		</motion.div>
	);
};

export default Legal;
