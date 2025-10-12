/**
 * @copyright 2025 jonadab-whatlead
 *  @license Apache-2.0
 */

/**
 * Types
 */
import type { MenuItem } from "@/types";

/**
 * Assets
 */

import {
	ArrowBigDownDash,
	BarChart2,
	Blocks,
	BookOpen,
	Calendar,
	ChartPie,
	Code,
	CreditCard,
	Files,
	GitFork,
	Github,
	HelpCircle,
	Instagram,
	LaptopMinimal,
	Layers,
	Linkedin,
	MessageSquareMore,
	Send,
	Twitter,
	UserRoundPen,
	Users,
	Youtube,
	Zap,
} from "lucide-react";

import {
	avatar1,
	avatar2,
	avatar3,
	blog1,
	blog2,
	blog3,
	feature1,
	feature2,
} from "@/assets";

// Header
export const navMenu: MenuItem[] = [
	{
		href: "/products",
		label: "Produtos",
		submenu: [
			{
				href: "#",
				icon: <Send />,
				label: "Disparos em Massa",
				desc: "Envie mensagens para múltiplos contatos de forma eficiente e segura",
			},
			{
				href: "#",
				icon: <Zap />,
				label: "Aquecimento de WhatsApp",
				desc: "Evite banimentos e mantenha sua conta saudável",
			},
			{
				href: "#",
				icon: <MessageSquareMore />,
				label: "Chatbot com IA",
				desc: "Automatize suas conversas com inteligência artificial avançada",
			},
			{
				href: "#",
				icon: <BarChart2 />,
				label: "Análise de Dados",
				desc: "Insights detalhados sobre seus disparos e aquecimentos",
			},
			{
				href: "#",
				icon: <Calendar />,
				label: "Agendamentos",
				desc: "Planeje e agende suas campanhas com antecedência",
			},
			{
				href: "#",
				icon: <Users />,
				label: "CRM e Gerenciamento de Leads",
				desc: "Gerencie seus contatos e oportunidades de negócio",
			},
		],
	},
	{
		href: "/features",
		label: "Recursos",
	},
	{
		href: "/docs",
		label: "Documentação",
		submenu: [
			{
				href: "#",
				icon: <BookOpen />,
				label: "Guia de Início Rápido",
				desc: "Comece a usar nossa plataforma em minutos",
			},
			{
				href: "#",
				icon: <Layers />,
				label: "Tutoriais Avançados",
				desc: "Aprenda a utilizar recursos avançados para maximizar seus resultados",
			},
			{
				href: "#",
				icon: <Code />,
				label: "API e Integrações",
				desc: "Documentação completa da API e guias de integração",
			},
			{
				href: "#",
				icon: <HelpCircle />,
				label: "FAQ e Suporte",
				desc: "Respostas para perguntas frequentes e canais de suporte",
			},
		],
	},
	{
		href: "/pricing",
		label: "Preços",
	},
];

// Hero
export const heroData = {
	sectionSubtitle: "Plataforma Anti-Ban WhatsApp Marketing",
	sectionTitle: "Aumente suas conversões via WhatsApp com ",
	decoTitle: "segurança total",
	sectionText:
		"Plataforma completa para vendas automáticas no WhatsApp: Aumente sua taxa de entrega, reduza bloqueios de contas e tenha controle total das campanhas com nossa ferramenta com IA e segmentação inteligente.",
};

// Feature
export const featureData = {
	sectionSubtitle: "Recursos Anti-Ban",
	sectionTitle: "Automação Completa para E-commerces no WhatsApp",
	sectionText:
		"Plataforma com IA para WhatsApp que oferece disparo com segurança e escala, relatórios de mensagens detalhados e suporte especializado para agências de marketing.",
	features: [
		{
			icon: "🚀",
			title: "Disparos com Segurança e Escala",
			text: "Sistema anti-ban que protege suas contas WhatsApp enquanto permite disparos em massa com alta taxa de entrega.",
		},
		{
			icon: "📊",
			title: "Relatórios e Métricas Reais",
			text: "Acompanhe suas campanhas com relatórios detalhados de mensagens WhatsApp e métricas de conversão em tempo real.",
		},
		{
			icon: "🤖",
			title: "Ferramenta com IA para WhatsApp",
			text: "Inteligência artificial avançada para segmentação inteligente e automação completa de suas campanhas.",
		},
		{
			icon: "🛡️",
			title: "Controle Total das Campanhas",
			text: "Tenha controle absoluto sobre suas campanhas WhatsApp com nossa plataforma anti-ban e sistema de aquecimento.",
		},
		{
			icon: "📈",
			title: "Aumento de Conversões via WhatsApp",
			text: "Estratégias comprovadas para aumentar suas vendas automáticas no WhatsApp e melhorar sua taxa de conversão.",
		},
		{
			icon: "🎯",
			title: "WhatsApp Marketing para Agências",
			text: "Solução completa para agências com suporte e onboarding especializado, ideal para gerenciar múltiplos clientes.",
		},
	],
};

// Process
export const processData = {
	sectionSubtitle: "Como funciona",
	sectionTitle: "Processo Fácil para Começar",
	sectionText:
		"Descubra como funciona alavancando algoritmos avançados e técnicas de análise de dados.",
	list: [
		{
			icon: <LaptopMinimal size={32} />,
			title: "Crie sua conta",
			text: "Junte-se a nós agora e crie sua conta para começar a explorar nossa plataforma e desbloquear recursos empolgantes.",
		},
		{
			icon: <ArrowBigDownDash size={32} />,
			title: "Instale nosso aplicativo de rastreamento",
			text: "Instale nosso aplicativo de rastreamento para monitorar e gerenciar suas atividades sem esforço, obtendo insights valiosos e otimizando seu desempenho.",
		},
		{
			icon: <CreditCard size={32} />,
			title: "Comece a rastrear seu site",
			text: "Comece a rastrear seu site sem esforço para obter insights valiosos sobre o comportamento do visitante, métricas de desempenho e oportunidades de otimização.",
		},
	],
};

// Overview
export const overviewData = {
	sectionSubtitle: "Visão Geral",
	sectionTitle: "Ferramenta de Análise Tudo-em-Um",
	sectionText:
		"Análise poderosa facilitada. Tome decisões baseadas em dados com nossa ferramenta tudo-em-um.",
	listTitle: "Mais de 1M+ de pessoas ao redor do mundo já estão usando",
	list: [
		{
			title: "1M+",
			text: "Downloads Ativos",
		},
		{
			title: "4,86",
			text: "Avaliação Média",
		},
		{
			title: "60K+",
			text: "Usuários Ativos",
		},
	],
};

// Review
export const reviewData = {
	sectionSubtitle: "Avaliações",
	sectionTitle: "O Que Nossos Clientes Estão Dizendo",
	reviewCard: [
		{
			title:
				"Estamos construindo um aplicativo melhor agora, graças ao AnalytiX.",
			text: "Nosso aplicativo está passando por melhorias significativas com a ajuda do NioLand, resultando em funcionalidade aprimorada, experiência do usuário melhorada",
			reviewAuthor: "Wade Warren",
			date: "3 meses atrás",
		},
		{
			title: "Ótimo Serviço de um sistema de suporte especializado do AnalytiX",
			text: "Experimente serviço e suporte excepcionais da equipe especializada do AnalytiX, dedicada a fornecer assistência conhecedora e garantir uma experiência perfeita",
			reviewAuthor: "Dianne Russell",
			date: "3 meses atrás",
		},
		{
			title: "O preço é incrível para pequenas empresas ao redor do mundo",
			text: "Nossos preços são adaptados para atender às necessidades de pequenas empresas em todo o mundo, oferecendo taxas acessíveis e competitivas que proporcionam excelente valor para",
			reviewAuthor: "Marvin McKinney",
			date: "3 meses atrás",
		},
	],
};

// Blog
export const blogData = {
	sectionSubtitle: "Nosso Blog",
	sectionTitle: "Centro de Recursos",
	sectionText:
		"Desbloqueie o potencial do nosso centro de recursos, acessando informações e insights valiosos para o crescimento do seu negócio.",
	blogs: [
		{
			imgSrc: blog1,
			badge: "Crescimento",
			title:
				"Por que a retenção de clientes é a estratégia de crescimento definitiva?",
			author: {
				avatarSrc: avatar1,
				authorName: "John Carte",
				publishDate: "10 de Out, 2024",
				readingTime: "8 min de leitura",
			},
		},
		{
			imgSrc: blog2,
			badge: "Marketing",
			title: "Otimizando suas campanhas publicitárias para maior ROAS",
			author: {
				avatarSrc: avatar2,
				authorName: "Annette Black",
				publishDate: "15 de Jul, 2024",
				readingTime: "5 min de leitura",
			},
		},
		{
			imgSrc: blog3,
			badge: "Crescimento",
			title:
				"Como construir o conjunto de tecnologias definitivo para crescimento",
			author: {
				avatarSrc: avatar3,
				authorName: "Ralph Edwards",
				publishDate: "24 de Mar, 2024",
				readingTime: "2 min de leitura",
			},
		},
	],
};

// Cta
export const ctaData = {
	text: "Comece a aumentar suas conversões via WhatsApp com nossa plataforma anti-ban e automação completa",
};

// Footer
export const footerData = {
	links: [
		{
			title: "Produto",
			items: [
				{
					href: "#",
					label: "Componentes",
				},
				{
					href: "#",
					label: "Preços",
				},
				{
					href: "#",
					label: "Painel",
				},
				{
					href: "#",
					label: "Solicitações de recursos",
				},
			],
		},
		{
			title: "Desenvolvedores",
			items: [
				{
					href: "#",
					label: "Documentação",
				},
				{
					href: "#",
					label: "Servidor Discord",
				},
				{
					href: "#",
					label: "Suporte",
				},
				{
					href: "#",
					label: "Glossário",
				},
				{
					href: "#",
					label: "Registro de mudanças",
				},
			],
		},
		{
			title: "Empresa",
			items: [
				{
					href: "#",
					label: "Sobre",
				},
				{
					href: "#",
					label: "Carreiras",
				},
				{
					href: "#",
					label: "Blog",
				},
				{
					href: "#",
					label: "Contato",
				},
			],
		},
		{
			title: "Legal",
			items: [
				{
					href: "#",
					label: "Termos e Condições",
				},
				{
					href: "#",
					label: "Política de Privacidade",
				},
				{
					href: "#",
					label: "Acordo de Processamento de Dados",
				},
				{
					href: "#",
					label: "Gerenciador de cookies",
				},
			],
		},
	],
	copyright: "© 2025, WhatLead. Todos os direitos reservados.",
	socialLinks: [
		{
			href: "https://x.com/codewithsadee_",
			icon: <Twitter size={18} />,
		},
		{
			href: "https://github.com/codewithsadee",
			icon: <Github size={18} />,
		},
		{
			href: "https://www.linkedin.com/in/codewithsadee/",
			icon: <Linkedin size={18} />,
		},
		{
			href: "https://www.instagram.com/codewithsadee",
			icon: <Instagram size={18} />,
		},
		{
			href: "https://www.youtube.com/codewithsadee",
			icon: <Youtube size={18} />,
		},
	],
};
