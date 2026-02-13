// import { Canvas, useFrame } from "@react-three/fiber";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import { useRef } from "react";
// import * as THREE from "three";

// function LiquidPlane() {
//   const materialRef = useRef();

//   useFrame(({ clock, mouse }) => {
//     materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
//     materialRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y);
//   });

//   return (
//     <mesh scale={[6, 6, 1]}>
//       <planeGeometry args={[1, 1, 256, 256]} />
//       <shaderMaterial
//         ref={materialRef}
//         uniforms={{
//           uTime: { value: 0 },
//           uMouse: { value: new THREE.Vector2(0, 0) },
//         }}
//         vertexShader={`
//           varying vec2 vUv;
//           void main() {
//             vUv = uv;
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//           }
//         `}
//         fragmentShader={`
//           uniform float uTime;
//           uniform vec2 uMouse;
//           varying vec2 vUv;

//           float random(vec2 st) {
//               return fract(sin(dot(st.xy,
//                                    vec2(12.9898,78.233)))*
//                   43758.5453123);
//           }

//           float noise(vec2 st) {
//               vec2 i = floor(st);
//               vec2 f = fract(st);

//               float a = random(i);
//               float b = random(i + vec2(1.0, 0.0));
//               float c = random(i + vec2(0.0, 1.0));
//               float d = random(i + vec2(1.0, 1.0));

//               vec2 u = f*f*(3.0-2.0*f);

//               return mix(a,b,u.x) +
//                      (c-a)*u.y*(1.0-u.x) +
//                      (d-b)*u.x*u.y;
//           }

//           void main() {
//             vec2 uv = vUv * 3.0;

//             float t = uTime * 0.2;

//             float n = noise(uv + t);
//             float n2 = noise(uv * 2.0 - t);

//             float wave = sin(uv.x + n*2.0 + t) +
//                          cos(uv.y + n2*2.0 - t);

//             vec3 purple = vec3(0.4, 0.0, 0.7);
//             vec3 pink   = vec3(0.9, 0.0, 0.6);
//             vec3 blue   = vec3(0.0, 0.3, 0.8);

//             vec3 col = mix(purple, pink, n);
//             col = mix(col, blue, n2);

//             float dist = distance(vUv, uMouse*0.5 + 0.5);
//             col += 0.5 * exp(-8.0 * dist);

//             gl_FragColor = vec4(col * wave * 0.4, 1.0);
//           }
//         `}
//       />
//     </mesh>
//   );
// }

// export default function CinematicLiquid() {
//   return (
//     <div className="absolute inset-0 -z-10">
//       <Canvas camera={{ position: [0, 0, 1] }}>
//         <LiquidPlane />
//         <EffectComposer>
//           <Bloom
//             luminanceThreshold={0}
//             luminanceSmoothing={0.9}
//             intensity={1.5}
//           />
//         </EffectComposer>
//       </Canvas>
//     </div>
//   );
// }





















import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function LiquidPlane() {
  const materialRef = useRef();

  useFrame(({ clock, mouse }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y);
    }
  });

  // Memoize shader material to prevent recreation
  const shaderMaterial = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec2 vUv;

      float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
      }

      float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
      }

      void main() {
        vec2 uv = vUv * 2.0;
        float t = uTime * 0.15;
        
        float n = noise(uv + t);
        float wave = sin(uv.x + n + t) + cos(uv.y + n - t);

        vec3 purple = vec3(0.4, 0.0, 0.7);
        vec3 pink   = vec3(0.9, 0.0, 0.6);

        vec3 col = mix(purple, pink, n);

        float dist = distance(vUv, uMouse*0.5 + 0.5);
        col += 0.3 * exp(-8.0 * dist);

        gl_FragColor = vec4(col * wave * 0.3, 1.0);
      }
    `
  }), []);

  return (
    <mesh scale={[6, 6, 1]}>
      <planeGeometry args={[1, 1, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        {...shaderMaterial}
      />
    </mesh>
  );
}

export default function CinematicLiquid() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Enable automatic performance scaling
      >
        <LiquidPlane />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            intensity={1.2}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}