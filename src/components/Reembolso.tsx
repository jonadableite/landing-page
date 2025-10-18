// src/components/Reembolso.tsx
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  CreditCard,
  Gift,
  HelpCircle,
  Mail,
  RefreshCcw,
  Shield,
  XCircle,
} from 'lucide-react';

export default function Reembolso() {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-16 sm:py-24">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm">
                <CreditCard className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Política de Reembolso e Cancelamento
            </h1>
            <p className="mt-6 text-xl text-white/90">
              Transparência total sobre nossos termos e condições
            </p>
            {/* <p className="mt-4 text-sm text-white/70">
              Última atualização: {currentDate}
            </p> */}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 p-8 backdrop-blur-sm"
        >
          <div className="flex items-start gap-4">
            <Shield className="h-8 w-8 flex-shrink-0 text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Nosso Compromisso com Você
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Na <span className="font-semibold text-blue-400">WhatLead</span>, acreditamos em total transparência e na liberdade do usuário testar antes de assinar.
                Por isso, oferecemos <span className="font-semibold text-green-400">7 dias de teste gratuito</span> para que você explore todos os recursos da plataforma, sem compromisso e sem necessidade de pagamento imediato.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Grid de Seções */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Teste Gratuito */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl bg-gray-800/50 border border-gray-700 p-8 backdrop-blur-sm hover:border-green-500/50 transition-colors"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-3">
                <Gift className="h-6 w-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                💡 Sobre o Teste Gratuito
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Durante o período de teste, você tem <span className="font-semibold text-white">acesso completo à plataforma</span> para avaliar se a WhatLead atende às suas necessidades.
              </p>
              <p className="leading-relaxed">
                Ao efetivar a assinatura após o teste, entendemos que você conhece e aprova as funcionalidades oferecidas.
              </p>
              <div className="mt-6 rounded-lg bg-green-500/5 border border-green-500/20 p-4">
                <div className="flex items-center gap-2 text-green-400 font-semibold mb-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Benefícios do Teste</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    7 dias completos de acesso total
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    Sem necessidade de cartão de crédito
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    Cancelamento automático sem cobrança
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Política de Reembolso */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-2xl bg-gray-800/50 border border-gray-700 p-8 backdrop-blur-sm hover:border-blue-500/50 transition-colors"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-3">
                <CreditCard className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                💳 Política de Reembolso
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Após a assinatura de um plano pago (mensal, trimestral ou anual), <span className="font-semibold text-white">não realizamos reembolsos</span>, exceto em situações que atendam ao direito de arrependimento previsto no <span className="font-semibold text-blue-400">Art. 49 do Código de Defesa do Consumidor (CDC)</span>, que concede até <span className="font-semibold text-white">7 dias corridos</span> após a contratação para desistir da compra.
              </p>
              <div className="mt-6 rounded-lg bg-blue-500/5 border border-blue-500/20 p-4">
                <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                  <Clock className="h-5 w-5" />
                  <span>Direito de Arrependimento</span>
                </div>
                <p className="text-sm text-gray-300">
                  Caso o período de 7 dias já tenha sido ultrapassado, não será possível realizar reembolso, visto que o teste gratuito já foi disponibilizado previamente.
                </p>
              </div>
              <div className="mt-4 rounded-lg bg-red-500/5 border border-red-500/20 p-4">
                <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
                  <XCircle className="h-5 w-5" />
                  <span>Importante</span>
                </div>
                <p className="text-sm text-gray-300">
                  O teste gratuito é concedido antes de qualquer pagamento, portanto, ao assinar um plano, você já teve a oportunidade de avaliar completamente a plataforma.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Cancelamento de Planos */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="rounded-2xl bg-gray-800/50 border border-gray-700 p-8 backdrop-blur-sm hover:border-purple-500/50 transition-colors"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/10 p-3">
                <RefreshCcw className="h-6 w-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                🔁 Cancelamento de Planos
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                O usuário pode solicitar o <span className="font-semibold text-white">cancelamento da renovação automática a qualquer momento</span>, diretamente pelo painel da conta ou pelo nosso suporte.
              </p>
              <p className="leading-relaxed">
                O cancelamento interrompe cobranças futuras, mas <span className="font-semibold text-white">não gera reembolso</span> de valores já cobrados.
              </p>
              <div className="mt-6 rounded-lg bg-purple-500/5 border border-purple-500/20 p-4">
                <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Após o Cancelamento</span>
                </div>
                <p className="text-sm text-gray-300">
                  O acesso à conta permanecerá ativo até o final do ciclo de pagamento vigente. Você poderá usar normalmente todos os recursos até a data de vencimento.
                </p>
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-semibold text-white">Como Cancelar:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    Acesse o painel de configurações da sua conta
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    Entre em contato com nosso suporte
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    Envie um e-mail para suporte@whatlead.com.br
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Nosso Compromisso */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="rounded-2xl bg-gray-800/50 border border-gray-700 p-8 backdrop-blur-sm hover:border-indigo-500/50 transition-colors"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-indigo-500/10 p-3">
                <HelpCircle className="h-6 w-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                🤝 Nosso Compromisso
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Nosso objetivo é garantir que você tenha a <span className="font-semibold text-white">melhor experiência possível</span> com a WhatLead.
              </p>
              <p className="leading-relaxed">
                Se estiver enfrentando qualquer dificuldade, nossa equipe está sempre disponível para ajudar a ajustar sua conta ou otimizar seus resultados <span className="font-semibold text-white">antes de qualquer cancelamento</span>.
              </p>
              <div className="mt-6 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-6 w-6 text-indigo-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Entre em Contato</h3>
                    <p className="text-sm text-gray-400">Estamos aqui para ajudar</p>
                  </div>
                </div>
                <a
                  href="mailto:suporte@whatlead.com.br"
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-600 hover:scale-105"
                >
                  <Mail className="h-4 w-4" />
                  suporte@whatlead.com.br
                </a>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Resumo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-blue-500/30 p-8 backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            📋 Em Resumo
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-6 text-center">
              <Gift className="mx-auto h-10 w-10 text-green-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">🆓 7 Dias Grátis</h3>
              <p className="text-sm text-gray-300">
                Teste completo sem compromisso
              </p>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-6 text-center">
              <XCircle className="mx-auto h-10 w-10 text-red-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">❌ Sem Reembolso</h3>
              <p className="text-sm text-gray-300">
                Após assinatura (exceto 7 dias legais)
              </p>
            </div>
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-6 text-center">
              <RefreshCcw className="mx-auto h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">🔁 Cancelamento Livre</h3>
              <p className="text-sm text-gray-300">
                Sem novas cobranças futuras
              </p>
            </div>
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-6 text-center">
              <HelpCircle className="mx-auto h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">💬 Suporte Humano</h3>
              <p className="text-sm text-gray-300">
                Sempre disponível para ajudar
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            <details className="group rounded-xl bg-gray-800/50 border border-gray-700 p-6 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-white">
                <span>Posso testar antes de pagar?</span>
                <svg
                  className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-300">
                Sim! Oferecemos 7 dias de teste gratuito com acesso completo a todos os recursos da plataforma. Não é necessário cartão de crédito para começar.
              </p>
            </details>

            <details className="group rounded-xl bg-gray-800/50 border border-gray-700 p-6 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-white">
                <span>O que acontece após o período de teste?</span>
                <svg
                  className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-300">
                Após os 7 dias, se você não assinar um plano pago, sua conta será automaticamente cancelada sem nenhuma cobrança. Se decidir assinar, a cobrança será iniciada conforme o plano escolhido.
              </p>
            </details>

            <details className="group rounded-xl bg-gray-800/50 border border-gray-700 p-6 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-white">
                <span>Posso cancelar a qualquer momento?</span>
                <svg
                  className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-300">
                Sim, você pode cancelar sua assinatura a qualquer momento pelo painel da conta ou entrando em contato com nosso suporte. O cancelamento interrompe cobranças futuras, mas seu acesso permanece ativo até o fim do período pago.
              </p>
            </details>

            <details className="group rounded-xl bg-gray-800/50 border border-gray-700 p-6 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-white">
                <span>Há reembolso se eu não gostar?</span>
                <svg
                  className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-300">
                Como oferecemos 7 dias gratuitos para testar, não realizamos reembolsos após a assinatura, exceto dentro do prazo legal de 7 dias previsto no CDC. Nossa recomendação é testar completamente a plataforma durante o período gratuito antes de assinar.
              </p>
            </details>
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 text-center"
        >
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Teste gratuitamente por 7 dias e veja como a WhatLead pode transformar seu negócio
            </p>
            <a
              href="https://app.whatlead.com.br"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 transition-all hover:bg-gray-100 hover:scale-105"
            >
              <Gift className="h-5 w-5" />
              Começar Teste Gratuito
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

