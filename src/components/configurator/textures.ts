import * as THREE from 'three';
import { Finish } from './configuratorData';

const cache = new Map<string, THREE.CanvasTexture>();

// Deterministic pseudo-random generator so a finish always looks the same
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashString(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) || 1;
}

function drawWood(ctx: CanvasRenderingContext2D, size: number, finish: Finish) {
  const rand = seeded(hashString(finish.id));
  ctx.fillStyle = finish.color;
  ctx.fillRect(0, 0, size, size);

  // Long vertical grain lines with gentle waves
  for (let i = 0; i < 140; i++) {
    const x = rand() * size;
    const amplitude = 2 + rand() * 6;
    const frequency = 0.004 + rand() * 0.01;
    const phase = rand() * Math.PI * 2;
    ctx.strokeStyle = finish.accent || '#000';
    ctx.globalAlpha = 0.05 + rand() * 0.18;
    ctx.lineWidth = 0.6 + rand() * 2.2;
    ctx.beginPath();
    for (let y = 0; y <= size; y += 8) {
      const px = x + Math.sin(y * frequency + phase) * amplitude;
      if (y === 0) ctx.moveTo(px, y);
      else ctx.lineTo(px, y);
    }
    ctx.stroke();
  }

  // A few cathedral figures for character
  for (let i = 0; i < 4; i++) {
    const cx = rand() * size;
    const cy = rand() * size;
    ctx.strokeStyle = finish.accent || '#000';
    for (let r = 0; r < 6; r++) {
      ctx.globalAlpha = 0.06;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 6 + r * 6, 40 + r * 22, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
}

function drawStone(ctx: CanvasRenderingContext2D, size: number, finish: Finish) {
  const rand = seeded(hashString(finish.id));
  ctx.fillStyle = finish.color;
  ctx.fillRect(0, 0, size, size);

  // Soft cloudy base
  for (let i = 0; i < 60; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 30 + rand() * 120;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, rand() > 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  if (!finish.accent) {
    // Microcement: fine speckle only
    for (let i = 0; i < 4000; i++) {
      ctx.fillStyle = rand() > 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)';
      ctx.fillRect(rand() * size, rand() * size, 1.5, 1.5);
    }
    return;
  }

  // Veins as random walks, a few bold and many thin
  for (let v = 0; v < 18; v++) {
    let x = rand() * size;
    let y = rand() * size;
    let angle = rand() * Math.PI * 2;
    const bold = v < 4;
    ctx.strokeStyle = finish.accent;
    ctx.globalAlpha = bold ? 0.55 : 0.18 + rand() * 0.2;
    ctx.lineWidth = bold ? 2 + rand() * 3 : 0.5 + rand() * 1.2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const steps = 60 + Math.floor(rand() * 80);
    for (let s = 0; s < steps; s++) {
      angle += (rand() - 0.5) * 0.6;
      x += Math.cos(angle) * 8;
      y += Math.sin(angle) * 8;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

// Returns a cached canvas texture for wood and stone finishes; lacquers use a plain colour
export function getFinishTexture(finish: Finish): THREE.CanvasTexture | null {
  if (finish.kind === 'lacquer') return null;
  const key = `${finish.id}:${finish.color}:${finish.accent ?? ''}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  if (finish.kind === 'wood') drawWood(ctx, size, finish);
  else drawStone(ctx, size, finish);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  cache.set(key, texture);
  return texture;
}
