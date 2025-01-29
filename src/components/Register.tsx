import Logo from "@/components/Logo";
import axios, { isAxiosError } from "axios";
import { motion } from "framer-motion";
import { AtSignIcon, LockIcon, UserIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MatrixRain from "../components/MatrixRain";

const Register: React.FC = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	// Captura o priceId da URL
	const params = new URLSearchParams(window.location.search);
	const priceId = params.get("priceId");

	// Simula os dados do plano com base no priceId
	const getPlanDetails = (priceId: string | null) => {
		const plans = {
			price_1QkGgDP7kXKQS2swZkrUAQF9: {
				plan: "basic",
				price: 89.0,
				billingCycle: "monthly",
			},
			price_1QkGgDP7kXKQS2swZkrUAQF8: {
				plan: "pro",
				price: 119.0,
				billingCycle: "monthly",
			},
			price_1QkGgDP7kXKQS2swZkrUAQF7: {
				plan: "enterprise",
				price: 199.0,
				billingCycle: "monthly",
			},
		};

		return (
			plans[priceId || ""] || {
				plan: "unknown",
				price: 0,
				billingCycle: "unknown",
			}
		);
	};

	// Valida o formulário
	const validateForm = () => {
		if (password !== confirmPassword) {
			setError("As senhas não coincidem. Tente novamente.");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		if (!validateForm()) {
			setIsLoading(false);
			return;
		}

		try {
			console.log("Iniciando registro do usuário...");
			const registerResponse = await axios.post<{
				token: string;
				user: any;
				companyId: string;
			}>("http://localhost:9000/api/users/register", {
				name,
				email,
				password,
			});

			console.log("Resposta do registro:", registerResponse);

			if (registerResponse.status === 201) {
				const { token, user, companyId } = registerResponse.data;

				// Salva o token no localStorage
				localStorage.setItem("token", token);

				// Salva os dados do usuário (se necessário)
				localStorage.setItem("user", JSON.stringify(user));

				// Obtém os detalhes do plano com base no priceId
				const planDetails = getPlanDetails(priceId);

				// Redireciona para a página de boas-vindas com os dados do plano
				navigate("/welcome", {
					state: {
						priceId,
						plan: planDetails.plan,
						price: planDetails.price,
						billingCycle: planDetails.billingCycle,
						user,
						companyId,
					},
				});
			}
		} catch (err) {
			console.error("Erro durante o registro:", err);
			if (isAxiosError(err)) {
				if (err.response?.status === 409) {
					setError("E-mail já cadastrado. Tente fazer login.");
				} else if (err.response?.status === 400) {
					setError("Dados inválidos. Verifique os campos e tente novamente.");
				} else {
					setError(
						err.response?.data?.error ||
							"Erro ao registrar usuário. Tente novamente.",
					);
				}
			} else {
				setError("Erro ao registrar usuário. Tente novamente.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-whatsapp-profundo via-black to-whatsapp-green/5 flex items-center justify-center px-4 py-8 overflow-hidden">
			<MatrixRain />
			<div className="absolute inset-0 bg-gradient-to-r from-whatsapp-green/5 to-whatsapp-profundo/20 blur-3xl animate-pulse" />
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, type: "spring" }}
				className="relative z-10 w-full max-w-md bg-whatsapp-profundo/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-whatsapp-prata/30 p-8"
			>
				<div className="flex flex-col items-center text-center mb-8">
					<Logo variant="default" className="mb-4" />
					<p className="text-gray-400">Crie sua conta e comece sua jornada</p>
				</div>

				{error && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl mb-6 text-center"
					>
						{error}
					</motion.div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<UserIcon className="text-gray-500" size={20} />
						</div>
						<input
							type="text"
							placeholder="Nome completo"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-whatsapp-dark transition duration-300"
							required
						/>
					</div>

					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<AtSignIcon className="text-gray-500" size={20} />
						</div>
						<input
							type="email"
							placeholder="Seu melhor email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-whatsapp-dark transition duration-300"
							required
						/>
					</div>

					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<LockIcon className="text-gray-500" size={20} />
						</div>
						<input
							type="password"
							placeholder="Senha"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-whatsapp-dark transition duration-300"
							required
						/>
					</div>

					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<LockIcon className="text-gray-500" size={20} />
						</div>
						<input
							type="password"
							placeholder="Confirmar Senha"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-whatsapp-dark transition duration-300"
							required
						/>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className={`w-full py-3 bg-gradient-to-r from-whatsapp-green/30 to-whatsapp-green text-white rounded-xl
              hover:from-whatsapp-dark hover:to-whatsapp-profundo transition duration-300
              transform hover:scale-105 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
					>
						{isLoading ? (
							<div className="flex items-center justify-center">
								<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
								Registrando...
							</div>
						) : (
							"Criar Conta"
						)}
					</button>

					<div className="text-center mt-6">
						<p className="text-gray-400">
							Já tem uma conta?{" "}
							<Link
								to="/login"
								className="text-whatsapp-green hover:text-whatsapp-dark font-bold"
							>
								Faça login
							</Link>
						</p>
					</div>
				</form>
			</motion.div>
			<div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-900/30 to-transparent pointer-events-none" />
		</div>
	);
};

export default Register;
