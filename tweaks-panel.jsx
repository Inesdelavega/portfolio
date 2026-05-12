// tweaks-panel.jsx — Reusable Tweaks shell + form-control helpers

const { useState, useRef } = React;

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useTweaks(defaults) {
  const [state, setState] = useState(() => {
    try {
      const s = sessionStorage.getItem('_portfolio_tweaks');
      return s ? { ...defaults, ...JSON.parse(s) } : { ...defaults };
    } catch { return { ...defaults }; }
  });

  function setTweak(key, val) {
    setState(prev => {
      const next = { ...prev, [key]: val };
      try { sessionStorage.setItem('_portfolio_tweaks', JSON.stringify(next)); } catch {}
      return next;
    });
  }

  return [state, setTweak];
}

// ─── TweaksPanel ──────────────────────────────────────────────────────────────
function TweaksPanel({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="tweaks-toggle" onClick={() => setOpen(o => !o)} title="Tweaks">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="4" cy="4" r="1.5" fill="currentColor"/>
          <circle cx="4" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="8" r="1.5" fill="currentColor"/>
          <line x1="5.5" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="0" y1="4" x2="2.5" y2="4" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="5.5" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="0" y1="12" x2="2.5" y2="12" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="13.5" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="0" y1="8" x2="10.5" y2="8" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </button>
      {open && (
        <aside className="tweaks-panel">
          <div className="tweaks-panel__header">
            <span>{title}</span>
            <button className="tweaks-close" onClick={() => setOpen(false)}>✕</button>
          </div>
          {children}
        </aside>
      )}
    </>
  );
}

// ─── TweakSection ─────────────────────────────────────────────────────────────
function TweakSection({ title, children }) {
  return (
    <div className="tweak-section">
      <div className="tweak-section__title">{title}</div>
      {children}
    </div>
  );
}

// ─── TweakRadio ───────────────────────────────────────────────────────────────
function TweakRadio({ label, value, options, onChange }) {
  return (
    <div className="tweak-field">
      {label && <div className="tweak-label">{label}</div>}
      <div className="tweak-radio-group">
        {options.map(o => (
          <label key={o.value} className={`tweak-radio${value === o.value ? ' active' : ''}`}>
            <input type="radio" name={label} value={o.value}
              checked={value === o.value} onChange={() => onChange(o.value)} />
            {o.label}
          </label>
        ))}
      </div>
    </div>
  );
}

// ─── TweakColor ───────────────────────────────────────────────────────────────
function TweakColor({ label, value, options, onChange }) {
  const ref = useRef();
  return (
    <div className="tweak-field">
      {label && <div className="tweak-label">{label}</div>}
      <div className="tweak-swatches">
        {options.map(hex => (
          <button key={hex}
            className={`tweak-swatch${value === hex ? ' active' : ''}`}
            style={{ background: hex }}
            onClick={() => onChange(hex)}
            title={hex}
          />
        ))}
        <label className="tweak-swatch tweak-swatch-pick" style={{ background: value }} title="Personalizado">
          <input ref={ref} type="color" value={value} onChange={e => onChange(e.target.value)} />
        </label>
      </div>
    </div>
  );
}

// ─── TweakText ────────────────────────────────────────────────────────────────
function TweakText({ label, value, onChange }) {
  return (
    <div className="tweak-field">
      {label && <div className="tweak-label">{label}</div>}
      <input className="tweak-input" type="text" value={value}
        onChange={e => onChange(e.target.value)} />
    </div>
  );
}

// ─── TweakButton ──────────────────────────────────────────────────────────────
function TweakButton({ label, onClick }) {
  return (
    <div className="tweak-field">
      <button className="tweak-btn" onClick={onClick}>{label}</button>
    </div>
  );
}
