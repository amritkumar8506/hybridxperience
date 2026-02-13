// import { Canvas, useFrame } from "@react-three/fiber";
// import { useRef } from "react";
// import * as THREE from "three";

// function LiquidShader() {
//   const materialRef = useRef();

//   useFrame(({ clock, mouse }) => {
//     materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
//     materialRef.current.uniforms.uMouse.value = new THREE.Vector2(
//       mouse.x,
//       mouse.y
//     );
//   });

//   return (
//     <mesh>
//       <planeGeometry args={[6, 6]} />
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

//           // 2D random
//           float random(vec2 st) {
//               return fract(sin(dot(st.xy,
//                                    vec2(12.9898,78.233)))*
//                   43758.5453123);
//           }

//           // Smooth noise
//           float noise(vec2 st) {
//               vec2 i = floor(st);
//               vec2 f = fract(st);

//               float a = random(i);
//               float b = random(i + vec2(1.0, 0.0));
//               float c = random(i + vec2(0.0, 1.0));
//               float d = random(i + vec2(1.0, 1.0));

//               vec2 u = f * f * (3.0 - 2.0 * f);

//               return mix(a, b, u.x) +
//                       (c - a)* u.y * (1.0 - u.x) +
//                       (d - b) * u.x * u.y;
//           }

//           void main() {
//               vec2 uv = vUv * 2.0;

//               float t = uTime * 0.3;

//               float n = noise(uv * 3.0 + t);
//               float n2 = noise(uv * 6.0 - t);

//               float flow = sin(uv.x * 3.0 + n * 2.0 + t) +
//                            cos(uv.y * 3.0 + n2 * 2.0 - t);

//               vec3 color1 = vec3(0.1, 0.0, 0.2);
//               vec3 color2 = vec3(0.5, 0.0, 0.8);
//               vec3 color3 = vec3(0.1, 0.2, 0.6);

//               vec3 finalColor = mix(color1, color2, flow * 0.5 + 0.5);
//               finalColor = mix(finalColor, color3, n2);

//               // Mouse interaction glow
//               float dist = distance(vUv, uMouse * 0.5 + 0.5);
//               finalColor += 0.3 * exp(-10.0 * dist);

//               gl_FragColor = vec4(finalColor, 1.0);
//           }
//         `}
//       />
//     </mesh>
//   );
// }

// export default function LiquidBackground() {
//   return (
//     <div className="absolute inset-0 -z-10">
//       <Canvas camera={{ position: [0, 0, 1] }}>
//         <LiquidShader />
//       </Canvas>
//     </div>
//   );
// }
















import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function LiquidShader() {
  const materialRef = useRef();

  useFrame(({ clock, mouse }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uMouse.value = new THREE.Vector2(mouse.x, mouse.y);
    }
  });

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
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
          vec2 uv = vUv * 2.0;
          float t = uTime * 0.2;

          float n = noise(uv * 2.0 + t);
          float flow = sin(uv.x * 2.0 + n + t) + cos(uv.y * 2.0 + n - t);

          vec3 color1 = vec3(0.1, 0.0, 0.2);
          vec3 color2 = vec3(0.5, 0.0, 0.8);

          vec3 finalColor = mix(color1, color2, flow * 0.5 + 0.5);

          float dist = distance(vUv, uMouse * 0.5 + 0.5);
          finalColor += 0.2 * exp(-10.0 * dist);

          gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  }), []);

  return (
    <mesh>
      <planeGeometry args={[6, 6]} />
      <shaderMaterial
        ref={materialRef}
        {...shaderMaterial}
      />
    </mesh>
  );
}

export default function LiquidBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <LiquidShader />
      </Canvas>
    </div>
  );
}