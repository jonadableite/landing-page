/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
	FiArrowLeft,
	FiArrowRight,
	FiBriefcase,
	FiCheck,
	FiMail,
	FiPhone,
	FiUser,
} from "react-icons/fi";
import FloatingIcons from "./FloatingIcons";

const businessTypes = [
	"E-commerce",
	"Serviços",
	"Tecnologia",
	"Saúde",
	"Educação",
	"Marketing",
	"Entretenimento",
	"Alimentação",
	"Moda",
	"Finanças",
	"Imobiliário",
	"Outro",
];

const pageVariants = {
	initial: { opacity: 0, x: "-100%" },
	in: { opacity: 1, x: 0 },
	out: { opacity: 0, x: "100%" },
};

const pageTransition = {
	type: "tween",
	ease: "anticipate",
	duration: 0.5,
};

const inputVariants = {
	focus: { scale: 1.05, boxShadow: "0 0 0 3px rgba(37, 211, 102, 0.3)" },
};

const buttonVariants = {
	default: { scale: 1 },
	loading: { scale: 0.95 },
};

const buttonTextVariants = {
	default: { opacity: 1 },
	loading: { opacity: 0 },
};

const loadingVariants = {
	loading: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const loadingCircleVariants = {
	loading: {
		opacity: [0, 1],
		transition: {
			repeat: Number.POSITIVE_INFINITY,
			duration: 0.6,
		},
	},
};

interface FormData {
	name: string;
	whatsapp: string;
	email: string;
	businessType: string;
}

export default function TestGratuitoForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const [step, setStep] = useState(1);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		setIsLoading(true);
		setSubmitError(null);
		console.log(data);
		try {
			await sendWhatsAppMessage(data);
			setIsSubmitted(true);
		} catch (error) {
			console.error("Erro ao enviar formulário:", error);
			setSubmitError(
				"Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	const formatFormData = (formData: FormData): string => {
		return `
    ⚠️ Novo pedido de teste gratuito! ⚠️

    Nome: ${formData.name}
    WhatsApp: ${formData.whatsapp}
    E-mail: ${formData.email}
    Ramo de negócio: ${formData.businessType}

    Enviado pelo formulário de teste gratuito no site.
    `.trim();
	};

	const sendWhatsAppMessage = async (formData: FormData) => {
		const message = formatFormData(formData);
		const apiKey = "429683C4C977415CAAFCCE10F7D57E11";
		const instance = "WhatLeads";
		const recipientNumber = "5512992465180";

		const options: RequestInit = {
			method: "POST",
			headers: {
				apikey: apiKey,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				number: recipientNumber,
				text: message,
			}),
		};

		const response = await fetch(
			`https://evo.whatlead.com.br/message/sendText/${instance}`,
			options,
		);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		console.log("Mensagem enviada:", data);
		return data;
	};

	const renderInput = (name, label, icon, type = "text", options = {}) => (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
		>
			<label
				className="block text-sm font-medium text-gray-300 mb-1"
				htmlFor={name}
			>
				{label}
			</label>
			<motion.div
				whileFocus="focus"
				variants={inputVariants}
				className="relative"
			>
				{icon}
				<input
					{...register(name, options)}
					className="w-full px-10 py-3 bg-deep/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
					type={type}
					placeholder={options.placeholder}
				/>
			</motion.div>
			{errors[name] && (
				<p className="mt-1 text-sm text-red-400">{errors[name].message}</p>
			)}
		</motion.div>
	);

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<>
						{renderInput(
							"name",
							"Nome completo",
							<FiUser className="absolute top-3 left-3 text-gray-400" />,
							"text",
							{ required: "Nome é obrigatório", placeholder: "Seu nome" },
						)}
						{renderInput(
							"whatsapp",
							"WhatsApp",
							<FiPhone className="absolute top-3 left-3 text-gray-400" />,
							"tel",
							{
								required: "Número de WhatsApp é obrigatório",
								pattern: {
									value: /^[0-9]{10,11}$/,
									message: "Número de WhatsApp inválido",
								},
								placeholder: "(11) 98765-4321",
							},
						)}
					</>
				);
			case 2:
				return (
					<>
						{renderInput(
							"email",
							"E-mail",
							<FiMail className="absolute top-3 left-3 text-gray-400" />,
							"email",
							{
								required: "E-mail é obrigatório",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Endereço de e-mail inválido",
								},
								placeholder: "seu@email.com",
							},
						)}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<label
								className="block text-sm font-medium text-gray-300 mb-1"
								htmlFor="businessType"
							>
								Ramo de negócio
							</label>
							<motion.div
								whileFocus="focus"
								variants={inputVariants}
								className="relative"
							>
								<FiBriefcase className="absolute top-3 left-3 text-gray-400" />
								<select
									{...register("businessType", {
										required: "Selecione o ramo de negócio",
									})}
									className="w-full px-10 py-3 bg-deep/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none text-white"
								>
									<option value="">Selecione o ramo</option>
									{businessTypes.map((type) => (
										<option key={type} value={type}>
											{type}
										</option>
									))}
								</select>
							</motion.div>
							{errors.businessType && (
								<p className="mt-1 text-sm text-red-400">
									{errors.businessType.message as string}
								</p>
							)}
						</motion.div>
					</>
				);
			default:
				return null;
		}
	};

	const Progress = () => (
		<div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
			<div
				className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out"
				style={{ width: `${(step / 2) * 100}%` }}
			></div>
		</div>
	);

	if (isSubmitted) {
		return (
			<motion.div
				initial="initial"
				animate="in"
				exit="out"
				variants={pageVariants}
				transition={pageTransition}
				className="relative min-h-screen flex items-center justify-center overflow-hidden"
				id="trial-form"
			>
				<FloatingIcons />
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className="bg-deep/50 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-600 backdrop-blur-sm relative z-10"
				>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ type: "spring", stiffness: 500, damping: 30 }}
						className="text-green-400 text-6xl mb-4 flex justify-center"
					>
						<FiCheck />
					</motion.div>
					<h2 className="text-3xl font-bold mb-4 text-white text-center">
						Obrigado!
					</h2>
					<p className="text-gray-300 text-center">
						Recebemos sua solicitação para o teste gratuito. Entraremos em
						contato em breve!
					</p>
				</motion.div>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial="initial"
			animate="in"
			exit="out"
			variants={pageVariants}
			transition={pageTransition}
			className="relative min-h-screen flex items-center justify-center overflow-hidden"
		>
			<FloatingIcons />
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				className="relative bg-deep/50 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-600 backdrop-blur-sm z-10"
			>
				<Progress />
				<h2 className="text-3xl font-bold mb-6 text-center text-white">
					Solicite seu teste gratuito
				</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
					<div className="flex justify-between mt-8">
						{step > 1 && (
							<motion.button
								type="button"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setStep(step - 1)}
								className="px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center"
							>
								<FiArrowLeft className="mr-2" /> Voltar
							</motion.button>
						)}
						<motion.button
							type={step < 2 ? "button" : "submit"}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => step < 2 && setStep(step + 1)}
							className={`ml-auto px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center min-w-[200px] ${
								isLoading ? "cursor-not-allowed" : ""
							}`}
							disabled={isLoading}
							variants={buttonVariants}
							animate={isLoading ? "loading" : "default"}
						>
							<motion.span variants={buttonTextVariants}>
								{step < 2 ? (
									<>
										Próximo <FiArrowRight className="ml-2" />
									</>
								) : (
									"Solicitar Teste Gratuito"
								)}
							</motion.span>
							{isLoading && (
								<motion.div
									className="absolute flex"
									variants={loadingVariants}
									initial="loading"
									animate="loading"
								>
									{[...Array(3)].map((_, i) => (
										<motion.span
											key={i}
											className="w-2 h-2 bg-white rounded-full mx-1"
											variants={loadingCircleVariants}
										/>
									))}
								</motion.div>
							)}
						</motion.button>
					</div>
				</form>
				{submitError && (
					<p className="mt-4 text-red-500 text-center">{submitError}</p>
				)}
			</motion.div>
		</motion.div>
	);
}
