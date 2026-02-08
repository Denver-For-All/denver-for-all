import { VapiWidget } from '@vapi-ai/client-sdk-react';
import { useLocale } from './sidewalk-data/useLocale';

const ASSISTANT_ID = 'cc8bd3ab-fa8e-4f15-b327-fc8e8098405a';
const PUBLIC_KEY = '681f6772-b3b2-4ab1-a90b-81670bc5ed31';

const translations = {
  en: {
    title: 'Tenant Rights Assistant',
    chatFirstMessage: "Hi! I'm the Denver For All tenant rights assistant. I can help you understand your rights as a Denver renter. Ask me about eviction, repairs, deposits, discrimination, or anything else.",
    chatPlaceholder: 'Type your question...',
    startButtonText: 'Call to Talk',
    endButtonText: 'End Call',
    ctaTitle: 'Tenant Rights',
    ctaSubtitle: 'Chat or Call',
  },
  es: {
    title: 'Asistente de Derechos del Inquilino',
    chatFirstMessage: '¡Hola! Soy el asistente de derechos del inquilino de Denver Para Todos. Puedo ayudarte a entender tus derechos como inquilino en Denver. Pregúntame sobre desalojos, reparaciones, depósitos, discriminación o cualquier otra cosa.',
    chatPlaceholder: 'Escribe tu pregunta...',
    startButtonText: 'Llamar para Hablar',
    endButtonText: 'Terminar Llamada',
    ctaTitle: 'Derechos del Inquilino',
    ctaSubtitle: 'Chat o Llamada',
  },
};

export default function TenantRightsChat() {
  const locale = useLocale();
  const t = translations[locale];

  return (
    <VapiWidget
      publicKey={PUBLIC_KEY}
      assistantId={ASSISTANT_ID}
      mode="hybrid"
      theme="light"
      size="full"
      borderRadius="large"
      accentColor="#0D7377"
      title={t.title}
      chatFirstMessage={t.chatFirstMessage}
      chatPlaceholder={t.chatPlaceholder}
      startButtonText={t.startButtonText}
      endButtonText={t.endButtonText}
      ctaTitle={t.ctaTitle}
      ctaSubtitle={t.ctaSubtitle}
    />
  );
}
