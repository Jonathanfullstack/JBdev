// Decorative GPU field. No framework, DOM particles, textures or postprocessing.
const hero = document.querySelector('#hero');
const host = hero.querySelector('.hero__canvas');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const compact = matchMedia('(max-width: 768px)');
const intro = window.JBIntro || { active: false, chaos: 0, pulse: 0, reveal: 1 };
let disposed = false;

async function mount() {
  if (disposed) return;
  try {
    const THREE = await import('./vendor/three-0.170.0.module.min.js');
    if (disposed) return;
    const low = compact.matches || (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
    const count = low ? 2400 : 12500;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, low ? 1 : 1.5));
    renderer.setClearColor(0x030812, 0);
    host.append(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, .1, 30);
    camera.position.z = 6.8;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    // Folded, asymmetric toroidal sheets produce a cavity and distinct lobes.
    // Parameters, rather than a fixed sphere mesh, are stored in the buffer.
    let seed = 71;
    function random() { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 4294967296; }
    for (let i = 0; i < count; i++) {
      positions[i * 3] = random() * Math.PI * 2;
      positions[i * 3 + 1] = random() * Math.PI * 2;
      positions[i * 3 + 2] = random();
      seeds[i] = random();
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    const uniforms = { uLight: { value: 0 }, uLightCore: { value: new THREE.Color() }, uLightMid: { value: new THREE.Color() }, uLightEdge: { value: new THREE.Color() }, uLightIce: { value: new THREE.Color() }, uLightCyan: { value: new THREE.Color() }, uInfinity: { value: 0 }, uView: { value: new THREE.Vector2(2.475, 2.475) }, uChaos: { value: 0 }, uPulse: { value: 0 }, uTime: { value: 0 }, uReveal: { value: reduced.matches ? 1 : 0 }, uScroll: { value: 0 }, uMouse: { value: new THREE.Vector2() }, uDpr: { value: renderer.getPixelRatio() } };
    const material = new THREE.ShaderMaterial({
      uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `
        uniform float uTime, uReveal, uScroll, uDpr, uChaos, uPulse, uInfinity;
        uniform vec2 uMouse, uView;
        attribute float aSeed;
        varying float vLight, vAlpha, vStreak, vSeed;
        void main() {
          float u = position.x, v = position.y, t = uTime * .19;
          float fold = sin(u * 3. + t) * .19 + cos(u * 2. - t * .7) * .15;
          float tube = .45 + .16 * sin(u * 2. + t) + .1 * cos(v * 3. + u - t);
          float radius = 1.02 + fold + tube * cos(v);
          vec3 p = vec3(radius * cos(u), radius * sin(u) * 1.12, tube * sin(v));
          p.z += .42 * sin(u * 2. + t * .8) + .17 * cos(v + u * 3. - t);
          p.x += .16 * sin(p.y * 2. + t);
          p.y += .15 * cos(u * 3. - t);
          p *= .87 + position.z * .21;
          float scatter = smoothstep(.87, 1., aSeed);
          p += scatter * vec3(sin(u * 13. + t) * .65, cos(v * 9. + t) * .55, sin(v * 7.) * .7);
          p *= 1. + .025 * sin(t * 2.) + uPulse * .065;
          vec2 delta = p.xy - uMouse * 1.7;
          p.xy += delta * exp(-dot(delta, delta) * 2.) * .12;
          p.y += uScroll * (.5 + scatter * .55);
          p.x += uScroll * scatter * .5;
          float angle = -.45 + .045 * sin(t * .5);
          p.xy = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * p.xy;
          // A volumetric figure eight: each seed keeps its identity across all stages.
          float width = min(uView.x * .78, uView.y * 1.55);
          float flow = u + uTime * .16;
          float ribbon = width * (.038 + position.z * .035);
          vec3 infinity = vec3(
            width * sin(flow) + ribbon * cos(v),
            width * .36 * sin(2. * flow) + ribbon * sin(v),
            .24 * cos(flow) + ribbon * cos(v + flow));
          infinity *= 1. + .018 * sin(uTime * 1.6);
          infinity += scatter * .13 * vec3(sin(v + uTime), cos(u + uTime), sin(v));
          float unravel = sin(uInfinity * 3.14159265);
          p = mix(p, infinity, uInfinity);
          p += unravel * .22 * vec3(sin(u * 5. + uTime), cos(v * 3. - uTime), sin(u + v));
          // Screen-distributed domain, perspective compensated to reach every edge.
          float depth = (position.z - .5) * 2.4;
          vec2 fieldUV = vec2(u, v) / 6.2831853;
          fieldUV = fract(fieldUV + vec2(sin(v * 2. + uTime * .28), cos(u * 2. - uTime * .23)) * .075);
          vec3 field = vec3((fieldUV * 2. - 1.) * uView * 1.04 * (6.8 - depth) / 6.8, depth);
          p = mix(p, field, uChaos);
          vec4 mv = modelViewMatrix * vec4(p, 1.);
          gl_Position = projectionMatrix * mv;
          vStreak = step(.9, aSeed) * (uScroll + uChaos * .6);
          gl_PointSize = min(7., (2.4 + aSeed * 2.2 + vStreak * 4.) * uDpr * 3.8 / -mv.z);
          vSeed = aSeed;
          vLight = .5 + .5 * sin(u * 2. - v + t);
          vAlpha = smoothstep(aSeed * .65, aSeed * .65 + .35, uReveal) * (1. - uScroll * .5) * (.65 + position.z * .65) * (1. + uPulse * .65);
        }`,
      fragmentShader: `
        uniform float uLight;
        uniform vec3 uLightCore, uLightMid, uLightEdge, uLightIce, uLightCyan;
        varying float vLight, vAlpha, vStreak, vSeed;
        void main() {
          vec2 uv = gl_PointCoord - .5;
          uv.x *= 1. + vStreak * 3.;
          float d = length(uv);
          if (d > .5) discard;
          vec3 night = mix(vec3(.12, .38, .95), vec3(.38, .9, 1.), vLight);
          vec3 day = mix(uLightCore, uLightMid, clamp(vLight * .55 + vSeed * .45, 0., 1.));
          day = mix(day, uLightEdge, smoothstep(.28, .82, vLight));
          float spark = step(.91, vSeed);
          day = mix(day, mix(uLightIce, uLightCyan, step(.96, vSeed)), spark);
          vec3 color = mix(night, day, uLight);
          gl_FragColor = vec4(color, (1. - smoothstep(.05, .5, d)) * vAlpha);
        }`
    });
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    points.rotation.x = .35;
    scene.add(points);
    // Three open, delicate data paths; no rigid enclosing rings.
    const paths = [];
    for (let j = 0; j < (low ? 1 : 3); j++) {
      const vertices = [];
      for (let k = 0; k < 100; k++) {
        const a = k / 99 * Math.PI * 1.4 + j * 1.7;
        vertices.push(new THREE.Vector3(Math.cos(a) * (1.85 + j * .1), Math.sin(a) * .75, Math.sin(a * 1.5 + j) * .65));
      }
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(vertices), new THREE.LineBasicMaterial({ color: 0x278ac7, transparent: true, opacity: .13 }));
      line.rotation.z = -.45 + j * .7;
      scene.add(line); paths.push(line);
    }
    let frame = 0, previous = 0, elapsed = 0, visible = true, lost = false, slowFrames = 0, lightTheme = false;
    const target = new THREE.Vector2();
    const visual = hero.querySelector('.hero__visual');
    let scrollProgress = 0, heroTop = 0, heroHeight = 1;
    function updateScroll() { scrollProgress = Math.min(1, Math.max(0, (window.scrollY - heroTop) / heroHeight)); }
    window.addEventListener('scroll', updateScroll, { passive: true });
    function draw(now) {
      frame = 0;
      if (disposed || document.hidden || !visible || lost) return;
      const dt = previous ? Math.min((now - previous) / 1000, .1) : 0;
      if (!reduced.matches && dt < (low ? 1 / 31 : 1 / 61) && previous) { frame = requestAnimationFrame(draw); return; }
      previous = now;
      if (!reduced.matches) elapsed += dt;
      uniforms.uTime.value = reduced.matches ? 0 : elapsed;
      uniforms.uReveal.value = reduced.matches ? 1 : intro.active ? intro.reveal : 1;
      uniforms.uChaos.value = intro.active ? intro.chaos : 0;
      uniforms.uInfinity.value = intro.active ? intro.infinity : 0;
      points.rotation.x = .35 * (1 - Math.max(uniforms.uChaos.value, uniforms.uInfinity.value));
      uniforms.uPulse.value = intro.active ? intro.pulse : 0;
      uniforms.uScroll.value = reduced.matches ? 0 : scrollProgress;
      if (intro.active && intro.view) {
        const aspect = intro.view.width / intro.view.height;
        if (camera.aspect !== aspect) { camera.aspect = aspect; camera.updateProjectionMatrix(); uniforms.uView.value.set(2.475 * aspect, 2.475); }
      }
      uniforms.uMouse.value.lerp(target, .045);
      const lineBase = lightTheme ? .22 : .13;
      paths.forEach((line, i) => { line.rotation.y = reduced.matches ? 0 : Math.sin(elapsed * .09 + i) * .12; line.material.opacity = lineBase * uniforms.uReveal.value * (1 - uniforms.uScroll.value) * (1 - uniforms.uChaos.value); });
      renderer.render(scene, camera);
      if (!visual.classList.contains('is-rendered')) visual.classList.add('is-rendered');
      if (!intro.ready) { intro.ready = true; window.dispatchEvent(new Event('jb:particles-ready')); }
      if (!low && dt > .045 && ++slowFrames === 35) { geometry.setDrawRange(0, 6000); renderer.setPixelRatio(1); uniforms.uDpr.value = 1; }
      if (!reduced.matches) frame = requestAnimationFrame(draw);
    }
    function resume() { if (!frame && !disposed) { previous = 0; frame = requestAnimationFrame(draw); } }
    function resize() { const width = host.clientWidth, height = host.clientHeight; if (!width || !height) return; renderer.setSize(width, intro.active ? Math.max(height, window.innerHeight) : height, false); heroTop = hero.getBoundingClientRect().top + window.scrollY; heroHeight = hero.offsetHeight; updateScroll(); camera.aspect = width / height; uniforms.uView.value.set(2.475 * camera.aspect, 2.475); camera.updateProjectionMatrix(); if (compact.matches) { geometry.setDrawRange(0, 2400); renderer.setPixelRatio(1); uniforms.uDpr.value = 1; } resume(); }
    function pointer(e) { if (reduced.matches || e.pointerType === 'touch') return; const r = host.getBoundingClientRect(); target.set((e.clientX - r.left) / r.width * 2 - 1, 1 - (e.clientY - r.top) / r.height * 2); }
    function leave() { target.set(0, 0); }
    function visibility() { cancelAnimationFrame(frame); frame = 0; if (!document.hidden) resume(); }
    function contextLost(e) { window.dispatchEvent(new Event('jb:particles-failed')); e.preventDefault(); lost = true; cancelAnimationFrame(frame); frame = 0; hero.querySelector('.hero__visual').classList.remove('is-rendered'); }
    function contextRestored() { lost = false; resume(); }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) resume(); else { cancelAnimationFrame(frame); frame = 0; } });
    observer.observe(hero);
    const sizeObserver = new ResizeObserver(resize); sizeObserver.observe(host);
    window.addEventListener('jb:intro-finished', resize);
    if (document.fonts) document.fonts.ready.then(resize);
    hero.addEventListener('pointermove', pointer); hero.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', visibility); reduced.addEventListener('change', resume);
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
    function readColor(styles, name, fallback) {
      return styles.getPropertyValue(name).trim() || fallback;
    }
    function updateTheme() {
      const light = !document.body.classList.contains('dark-mode');
      lightTheme = light;
      const styles = getComputedStyle(document.body);
      uniforms.uLight.value = light ? 1 : 0;
      if (light) {
        uniforms.uLightCore.value.set(readColor(styles, '--particle-core', '#1e3a8a'));
        uniforms.uLightMid.value.set(readColor(styles, '--particle-mid', '#1e40af'));
        uniforms.uLightEdge.value.set(readColor(styles, '--particle-edge', '#1d4ed8'));
        uniforms.uLightIce.value.set(readColor(styles, '--particle-ice', '#60a5fa'));
        uniforms.uLightCyan.value.set(readColor(styles, '--particle-cyan', '#67e8f9'));
      }
      material.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      material.needsUpdate = true;
      paths.forEach(line => line.material.color.set(light ? readColor(styles, '--particle-line', '#1e40af') : 0x278ac7));
      resume();
    }
    window.addEventListener('jbdev:themechange', updateTheme);
    updateTheme();
    resize();
    window.addEventListener('pagehide', e => {
      if (e.persisted) return;
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); sizeObserver.disconnect();
      hero.removeEventListener('pointermove', pointer); hero.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', resume);
      window.removeEventListener('jbdev:themechange', updateTheme);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('jb:intro-finished', resize);
      geometry.dispose(); material.dispose(); paths.forEach(p => { p.geometry.dispose(); p.material.dispose(); }); renderer.dispose();
    });
  } catch (error) { window.dispatchEvent(new Event('jb:particles-failed')); console.warn('JB DEV: visual decorativo indisponível; conteúdo preservado.', error); }
}
// Let the semantic hero paint before requesting the optional WebGL module.
requestAnimationFrame(() => requestAnimationFrame(mount));
const button = hero.querySelector('.btn-primary');
button.addEventListener('pointermove', e => {
  if (reduced.matches || e.pointerType === 'touch') return;
  const r = button.getBoundingClientRect();
  button.style.setProperty('--magnet-x', `${(e.clientX - r.left - r.width / 2) * .035}px`);
  button.style.setProperty('--magnet-y', `${(e.clientY - r.top - r.height / 2) * .06}px`);
});
button.addEventListener('pointerleave', () => { button.style.setProperty('--magnet-x', '0px'); button.style.setProperty('--magnet-y', '0px'); });
