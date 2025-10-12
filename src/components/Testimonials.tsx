/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

import { motion } from "framer-motion";
import type React from "react";
import { FiStar } from "react-icons/fi";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

// Importar as imagens
import carlosImage from "@/assets/avatar-1.jpg";
import anaImage from "@/assets/avatar-2.jpg";
import robertoImage from "@/assets/avatar-3.jpg";

interface Testimonial {
	id: number;
	name: string;
	role: string;
	company: string;
	image: string;
	quote: string;
	rating: number;
}

const testimonials: Testimonial[] = [
	{
		id: 1,
		name: "Carlos Silva",
		role: "CEO",
		company: "TechInova",
		image: carlosImage,
		quote:
			"A plataforma anti-ban do WhatLead aumentou nossas conversões via WhatsApp em 387%. Nunca mais tivemos problemas de bloqueio!",
		rating: 5,
	},
	{
		id: 2,
		name: "Ana Ferreira",
		role: "Diretora de Marketing",
		company: "GlobalShop",
		image: anaImage,
		quote:
			"Os relatórios em tempo real das mensagens WhatsApp nos deram controle total das campanhas. ROI aumentou 250%!",
		rating: 5,
	},
	{
		id: 3,
		name: "Roberto Mendes",
		role: "Proprietário",
		company: "Café Aroma",
		image: robertoImage,
		quote:
			"A IA para WhatsApp automatizou completamente nossas vendas. Como pequeno empresário, isso mudou minha vida!",
		rating: 5,
	},
	{
		id: 4,
		name: "Marina Costa",
		role: "Gerente de E-commerce",
		company: "Fashion Store",
		image: carlosImage,
		quote:
			"Automação completa para e-commerce via WhatsApp. Vendas automáticas 24/7 sem risco de banimento. Incrível!",
		rating: 5,
	},
	{
		id: 5,
		name: "Pedro Santos",
		role: "Diretor",
		company: "Agência Digital Pro",
		image: anaImage,
		quote:
			"Como agência, o WhatLead nos permitiu oferecer WhatsApp marketing profissional para todos os clientes. Ferramenta essencial!",
		rating: 5,
	},
	{
		id: 6,
		name: "Juliana Lima",
		role: "Coordenadora",
		company: "Loja Virtual Plus",
		image: robertoImage,
		quote:
			"A taxa de entrega das mensagens aumentou 90% com a plataforma anti-ban. Conversões via WhatsApp dispararam!",
		rating: 5,
	},
	{
		id: 7,
		name: "Ricardo Oliveira",
		role: "Fundador",
		company: "StartupTech",
		image: carlosImage,
		quote:
			"Relatórios detalhados das mensagens WhatsApp nos ajudaram a otimizar cada campanha. Resultados impressionantes!",
		rating: 5,
	},
	{
		id: 8,
		name: "Camila Rodrigues",
		role: "CMO",
		company: "MegaVendas",
		image: anaImage,
		quote:
			"A ferramenta de IA para WhatsApp responde clientes automaticamente. Aumentamos vendas em 400% sem contratar mais pessoas!",
		rating: 5,
	},
	{
		id: 9,
		name: "Fernando Alves",
		role: "Proprietário",
		company: "Eletrônicos BR",
		image: robertoImage,
		quote:
			"WhatsApp marketing nunca foi tão fácil! A automação completa para e-commerces é exatamente o que precisávamos.",
		rating: 5,
	},
	{
		id: 10,
		name: "Luciana Martins",
		role: "Diretora Comercial",
		company: "VendaMais",
		image: carlosImage,
		quote:
			"Triplicamos as vendas via WhatsApp em 2 meses. A plataforma anti-ban é revolucionária para o e-commerce!",
		rating: 5,
	},
	{
		id: 11,
		name: "Gabriel Souza",
		role: "Proprietário",
		company: "InfoTech Solutions",
		image: anaImage,
		quote:
			"A automação de mensagens WhatsApp liberou nossa equipe para focar em vendas. Produtividade aumentou 300%!",
		rating: 5,
	},
	{
		id: 12,
		name: "Patrícia Rocha",
		role: "Gerente",
		company: "Moda & Estilo",
		image: robertoImage,
		quote:
			"Nunca mais perdemos clientes por mensagens não entregues. A taxa de conversão via WhatsApp subiu 180%!",
		rating: 5,
	},
];

// Dividir depoimentos em 2 colunas como no exemplo
const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
	return (
		<figure
			className={cn(
				"relative h-full w-fit cursor-pointer overflow-hidden rounded-xl border p-4 sm:w-64",
				// light styles
				"border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
				// dark styles
				"dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
			)}
		>
			{/* Rating Stars */}
			<div className="flex items-center mb-3">
				{[...Array(testimonial.rating)].map((_, i) => (
					<FiStar key={i} className="text-yellow-400 text-sm mr-1" />
				))}
			</div>

			{/* Author Info */}
			<div className="flex flex-row items-center gap-2 mb-3">
				<img
					src={testimonial.image}
					alt={testimonial.name}
					className="rounded-full"
					width="32"
					height="32"
				/>
				<div className="flex flex-col">
					<figcaption className="text-sm font-medium dark:text-white">
						{testimonial.name}
					</figcaption>
					<p className="text-xs font-medium dark:text-white/40">
						{testimonial.role} • {testimonial.company}
					</p>
				</div>
			</div>

			{/* Quote */}
			<blockquote className="text-sm leading-relaxed dark:text-white">
				"{testimonial.quote}"
			</blockquote>
		</figure>
	);
};

export function MarqueeDemoVertical() {
	return (
		<div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden">
			<Marquee pauseOnHover vertical className="[--duration:20s]">
				{firstRow.map((testimonial) => (
					<TestimonialCard key={testimonial.id} testimonial={testimonial} />
				))}
			</Marquee>
			<Marquee reverse pauseOnHover vertical className="[--duration:20s]">
				{secondRow.map((testimonial) => (
					<TestimonialCard key={testimonial.id} testimonial={testimonial} />
				))}
			</Marquee>
			<div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
		</div>
	);
}

const Testimonials: React.FC = () => {
	return (
		<section className="relative py-24 overflow-hidden">
			<div className="container mx-auto px-4 relative z-10">
				{/* Header */}
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<motion.span
						className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						viewport={{ once: true }}
					>
						Depoimentos Reais
					</motion.span>
					<h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
						Resultados{" "}
						<span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
							Comprovados
						</span>
					</h2>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto">
						Veja como empresas aumentaram conversões via WhatsApp com nossa plataforma anti-ban
					</p>
				</motion.div>

				{/* Marquee Testimonials */}
				<MarqueeDemoVertical />

				{/* Call to Action */}
				<motion.div
					className="text-center mt-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					viewport={{ once: true }}
				>
					<p className="text-gray-400 mb-6">
						Junte-se a mais de <span className="text-primary font-bold">15.000+ empresas</span> que confiam no WhatLead
					</p>
					<motion.button
						className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Começar Teste Grátis Agora
					</motion.button>
				</motion.div>
			</div>
		</section>
	);
};

export default Testimonials;
