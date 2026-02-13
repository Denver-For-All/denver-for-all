import React, { useRef, useState, useCallback } from 'react';
import { toPng } from 'html-to-image';

const C = {
  primary: '#0D7377',
  primaryDark: '#095456',
  primaryLight: '#7DD3C0',
  secondary: '#1E5FA6',
  accent: '#D4A843',
  danger: '#C0392B',
  text: '#1A2332',
  textMuted: '#5A6978',
  bgAlt: '#F0F4F5',
  border: '#D8DEE4',
  white: '#FFFFFF',
};

const THEME_MAP: Record<string, { color: string; bg: string; border: string }> = {
  danger: { color: C.danger, bg: '#FDF2F2', border: C.danger },
  primary: { color: C.primary, bg: '#EDF7F7', border: C.primary },
  secondary: { color: C.secondary, bg: '#EEF3FA', border: C.secondary },
  accent: { color: C.accent, bg: '#FFFBF0', border: C.accent },
};

export interface StatItem {
  value: string;
  label: string;
  labelEs?: string;
  context?: string;
  contextEs?: string;
  source?: string;
  sourceEs?: string;
  theme?: 'danger' | 'primary' | 'secondary' | 'accent';
}

interface Props {
  stats: StatItem[];
  policyTitle: string;
  policyTitleEs?: string;
  policySlug: string;
  locale?: 'en' | 'es';
}

function ShareOverlay({
  onClose,
  onTwitter,
  onFacebook,
  onDownload,
  onNativeShare,
  onCopyLink,
  hasNativeShare,
  locale,
}: {
  onClose: () => void;
  onTwitter: () => void;
  onFacebook: () => void;
  onDownload: () => void;
  onNativeShare: () => void;
  onCopyLink: () => void;
  hasNativeShare: boolean;
  locale: string;
}) {
  const t = locale === 'es';
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: C.white,
          borderRadius: 16,
          padding: '2rem',
          maxWidth: 360,
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: C.text,
            marginBottom: '1.25rem',
            fontFamily: 'Inter, system-ui, sans-serif',
            textAlign: 'center',
          }}
        >
          {t ? 'Compartir esta estadistica' : 'Share this stat'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {hasNativeShare && (
            <ShareButton
              onClick={onNativeShare}
              icon="&#x1F4E4;"
              label={t ? 'Compartir...' : 'Share...'}
              bg={C.primary}
            />
          )}
          <ShareButton
            onClick={onTwitter}
            icon="&#x1D54F;"
            label={t ? 'Publicar en X / Twitter' : 'Post on X / Twitter'}
            bg="#000000"
          />
          <ShareButton
            onClick={onFacebook}
            icon="f"
            label={t ? 'Compartir en Facebook' : 'Share on Facebook'}
            bg="#1877F2"
          />
          <ShareButton
            onClick={onDownload}
            icon="&#x2B07;"
            label={t ? 'Descargar imagen' : 'Download image'}
            bg={C.secondary}
          />
          <ShareButton
            onClick={onCopyLink}
            icon="&#x1F517;"
            label={t ? 'Copiar enlace' : 'Copy link'}
            bg={C.textMuted}
          />
        </div>
        <button
          onClick={onClose}
          style={{
            display: 'block',
            margin: '1.25rem auto 0',
            background: 'none',
            border: 'none',
            color: C.textMuted,
            fontSize: '0.85rem',
            cursor: 'pointer',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {t ? 'Cancelar' : 'Cancel'}
        </button>
      </div>
    </div>
  );
}

function ShareButton({
  onClick,
  icon,
  label,
  bg,
}: {
  onClick: () => void;
  icon: string;
  label: string;
  bg: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        width: '100%',
        padding: '0.75rem 1rem',
        background: bg,
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: 600,
        fontFamily: 'Inter, system-ui, sans-serif',
        transition: 'opacity 0.2s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
      onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
    >
      <span style={{ fontSize: '1.1rem', width: 24, textAlign: 'center' }}>{icon}</span>
      {label}
    </button>
  );
}

function StatCard({
  stat,
  policyTitle: _policyTitle,
  policySlug,
  locale,
  onShare,
  cardRef,
}: {
  stat: StatItem;
  policyTitle: string;
  policySlug: string;
  locale: string;
  onShare: () => void;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) {
  const theme = THEME_MAP[stat.theme || 'primary'];
  const label = locale === 'es' && stat.labelEs ? stat.labelEs : stat.label;
  const context = locale === 'es' && stat.contextEs ? stat.contextEs : stat.context;
  const source = locale === 'es' && stat.sourceEs ? stat.sourceEs : stat.source;

  return (
    <div style={{ position: 'relative' }}>
      {/* The capturable card */}
      <div
        ref={cardRef}
        style={{
          background: C.white,
          borderRadius: 16,
          border: `2px solid ${theme.border}`,
          overflow: 'hidden',
        }}
      >
        {/* Colored top bar */}
        <div
          style={{
            height: 6,
            background: `linear-gradient(90deg, ${theme.color}, ${theme.color}88)`,
          }}
        />

        <div style={{ padding: '1.75rem 1.5rem 1.25rem' }}>
          {/* Big stat value */}
          <div
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
              fontWeight: 800,
              color: theme.color,
              lineHeight: 1,
              fontFamily: 'Inter, system-ui, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            {stat.value}
          </div>

          {/* Label */}
          <div
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: C.text,
              marginTop: '0.5rem',
              lineHeight: 1.4,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            {label}
          </div>

          {/* Context */}
          {context && (
            <div
              style={{
                fontSize: '0.85rem',
                color: C.textMuted,
                marginTop: '0.5rem',
                lineHeight: 1.5,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              {context}
            </div>
          )}

          {/* Source */}
          {source && (
            <div
              style={{
                fontSize: '0.7rem',
                color: C.textMuted,
                marginTop: '0.75rem',
                fontStyle: 'italic',
                fontFamily: 'Inter, system-ui, sans-serif',
                opacity: 0.7,
              }}
            >
              {source}
            </div>
          )}

          {/* Branding footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '1rem',
              paddingTop: '0.75rem',
              borderTop: `1px solid ${C.border}`,
            }}
          >
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: C.primary,
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.02em',
              }}
            >
              DENVER FOR ALL
            </span>
            <span
              style={{
                fontSize: '0.65rem',
                color: C.textMuted,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              denverforall.org/platform/{policySlug}
            </span>
          </div>
        </div>
      </div>

      {/* Share button - outside the captured area */}
      <button
        onClick={onShare}
        aria-label={locale === 'es' ? 'Compartir estadistica' : 'Share stat'}
        style={{
          position: 'absolute',
          top: 16,
          right: 12,
          background: C.white,
          border: `1.5px solid ${C.border}`,
          borderRadius: 8,
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
          fontSize: '1rem',
          color: C.textMuted,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = C.primary;
          e.currentTarget.style.color = C.primary;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = C.border;
          e.currentTarget.style.color = C.textMuted;
        }}
      >
        &#x2197;
      </button>
    </div>
  );
}

export default function ShareableStatCard({
  stats,
  policyTitle,
  policyTitleEs,
  policySlug,
  locale = 'en',
}: Props) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [shareIndex, setShareIndex] = useState<number | null>(null);
  const [_copyFeedback, _setCopyFeedback] = useState(false);

  const siteUrl = 'https://denverforall.org';
  const policyUrl = `${siteUrl}/platform/${policySlug}`;
  const title = locale === 'es' && policyTitleEs ? policyTitleEs : policyTitle;

  const generateImage = useCallback(async (index: number): Promise<Blob | null> => {
    const node = cardRefs.current[index];
    if (!node) return null;
    try {
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        backgroundColor: C.white,
      });
      const res = await fetch(dataUrl);
      return await res.blob();
    } catch {
      return null;
    }
  }, []);

  const getShareText = useCallback(
    (index: number) => {
      const stat = stats[index];
      const label = locale === 'es' && stat.labelEs ? stat.labelEs : stat.label;
      return `${stat.value} — ${label}\n\n${policyUrl}`;
    },
    [stats, locale, policyUrl],
  );

  const handleTwitter = useCallback(
    async (index: number) => {
      const stat = stats[index];
      const label = locale === 'es' && stat.labelEs ? stat.labelEs : stat.label;
      const text = encodeURIComponent(`${stat.value} — ${label}`);
      const url = encodeURIComponent(policyUrl);
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        '_blank',
        'noopener,width=600,height=400',
      );
      setShareIndex(null);
    },
    [stats, locale, policyUrl],
  );

  const handleFacebook = useCallback(
    (_index: number) => {
      const url = encodeURIComponent(policyUrl);
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        '_blank',
        'noopener,width=600,height=400',
      );
      setShareIndex(null);
    },
    [policyUrl],
  );

  const handleDownload = useCallback(
    async (index: number) => {
      const blob = await generateImage(index);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `denver-for-all-${policySlug}-stat-${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setShareIndex(null);
    },
    [generateImage, policySlug],
  );

  const handleNativeShare = useCallback(
    async (index: number) => {
      const blob = await generateImage(index);
      const text = getShareText(index);
      try {
        if (
          blob &&
          navigator.canShare?.({ files: [new File([blob], 'stat.png', { type: 'image/png' })] })
        ) {
          const file = new File([blob], `denver-for-all-stat.png`, { type: 'image/png' });
          await navigator.share({ text, url: policyUrl, files: [file] });
        } else {
          await navigator.share({ text, url: policyUrl });
        }
      } catch {
        // User cancelled or share failed
      }
      setShareIndex(null);
    },
    [generateImage, getShareText, policyUrl],
  );

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(policyUrl);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch {
      // Clipboard unavailable
    }
    setShareIndex(null);
  }, [policyUrl]);

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  if (!stats || stats.length === 0) return null;

  const t = locale === 'es';

  return (
    <div className="shareable-stats">
      <h2 className="shareable-stats__heading" data-en="Key Numbers" data-es="Cifras Clave">
        {t ? 'Cifras Clave' : 'Key Numbers'}
      </h2>
      <p
        className="shareable-stats__subheading"
        data-en="Tap the share icon to spread the word"
        data-es="Toca el icono de compartir para difundir"
      >
        {t ? 'Toca el icono de compartir para difundir' : 'Tap the share icon to spread the word'}
      </p>

      <div className="shareable-stats__grid">
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            stat={stat}
            policyTitle={title}
            policySlug={policySlug}
            locale={locale}
            onShare={() => setShareIndex(i)}
            cardRef={(el) => {
              cardRefs.current[i] = el;
            }}
          />
        ))}
      </div>

      {shareIndex !== null && (
        <ShareOverlay
          onClose={() => setShareIndex(null)}
          onTwitter={() => handleTwitter(shareIndex)}
          onFacebook={() => handleFacebook(shareIndex)}
          onDownload={() => handleDownload(shareIndex)}
          onNativeShare={() => handleNativeShare(shareIndex)}
          onCopyLink={handleCopyLink}
          hasNativeShare={hasNativeShare}
          locale={locale}
        />
      )}
    </div>
  );
}
