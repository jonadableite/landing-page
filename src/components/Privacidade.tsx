/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

import { motion } from "framer-motion";
import type React from "react";

const Privacy: React.FC = () => {
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
			className="min-h-[100vh] bg-deep text-white p-8 pt-16 sm:pt-20 md:pt-24 flex flex-col"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			<motion.h1
				className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
				variants={itemVariants}
			>
				Política de Privacidade
			</motion.h1>

			<motion.div
				className="max-w-3xl mx-auto space-y-8 flex-grow"
				variants={itemVariants}
			>
				<motion.section variants={itemVariants}>
					<h2 className="text-2xl font-semibold mb-4">Coleta de Dados</h2>
					<p className="text-gray-300">
						A WhatLead coleta apenas os dados necessários para fornecer nossos
						serviços. Isso pode incluir informações de contato, dados de uso e
						preferências do usuário. Todos os dados são coletados com o
						consentimento explícito do usuário.
					</p>
				</motion.section>

				<motion.section variants={itemVariants}>
					<h2 className="text-2xl font-semibold mb-4">Uso de Dados</h2>
					<p className="text-gray-300">
						Utilizamos os dados coletados para melhorar nossos serviços,
						personalizar a experiência do usuário e fornecer suporte ao cliente.
						Nunca vendemos ou compartilhamos dados pessoais com terceiros sem o
						consentimento do usuário.
					</p>
				</motion.section>

				<motion.section variants={itemVariants}>
					<h2 className="text-2xl font-semibold mb-4">Segurança de Dados</h2>
					<p className="text-gray-300">
						Implementamos medidas de segurança robustas para proteger os dados
						do usuário contra acesso não autorizado, alteração, divulgação ou
						destruição. Isso inclui criptografia de ponta a ponta e
						monitoramento constante de nossa infraestrutura.
					</p>
				</motion.section>

				<motion.section variants={itemVariants}>
					<h2 className="text-2xl font-semibold mb-4">Seus Direitos</h2>
					<p className="text-gray-300">
						Os usuários têm o direito de acessar, corrigir ou excluir seus dados
						pessoais a qualquer momento. Também podem solicitar uma cópia de
						seus dados ou retirar o consentimento para o processamento de dados.
					</p>
				</motion.section>
			</motion.div>

			<motion.div className="mt-12 text-center" variants={itemVariants}>
				<p className="text-gray-400">
					Para exercer seus direitos ou para mais informações sobre nossa
					política de privacidade, entre em contato conosco em
					privacy@whatlead.com.br
				</p>
			</motion.div>
		</motion.div>
	);
};

export default Privacy;
