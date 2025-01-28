/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

import { motion } from "framer-motion";
import type React from "react";

const Terms: React.FC = () => {
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
				Termos de Serviço
			</motion.h1>

			<motion.div
				className="max-w-3xl mx-auto space-y-8"
				variants={itemVariants}
			>
				<motion.section variants={itemVariants}>
					<h2 className="text-2xl font-semibold mb-4">Aceitação dos Termos</h2>
					<p className="text-gray-300">
						Ao usar os serviços da WhatLead, você concorda em cumprir e estar
						vinculado a estes Termos de Serviço. Se você não concordar com
						qualquer parte destes termos, não poderá usar nossos serviços.
					</p>
				</motion.section>

				<motion.section variants={itemVariants}>
					<h2 className="text-2xl font-semibold mb-4">Uso do Serviço</h2>
					<p className="text-gray-300">
						Você concorda em usar nossos serviços apenas para fins legais e de
						acordo com estes termos. Você não deve usar o serviço de maneira que
						possa danificar, desativar, sobrecarregar ou prejudicar nossos
						servidores ou redes.
					</p>
				</motion.section>

				<motion.section variants={itemVariants}>
					<h2 className="text-2xl font-semibold mb-4">Contas de Usuário</h2>
					<p className="text-gray-300">
						Você é responsável por manter a confidencialidade de sua conta e
						senha. Você concorda em notificar imediatamente a WhatLead sobre
						qualquer uso não autorizado de sua conta ou qualquer outra violação
						de segurança.
					</p>
				</motion.section>

				<motion.section variants={itemVariants}>
					<h2 className="text-2xl font-semibold mb-4">
						Modificações do Serviço
					</h2>
					<p className="text-gray-300">
						A WhatLead reserva-se o direito de modificar ou descontinuar,
						temporária ou permanentemente, o serviço (ou qualquer parte dele)
						com ou sem aviso prévio. Você concorda que a WhatLead não será
						responsável perante você ou terceiros por qualquer modificação,
						suspensão ou descontinuação do serviço.
					</p>
				</motion.section>
			</motion.div>

			<motion.div className="mt-12 text-center" variants={itemVariants}>
				<p className="text-gray-400">
					Ao usar nossos serviços, você concorda com estes termos. Para
					quaisquer dúvidas, entre em contato conosco em contato@whatlead.com.br
				</p>
			</motion.div>
		</motion.div>
	);
};

export default Terms;
