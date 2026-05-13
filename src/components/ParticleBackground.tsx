import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticleBackgroundProps {
  backgroundColor?: string;
}

export default function ParticleBackground({ backgroundColor = "#ffffff" }: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    camera.position.set(0, 0, 55);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(backgroundColor, 0); 
    container.appendChild(renderer.domElement);

    const PARTICLE_COUNT = 90000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const randomOffsets = new Float32Array(PARTICLE_COUNT * 3);

    const primaryColor = new THREE.Color(0x888888); 
    const secondaryColor = new THREE.Color(0x3b82f6); 

    const pyrHeight = 28;
    const pyrBase = 22;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const onBase = Math.random() < 0.25;
        let x, y, z;
        
        if (onBase) {
            x = (Math.random() - 0.5) * pyrBase;
            z = (Math.random() - 0.5) * pyrBase;
            y = -pyrHeight / 2.5; 
        } else {
            const t = Math.random();
            const baseX = (Math.random() - 0.5) * pyrBase * (1 - t);
            const baseZ = (Math.random() - 0.5) * pyrBase * (1 - t);
            x = baseX;
            y = -pyrHeight / 2.5 + t * pyrHeight;
            z = baseZ;
        }

        const spread = 2.5;
        positions[i3] = x + (Math.random() - 0.5) * spread;
        positions[i3 + 1] = y + (Math.random() - 0.5) * spread;
        positions[i3 + 2] = z + (Math.random() - 0.5) * spread;

        randomOffsets[i3] = (Math.random() - 0.5) * 8;
        randomOffsets[i3 + 1] = (Math.random() - 0.5) * 8;
        randomOffsets[i3 + 2] = (Math.random() - 0.5) * 8;

        const color = Math.random() > 0.82 ? secondaryColor : primaryColor;
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("randomOffset", new THREE.BufferAttribute(randomOffsets, 3));

    const vertexShader = `
      uniform float uTime;
      uniform vec3 uMouse;
      attribute vec3 color;
      attribute vec3 randomOffset;
      varying vec3 vColor;
      varying float vDistance;
      
      void main() {
        vColor = color;
        vec3 pos = position;
        
        // Floating/Scattering movement with multiple frequencies
        pos.x += sin(uTime * 0.4 + randomOffset.x) * 1.5 + sin(uTime * 1.2 + randomOffset.z) * 0.5;
        pos.y += cos(uTime * 0.4 + randomOffset.y) * 1.5 + cos(uTime * 1.2 + randomOffset.x) * 0.5;
        pos.z += sin(uTime * 0.4 + randomOffset.z) * 1.0 + sin(uTime * 1.2 + randomOffset.y) * 0.4;

        // Neural noise
        float noise = sin(uTime * 0.8 + position.x * 0.15) * cos(uTime * 0.8 + position.y * 0.15);
        pos += normalize(pos + randomOffset) * noise * 0.8;

        // Calculate world position
        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        vDistance = length(pos);
        
        // Mouse interaction in world space
        float mouseDist = distance(worldPos.xyz, uMouse);
        float mouseRange = 16.0; // Further reduced range for subtlety
        if (mouseDist < mouseRange) {
          vec3 dir = normalize(worldPos.xyz - uMouse);
          // Higher power for an even smoother exponential falloff
          float force = pow(1.0 - mouseDist / mouseRange, 3.0) * 4.0; 
          worldPos.xyz += dir * force;
        }
        
        vec4 viewPosition = viewMatrix * worldPos;
        float sizePulse = 1.0 + sin(uTime * 2.5 + vDistance * 0.1) * 0.4;
        gl_PointSize = (200.0 / -viewPosition.z) * sizePulse;
        gl_Position = projectionMatrix * viewPosition;
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      varying vec3 vColor;
      varying float vDistance;
      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5));
        if (dist > 0.5) discard;
        float strength = pow(1.0 - dist * 2.0, 2.2);
        float alpha = strength * (0.6 + sin(vDistance * 0.15 - uTime * 0.8) * 0.3);
        gl_FragColor = vec4(vColor, alpha * 0.8);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(1000, 1000, 1000) }
      },
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let animationFrameId: number;
    let time = 0;
    const mouse = new THREE.Vector3(1000, 1000, 1000);
    const raycaster = new THREE.Raycaster();
    const ndcMouse = new THREE.Vector2();

    const animate = () => {
      time += 0.006;
      material.uniforms.uTime.value = time;
      material.uniforms.uMouse.value.copy(mouse);
      
      points.rotation.y += 0.0015;
      points.rotation.x += 0.001;
      points.rotation.z += 0.0008;
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (event: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      ndcMouse.set(x, y);
      raycaster.setFromCamera(ndcMouse, camera);
      
      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersection = new THREE.Vector3();
      const result = raycaster.ray.intersectPlane(planeZ, intersection);
      
      if (result) {
        // Smoothly lerp towards target intersection for fluid feel
        mouse.lerp(result, 0.1);
      }
    };

    const handleMouseLeave = () => {
      mouse.set(1000, 1000, 1000);
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, [backgroundColor]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none" 
      style={{ backgroundColor }} 
    />
  );
}
