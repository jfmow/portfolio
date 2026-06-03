/* Tweaks island — drives palette + layout via attributes on <html>. */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "sunset",
  "hero": "split",
  "projects": "cards",
  "motion": "on"
}/*EDITMODE-END*/;

function TweaksApp(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const root = document.documentElement;
  React.useEffect(()=>{ root.setAttribute('data-palette', t.palette); }, [t.palette]);
  React.useEffect(()=>{ root.setAttribute('data-hero', t.hero); }, [t.hero]);
  React.useEffect(()=>{ root.setAttribute('data-projects', t.projects); }, [t.projects]);
  React.useEffect(()=>{ root.setAttribute('data-motion', t.motion); }, [t.motion]);

  return (
    <TweaksPanel>
      <TweakSection label="Gradient palette" />
      <TweakRadio label="Mood" value={t.palette}
        options={['sunset','magma','coral','daylight']}
        onChange={(v)=>setTweak('palette', v)} />
      <TweakSection label="Layout" />
      <TweakRadio label="Hero" value={t.hero}
        options={['split','center']}
        onChange={(v)=>setTweak('hero', v)} />
      <TweakRadio label="Projects" value={t.projects}
        options={['cards','list']}
        onChange={(v)=>setTweak('projects', v)} />
      <TweakSection label="Motion" />
      <TweakRadio label="Animated background" value={t.motion}
        options={['on','off']}
        onChange={(v)=>setTweak('motion', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);
