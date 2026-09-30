// GLSLHills — WebGL rolling-hills background via Three.js + GLSL vertex shader.
// Renders an animated plane whose vertices are displaced by composed 3D noise
// into mountain/hill silhouettes that drift continuously. Used as a
// site-wide ambient backdrop behind content sections (below the hero).
//
// Color: driven by the `color` prop (CSS hex → vec3 uniform) so each section
// can tint the hills to match its own palette. Defaults to AATMA green-deep.
//
// Respects prefers-reduced-motion: when reduced, the Three.js canvas is not
// mounted and a static CSS gradient fallback is rendered instead.

import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export interface GLSLHillsProps {
  /** CSS hex color for the hills (e.g. "#1a3c2a"). Default: AATMA green-deep. */
  color?: string;
  /** Base animation speed multiplier. Higher = faster drift. Default: 0.5. */
  speed?: number;
  /** Distance of the orthographic-ish camera from the plane. Default: 125. */
  cameraZ?: number;
  /** Size of the noise plane. Default: 256. */
  planeSize?: number;
  /**
   * When "mobile", the WebGL canvas is skipped and a static CSS gradient
   * fallback is rendered instead (same approach as prefers-reduced-motion).
   * This keeps low-end mobile GPUs from choking on the noise plane.
   */
  deviceTier?: "mobile" | "tablet" | "desktop";
}

// Convert a CSS hex color like "#1a3c2a" into a THREE vec3 in [0,1].
function hexToVec3(hex: string): THREE.Vector3 {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  return new THREE.Vector3(r, g, b);
}

function GLSLHillsInner({
  color: colorProp,
  speed = 0.5,
  cameraZ = 125,
  planeSize = 256,
  deviceTier,
}: GLSLHillsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const clockRef = useRef<THREE.Clock | null>(null);
  const planeRef = useRef<{
    mesh: THREE.Mesh;
    uniforms: {
      time: THREE.IUniform<number>;
      hillColor: THREE.IUniform<THREE.Vector3>;
    };
    render: (delta: number) => void;
  } | null>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = deviceTier === "mobile";

  // Memoize the color vector so it only updates when the prop changes.
  const hillColor = useMemo(() => hexToVec3(colorProp ?? "#1a3c2a"), [colorProp]);

  useEffect(() => {
    if (reduced || isMobile) {
      // Reduced-motion or mobile tier: do not mount the WebGL canvas;
      // a static CSS fallback is rendered instead.
      return;
    }

    if (!canvasRef.current) return;

    // ---- Plane (the rolling-hills mesh) ----
    const uniforms: {
      time: THREE.IUniform<number>;
      hillColor: THREE.IUniform<THREE.Vector3>;
    } = {
      time: { value: 0 } as THREE.IUniform<number>,
      hillColor: { value: hillColor.clone() } as THREE.IUniform<THREE.Vector3>,
    };

    const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize, planeSize, planeSize);
    const planeMaterial = new THREE.RawShaderMaterial({
      uniforms,
      vertexShader: `
                #define GLSLIFY 1
                attribute vec3 position;
                uniform mat4 projectionMatrix;
                uniform mat4 modelViewMatrix;
                uniform float time;
                varying vec3 vPosition;

                mat4 rotateMatrixX(float radian) {
                  return mat4(
                    1.0, 0.0, 0.0, 0.0,
                    0.0, cos(radian), -sin(radian), 0.0,
                    0.0, sin(radian), cos(radian), 0.0,
                    0.0, 0.0, 0.0, 1.0
                  );
                }

                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
                vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
                vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

                float cnoise(vec3 P) {
                  vec3 Pi0 = floor(P);
                  vec3 Pi1 = Pi0 + vec3(1.0);
                  Pi0 = mod289(Pi0);
                  Pi1 = mod289(Pi1);
                  vec3 Pf0 = fract(P);
                  vec3 Pf1 = Pf0 - vec3(1.0);
                  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
                  vec4 iy = vec4(Pi0.yy, Pi1.yy);
                  vec4 iz0 = Pi0.zzzz;
                  vec4 iz1 = Pi1.zzzz;

                  vec4 ixy = permute(permute(ix) + iy);
                  vec4 ixy0 = permute(ixy + iz0);
                  vec4 ixy1 = permute(ixy + iz1);

                  vec4 gx0 = ixy0 * (1.0 / 7.0);
                  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
                  gx0 = fract(gx0);
                  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
                  vec4 sz0 = step(gz0, vec4(0.0));
                  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
                  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

                  vec4 gx1 = ixy1 * (1.0 / 7.0);
                  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
                  gx1 = fract(gx1);
                  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
                  vec4 sz1 = step(gz1, vec4(0.0));
                  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
                  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

                  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
                  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
                  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
                  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
                  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
                  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
                  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
                  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

                  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
                  g000 *= norm0.x;
                  g010 *= norm0.y;
                  g100 *= norm0.z;
                  g110 *= norm0.w;
                  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
                  g001 *= norm1.x;
                  g011 *= norm1.y;
                  g101 *= norm1.z;
                  g111 *= norm1.w;

                  float n000 = dot(g000, Pf0);
                  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
                  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
                  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
                  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
                  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
                  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
                  float n111 = dot(g111, Pf1);

                  vec3 fade_xyz = fade(Pf0);
                  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
                  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
                  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
                  return 2.2 * n_xyz;
                }

                void main(void) {
                  vec3 updatePosition = (rotateMatrixX(radians(90.0)) * vec4(position, 1.0)).xyz;
                  float sin1 = sin(radians(updatePosition.x / 128.0 * 90.0));
                  vec3 noisePosition = updatePosition + vec3(0.0, 0.0, time * -30.0);
                  float noise1 = cnoise(noisePosition * 0.08);
                  float noise2 = cnoise(noisePosition * 0.06);
                  float noise3 = cnoise(noisePosition * 0.4);
                  vec3 lastPosition = updatePosition + vec3(0.0,
                    noise1 * sin1 * 8.0
                    + noise2 * sin1 * 8.0
                    + noise3 * (abs(sin1) * 2.0 + 0.5)
                    + pow(sin1, 2.0) * 40.0, 0.0);

                  vPosition = lastPosition;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(lastPosition, 1.0);
                }
              `,
      fragmentShader: `
                precision highp float;
                #define GLSLIFY 1
                varying vec3 vPosition;
                uniform vec3 hillColor;

                void main(void) {
                  // Distance-based opacity fade: hills fade in from the center.
                  float d = length(vPosition);
                  float opacity = (96.0 - d) / 256.0 * 0.6;
                  // Slightly lighter than the base color for atmospheric depth.
                  vec3 lit = hillColor * 1.15;
                  gl_FragColor = vec4(lit, opacity);
                }
              `,
      transparent: true,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(planeGeometry, planeMaterial);

    // ---- Three.js setup ----
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false,
      alpha: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000,
    );
    const clock = new THREE.Clock();

    camera.position.set(0, 16, cameraZ);
    camera.lookAt(new THREE.Vector3(0, 28, 0));
    scene.add(mesh);

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const render = () => {
      const delta = clock.getDelta();
      uniforms.time.value += delta * speed;
      renderer.render(scene, camera);
    };

    let rafId = 0;
    const renderLoop = () => {
      render();
      rafId = requestAnimationFrame(renderLoop);
    };

    resize();
    renderLoop();

    // Stash for cleanup.
    planeRef.current = { mesh, uniforms, render: () => {} };
    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;
    clockRef.current = clock;

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
      renderer.dispose();
      planeGeometry.dispose();
      planeMaterial.dispose();
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      clockRef.current = null;
      planeRef.current = null;
    };
  }, [colorProp, speed, cameraZ, planeSize, reduced, hillColor, isMobile]);

  // Re-render the hill color when the prop changes (dispose + re-init would be
  // heavy; instead we update the uniform in place if the renderer is alive).
  useEffect(() => {
    if (reduced || !planeRef.current) return;
    planeRef.current.uniforms.hillColor.value.copy(hillColor);
  }, [hillColor, reduced]);

  if (reduced || isMobile) {
    // Static CSS fallback matching the hill color — soft gradient blob.
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, " +
            (colorProp ?? "#1a3c2a") +
            " 0%, transparent 70%)",
          opacity: 0.35,
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}

export function GLSLHills(props: GLSLHillsProps) {
  return <GLSLHillsInner {...props} />;
}
