// Portfolio Tweaks — wires up theme + accent + display name

const { useEffect } = React;
const TWEAK_DEFAULTS = window.__TWEAK_DEFAULTS;

function pickContrast(hex) {
  const h = hex.replace('#','');
  const r = parseInt(h.substr(0,2),16);
  const g = parseInt(h.substr(2,2),16);
  const b = parseInt(h.substr(4,2),16);
  const luma = (0.299*r + 0.587*g + 0.114*b) / 255;
  return luma > 0.6 ? '#111111' : '#ffffff';
}

function applyTweaks(t) {
  const root = document.documentElement;
  if (t.theme === 'warm') root.setAttribute('data-theme', 'warm');
  else if (t.theme === 'dark') root.setAttribute('data-theme', 'dark');
  else root.setAttribute('data-theme', 'swiss');

  root.style.setProperty('--accent', t.accent);
  root.style.setProperty('--accent-ink', pickContrast(t.accent));

  document.querySelectorAll('[data-cover-name]').forEach(el => {
    el.textContent = t.displayName;
  });
}

function PortfolioTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => { applyTweaks(t); }, [t]);

  const accentSwatches = ['#1f3a8a', '#0a4d2e', '#7a2222', '#b85c00', '#1a1a1a'];

  return (
    <TweaksPanel title="Portfolio · Tweaks">
      <TweakSection title="Tema visual">
        <TweakRadio
          label="Estética"
          value={t.theme}
          options={[
            { value: 'swiss', label: 'Swiss' },
            { value: 'warm', label: 'Warm' },
            { value: 'dark', label: 'Dark' },
          ]}
          onChange={v => setTweak('theme', v)}
        />
      </TweakSection>
      <TweakSection title="Color de acento">
        <TweakColor
          label="Accent"
          value={t.accent}
          options={accentSwatches}
          onChange={v => setTweak('accent', v)}
        />
      </TweakSection>
      <TweakSection title="Datos">
        <TweakText
          label="Nombre"
          value={t.displayName}
          onChange={v => setTweak('displayName', v)}
        />
      </TweakSection>
      <TweakSection title="Debug">
        <TweakButton
          label="Imprimir / Exportar PDF"
          onClick={() => window.print()}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
root.render(<PortfolioTweaks />);
applyTweaks(TWEAK_DEFAULTS);
