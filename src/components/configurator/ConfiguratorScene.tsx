import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { Edges, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import {
  ConfiguratorState,
  Finish,
  FurnitureModule,
  HandleStyle,
  KITCHEN_TALL_HEIGHT,
  UPPER_CABINET_BOTTOM,
  UPPER_CABINET_DEPTH,
  UPPER_CABINET_HEIGHT,
  moduleHeight,
  resolveFinish,
  totalWidth
} from './configuratorData';
import { getFinishTexture } from './textures';

type V3 = [number, number, number];

export type CameraView = 'perspective' | 'front' | 'top';

export interface ConfiguratorSceneProps {
  state: ConfiguratorState;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  view: CameraView;
  // Changing this number re-frames the camera
  fitKey: number;
  // False while the scene is off screen: rendering pauses to spare the GPU
  active: boolean;
}

const PANEL = 0.018; // carcass board thickness, m
const FRONT = 0.02; // front thickness, m
const GAP = 0.004; // gap between fronts, m
const OPEN_ANGLE = 1.3;
const GARMENT_COLORS = ['#cfc8bd', '#6e6a66', '#2f3a45', '#8a7766', '#e6dfd4', '#4b5a4a'];

interface Materials {
  front: THREE.Material;
  body: THREE.Material;
  top: THREE.Material;
  plinth: THREE.Material;
  glass: THREE.Material;
  steel: THREE.Material;
  led: THREE.Material;
  handle: THREE.Material | null;
}

function useFinishMaterial(finish: Finish): THREE.MeshStandardMaterial {
  const material = useMemo(() => {
    const map = getFinishTexture(finish);
    return new THREE.MeshStandardMaterial({
      color: map ? '#ffffff' : finish.color,
      map,
      roughness: finish.roughness,
      metalness: 0
    });
  }, [finish.id, finish.color, finish.accent, finish.roughness]);
  useEffect(() => () => material.dispose(), [material]);
  return material;
}

function useStaticMaterials(handles: HandleStyle) {
  const materials = useMemo(
    () => ({
      plinth: new THREE.MeshStandardMaterial({ color: '#141312', roughness: 0.8 }),
      glass: new THREE.MeshStandardMaterial({ color: '#0d0d0e', roughness: 0.08, metalness: 0.4 }),
      steel: new THREE.MeshStandardMaterial({ color: '#b9b9b6', roughness: 0.3, metalness: 0.9 }),
      led: new THREE.MeshStandardMaterial({ color: '#ffe2b0', emissive: '#ffd08a', emissiveIntensity: 2.2 }),
      brass: new THREE.MeshStandardMaterial({ color: '#b38e5d', roughness: 0.35, metalness: 0.9 }),
      black: new THREE.MeshStandardMaterial({ color: '#171717', roughness: 0.5, metalness: 0.6 })
    }),
    []
  );
  useEffect(() => () => Object.values(materials).forEach((m) => m.dispose()), [materials]);
  const handle = handles === 'brass' ? materials.brass : handles === 'black' ? materials.black : null;
  return { ...materials, handle };
}

function Block({ size, position, material, castShadow = true }: { size: V3; position: V3; material: THREE.Material; castShadow?: boolean }) {
  return (
    <mesh position={position} material={material} castShadow={castShadow} receiveShadow>
      <boxGeometry args={size} />
    </mesh>
  );
}

function Handle({ material, position, length, vertical }: { material: THREE.Material | null; position: V3; length: number; vertical: boolean }) {
  if (!material) return null;
  const size: V3 = vertical ? [0.012, length, 0.014] : [length, 0.012, 0.014];
  return <Block size={size} position={position} material={material} />;
}

interface DoorProps {
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  hinge: 'left' | 'right';
  open: boolean;
  material: THREE.Material;
  handle: THREE.Material | null;
  // Handle centre height relative to the door bottom
  handleOffset: number;
  handleLength?: number;
}

// Hinged door that swings open around its hinge edge
function Door({ x, y, width, height, z, hinge, open, material, handle, handleOffset, handleLength = 0.16 }: DoorProps) {
  const ref = useRef<THREE.Group>(null);
  const target = open ? (hinge === 'left' ? -OPEN_ANGLE : OPEN_ANGLE) : 0;
  useFrame(() => {
    if (ref.current) ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, target, 0.14);
  });
  const dir = hinge === 'left' ? 1 : -1;
  const pivotX = hinge === 'left' ? x : x + width;
  return (
    <group ref={ref} position={[pivotX, y, z]}>
      <Block size={[width - GAP, height - GAP, FRONT]} position={[(dir * width) / 2, height / 2, 0]} material={material} />
      <Handle
        material={handle}
        position={[dir * (width - 0.045), Math.min(Math.max(handleOffset, handleLength / 2 + 0.03), height - handleLength / 2 - 0.03), FRONT / 2 + 0.008]}
        length={handleLength}
        vertical
      />
    </group>
  );
}

interface DrawerProps {
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  open: boolean;
  front: THREE.Material;
  body: THREE.Material;
  handle: THREE.Material | null;
}

// Drawer front with a box behind it that slides out when the fronts are open
function Drawer({ x, y, width, height, depth, open, front, body, handle }: DrawerProps) {
  const ref = useRef<THREE.Group>(null);
  const target = open ? depth * 0.55 : 0;
  useFrame(() => {
    if (ref.current) ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, target, 0.14);
  });
  const boxHeight = Math.min(height * 0.7, 0.24);
  const boxDepth = depth - 0.05;
  return (
    <group ref={ref}>
      <Block size={[width - GAP, height - GAP, FRONT]} position={[x + width / 2, y + height / 2, depth + FRONT / 2]} material={front} />
      <Block size={[width - 0.06, boxHeight, boxDepth]} position={[x + width / 2, y + 0.015 + boxHeight / 2, depth - boxDepth / 2]} material={body} />
      <Handle
        material={handle}
        position={[x + width / 2, y + height - Math.min(0.05, height / 3), depth + FRONT + 0.008]}
        length={Math.min(0.3, width * 0.45)}
        vertical={false}
      />
    </group>
  );
}

// Open carcass: two sides, bottom, top and back
function Carcass({ x, y, width, height, depth, material }: { x: number; y: number; width: number; height: number; depth: number; material: THREE.Material }) {
  return (
    <group>
      <Block size={[PANEL, height, depth]} position={[x + PANEL / 2, y + height / 2, depth / 2]} material={material} />
      <Block size={[PANEL, height, depth]} position={[x + width - PANEL / 2, y + height / 2, depth / 2]} material={material} />
      <Block size={[width - 2 * PANEL, PANEL, depth]} position={[x + width / 2, y + PANEL / 2, depth / 2]} material={material} />
      <Block size={[width - 2 * PANEL, PANEL, depth]} position={[x + width / 2, y + height - PANEL / 2, depth / 2]} material={material} />
      <Block size={[width - 2 * PANEL, height - 2 * PANEL, 0.006]} position={[x + width / 2, y + height / 2, 0.003]} material={material} />
    </group>
  );
}

function Shelves({ x, y, width, height, depth, count, material }: { x: number; y: number; width: number; height: number; depth: number; count: number; material: THREE.Material }) {
  const items = [];
  for (let i = 1; i <= count; i++) {
    const sy = y + (height * i) / (count + 1);
    items.push(<Block key={i} size={[width - 2 * PANEL - 0.002, PANEL, depth - 0.03]} position={[x + width / 2, sy, (depth - 0.03) / 2 + 0.01]} material={material} />);
  }
  return <>{items}</>;
}

// Doors spanning a module: two doors above 60 cm, one otherwise
function DoorPair({ x, y, width, height, z, open, material, handle, handleOffset, handleLength, singleHinge }: Omit<DoorProps, 'hinge'> & { singleHinge: 'left' | 'right' }) {
  if (width > 0.6) {
    const half = width / 2;
    return (
      <>
        <Door x={x} y={y} width={half} height={height} z={z} hinge="left" open={open} material={material} handle={handle} handleOffset={handleOffset} handleLength={handleLength} />
        <Door x={x + half} y={y} width={half} height={height} z={z} hinge="right" open={open} material={material} handle={handle} handleOffset={handleOffset} handleLength={handleLength} />
      </>
    );
  }
  return <Door x={x} y={y} width={width} height={height} z={z} hinge={singleHinge} open={open} material={material} handle={handle} handleOffset={handleOffset} handleLength={handleLength} />;
}

interface ModuleViewProps {
  module: FurnitureModule;
  index: number;
  x: number;
  state: ConfiguratorState;
  materials: Materials;
  selected: boolean;
  onSelect: (id: string | null) => void;
}

function ModuleView({ module, index, x, state, materials, selected, onSelect }: ModuleViewProps) {
  const { preset, frontsOpen: open } = state;
  const w = module.width / 100;
  const d = state.depth / 100;
  const cd = d - FRONT; // carcass depth
  const h = moduleHeight(state, module.type) / 100;
  const hinge = index % 2 === 0 ? 'left' : 'right';
  const isTallKitchen = preset === 'kitchen' && module.type === 'tall';

  // Carcass bottom and height per furniture type
  let plinth = 0;
  let y0 = 0;
  let ch = h;
  if (preset === 'kitchen') {
    plinth = 0.1;
    y0 = plinth;
    ch = isTallKitchen ? h - plinth : h - plinth - 0.04;
  } else if (preset === 'wardrobe') {
    plinth = 0.08;
    y0 = plinth;
    ch = h - plinth;
  } else {
    y0 = 0.22;
    ch = h - 0.03;
  }

  const frontZ = cd + FRONT / 2;
  const doorHandleOffset = preset === 'living' ? ch / 2 : preset === 'kitchen' && !isTallKitchen ? ch - 0.1 : 1.05 - y0;
  const doorHandleLength = preset === 'wardrobe' || isTallKitchen ? 0.32 : 0.16;

  const parts: React.ReactNode[] = [];
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(module.id);
  };

  switch (module.type) {
    case 'doors':
    case 'sink':
      if (module.type === 'doors') {
        parts.push(<Shelves key="sh" x={x} y={y0} width={w} height={ch} depth={cd} count={1} material={materials.body} />);
      }
      parts.push(<DoorPair key="d" x={x} y={y0} width={w} height={ch} z={frontZ} open={open} material={materials.front} handle={materials.handle} handleOffset={doorHandleOffset} handleLength={doorHandleLength} singleHinge={hinge} />);
      break;
    case 'drawers': {
      if (preset === 'wardrobe') {
        // Four drawers at the bottom, a door with shelves above
        const drawerZone = Math.min(0.84, ch * 0.4);
        const dh = drawerZone / 4;
        for (let i = 0; i < 4; i++) {
          parts.push(<Drawer key={`dr${i}`} x={x} y={y0 + i * dh} width={w} height={dh} depth={cd} open={open} front={materials.front} body={materials.body} handle={materials.handle} />);
        }
        const upperH = ch - drawerZone;
        parts.push(<Shelves key="sh" x={x} y={y0 + drawerZone} width={w} height={upperH} depth={cd} count={Math.max(1, Math.floor(upperH / 0.38) - 1)} material={materials.body} />);
        parts.push(<DoorPair key="d" x={x} y={y0 + drawerZone} width={w} height={upperH} z={frontZ} open={open} material={materials.front} handle={materials.handle} handleOffset={1.05 - y0 - drawerZone} handleLength={0.32} singleHinge={hinge} />);
      } else {
        const ratios = preset === 'living' ? [0.5, 0.5] : [0.22, 0.34, 0.44];
        let cursor = y0 + ch;
        ratios.forEach((r, i) => {
          const dh = ch * r;
          cursor -= dh;
          parts.push(<Drawer key={`dr${i}`} x={x} y={cursor} width={w} height={dh} depth={cd} open={open} front={materials.front} body={materials.body} handle={materials.handle} />);
        });
      }
      break;
    }
    case 'oven': {
      const topDrawer = 0.14;
      const ovenH = Math.min(0.6, ch - topDrawer - 0.1);
      const bottomH = ch - topDrawer - ovenH;
      parts.push(<Drawer key="top" x={x} y={y0 + ch - topDrawer} width={w} height={topDrawer} depth={cd} open={open} front={materials.front} body={materials.body} handle={materials.handle} />);
      parts.push(<Block key="oven" size={[w - GAP, ovenH - GAP, FRONT]} position={[x + w / 2, y0 + bottomH + ovenH / 2, frontZ]} material={materials.glass} />);
      parts.push(<Block key="ovenbar" size={[w * 0.7, 0.014, 0.016]} position={[x + w / 2, y0 + bottomH + ovenH - 0.06, frontZ + 0.02]} material={materials.steel} />);
      parts.push(<Drawer key="bottom" x={x} y={y0} width={w} height={bottomH} depth={cd} open={open} front={materials.front} body={materials.body} handle={materials.handle} />);
      break;
    }
    case 'tall': {
      // Fridge column: tall lower door and a short upper door
      const lowerH = ch * 0.68;
      parts.push(<Shelves key="sh" x={x} y={y0} width={w} height={ch} depth={cd} count={4} material={materials.body} />);
      parts.push(<DoorPair key="dl" x={x} y={y0} width={w} height={lowerH} z={frontZ} open={open} material={materials.front} handle={materials.handle} handleOffset={lowerH - 0.25} handleLength={0.32} singleHinge={hinge} />);
      parts.push(<DoorPair key="du" x={x} y={y0 + lowerH} width={w} height={ch - lowerH} z={frontZ} open={open} material={materials.front} handle={materials.handle} handleOffset={0.12} handleLength={0.16} singleHinge={hinge} />);
      break;
    }
    case 'hanging': {
      const shelfY = y0 + ch - 0.32;
      const rodY = shelfY - 0.06;
      parts.push(<Block key="shelf" size={[w - 2 * PANEL, PANEL, cd - 0.03]} position={[x + w / 2, shelfY, (cd - 0.03) / 2 + 0.01]} material={materials.body} />);
      parts.push(
        <mesh key="rod" position={[x + w / 2, rodY, cd / 2]} rotation={[0, 0, Math.PI / 2]} material={materials.steel} castShadow>
          <cylinderGeometry args={[0.012, 0.012, w - 2 * PANEL, 12]} />
        </mesh>
      );
      const count = Math.min(9, Math.floor((w - 0.08) / 0.09));
      for (let i = 0; i < count; i++) {
        const gx = x + 0.06 + ((w - 0.12) * (i + 0.5)) / count;
        const gh = Math.min(rodY - y0 - 0.1, 0.85 + ((i * 37) % 30) / 100);
        parts.push(
          <mesh key={`g${i}`} position={[gx, rodY - gh / 2 - 0.03, cd / 2]} castShadow>
            <boxGeometry args={[0.035, gh, cd * 0.72]} />
            <meshStandardMaterial color={GARMENT_COLORS[(i + index) % GARMENT_COLORS.length]} roughness={0.95} />
          </mesh>
        );
      }
      parts.push(<DoorPair key="d" x={x} y={y0} width={w} height={ch} z={frontZ} open={open} material={materials.front} handle={materials.handle} handleOffset={doorHandleOffset} handleLength={doorHandleLength} singleHinge={hinge} />);
      break;
    }
    case 'shelves':
      parts.push(<Shelves key="sh" x={x} y={y0} width={w} height={ch} depth={cd} count={Math.max(1, Math.floor(ch / 0.36) - 1)} material={materials.body} />);
      parts.push(<DoorPair key="d" x={x} y={y0} width={w} height={ch} z={frontZ} open={open} material={materials.front} handle={materials.handle} handleOffset={doorHandleOffset} handleLength={doorHandleLength} singleHinge={hinge} />);
      break;
    case 'open': {
      const count = preset === 'living' ? 1 : Math.max(1, Math.floor(ch / 0.35) - 1);
      // Open shelving is fully visible, so it uses the front finish for a feature look
      parts.push(<Shelves key="sh" x={x} y={y0} width={w} height={ch} depth={cd + FRONT} count={count} material={materials.front} />);
      break;
    }
  }

  const lighting: React.ReactNode[] = [];
  if (state.lighting && preset === 'wardrobe') {
    lighting.push(<Block key="led" size={[w - 2 * PANEL - 0.02, 0.008, 0.02]} position={[x + w / 2, y0 + ch - PANEL - 0.006, cd - 0.06]} material={materials.led} castShadow={false} />);
  }

  const totalH = isTallKitchen ? KITCHEN_TALL_HEIGHT / 100 : preset === 'living' ? y0 + ch + 0.03 : h;

  return (
    <group
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = '';
      }}
    >
      {plinth > 0 && <Block size={[w, plinth, cd - 0.06]} position={[x + w / 2, plinth / 2, (cd - 0.06) / 2]} material={materials.plinth} />}
      <Carcass x={x} y={y0} width={w} height={ch} depth={cd} material={module.type === 'open' ? materials.front : materials.body} />
      {parts}
      {lighting}
      {selected && (
        <mesh position={[x + w / 2, totalH / 2, d / 2 + 0.01]}>
          <boxGeometry args={[w + 0.01, totalH + 0.01, d + 0.04]} />
          <meshBasicMaterial color="#B38E5D" transparent opacity={0.08} depthWrite={false} />
          <Edges color="#B38E5D" />
        </mesh>
      )}
    </group>
  );
}

// Kitchen worktops over runs of base units, upper cabinets, sink fittings and the island
function KitchenExtras({ state, positions, materials }: { state: ConfiguratorState; positions: number[]; materials: Materials }) {
  const d = state.depth / 100;
  const topY = state.height / 100;
  const items: React.ReactNode[] = [];

  // Worktop runs split by tall units
  let runStart: number | null = null;
  let runEnd = 0;
  const flush = (key: string) => {
    if (runStart === null) return;
    const width = runEnd - runStart;
    items.push(<Block key={key} size={[width, 0.04, d + 0.02]} position={[runStart + width / 2, topY - 0.02, (d + 0.02) / 2]} material={materials.top} />);
    runStart = null;
  };
  state.modules.forEach((m, i) => {
    const x = positions[i];
    const w = m.width / 100;
    if (m.type === 'tall') {
      flush(`top${i}`);
      return;
    }
    if (runStart === null) runStart = x;
    runEnd = x + w;

    if (m.type === 'sink') {
      items.push(<Block key={`basin${i}`} size={[Math.min(w * 0.7, 0.6), 0.006, d * 0.55]} position={[x + w / 2, topY + 0.001, d * 0.5]} material={materials.steel} castShadow={false} />);
      items.push(
        <mesh key={`tap${i}`} position={[x + w / 2, topY + 0.16, 0.1]} material={materials.steel} castShadow>
          <cylinderGeometry args={[0.014, 0.018, 0.32, 16]} />
        </mesh>
      );
      items.push(<Block key={`spout${i}`} size={[0.024, 0.024, 0.2]} position={[x + w / 2, topY + 0.31, 0.2]} material={materials.steel} />);
    }

    if (state.upperCabinets) {
      const uy = UPPER_CABINET_BOTTOM / 100;
      const uh = UPPER_CABINET_HEIGHT / 100;
      const ud = UPPER_CABINET_DEPTH / 100;
      items.push(<Carcass key={`uc${i}`} x={x} y={uy} width={w} height={uh} depth={ud - FRONT} material={materials.body} />);
      items.push(<Shelves key={`us${i}`} x={x} y={uy} width={w} height={uh} depth={ud - FRONT} count={1} material={materials.body} />);
      items.push(
        <DoorPair key={`ud${i}`} x={x} y={uy} width={w} height={uh} z={ud - FRONT / 2} open={state.frontsOpen} material={materials.front} handle={materials.handle} handleOffset={0.1} handleLength={0.16} singleHinge={i % 2 === 0 ? 'left' : 'right'} />
      );
      if (state.lighting) {
        items.push(<Block key={`led${i}`} size={[w - 0.04, 0.008, 0.02]} position={[x + w / 2, uy - 0.005, ud - 0.06]} material={materials.led} castShadow={false} />);
      }
    }
  });
  flush('topEnd');

  if (state.island) {
    const iw = state.islandWidth / 100;
    const idp = state.islandDepth / 100;
    const centerZ = d + 1.1 + idp / 2;
    const bodyDepth = Math.max(0.4, idp - 0.3);
    // Storage faces the kitchen run, the far side overhangs for seating
    items.push(<Block key="iplinth" size={[iw - 0.08, 0.1, bodyDepth - 0.08]} position={[0, 0.05, centerZ - idp / 2 + bodyDepth / 2]} material={materials.plinth} />);
    items.push(<Block key="ibody" size={[iw, topY - 0.14, bodyDepth]} position={[0, 0.1 + (topY - 0.14) / 2, centerZ - idp / 2 + bodyDepth / 2]} material={materials.front} />);
    items.push(<Block key="itop" size={[iw + 0.02, 0.04, idp]} position={[0, topY - 0.02, centerZ]} material={materials.top} />);
  }

  return <>{items}</>;
}

function LivingExtras({ state, width, materials }: { state: ConfiguratorState; width: number; materials: Materials }) {
  const d = state.depth / 100;
  const topY = 0.22 + state.height / 100 - 0.03;
  const items: React.ReactNode[] = [
    <Block key="top" size={[width + 0.02, 0.03, d + 0.01]} position={[0, topY + 0.015, (d + 0.01) / 2]} material={materials.top} />
  ];
  if (state.lighting) {
    items.push(<Block key="led" size={[width - 0.06, 0.008, 0.02]} position={[0, 0.215, d - 0.08]} material={materials.led} castShadow={false} />);
  }
  if (state.wallPanel) {
    items.push(<Block key="panel" size={[width + 0.4, 2.6, 0.03]} position={[0, 1.3, -0.016]} material={materials.front} />);
  }
  // TV for scale
  const tvW = Math.min(1.6, Math.max(1.0, width * 0.5));
  items.push(<Block key="tv" size={[tvW, tvW * 0.5625, 0.03]} position={[0, topY + 0.35 + (tvW * 0.5625) / 2, 0.03]} material={materials.glass} />);
  return <>{items}</>;
}

function CameraRig({ state, view, fitKey }: { state: ConfiguratorState; view: CameraView; fitKey: number }) {
  const { camera } = useThree();
  const controls = useThree((s) => s.controls) as unknown as OrbitControlsImpl | null;
  const goal = useRef<{ position: THREE.Vector3; target: THREE.Vector3; active: boolean }>({
    position: new THREE.Vector3(),
    target: new THREE.Vector3(),
    active: false
  });

  useEffect(() => {
    const width = totalWidth(state) / 100;
    const d = state.depth / 100;
    const maxH = state.preset === 'kitchen' ? 2.2 : state.preset === 'wardrobe' ? state.height / 100 : 1.9;
    const islandDepth = state.preset === 'kitchen' && state.island ? 1.1 + state.islandDepth / 100 : 0;
    const dist = Math.max(width, maxH * 1.3) * 1.05 + 1.6 + islandDepth * 0.6;
    const g = goal.current;
    if (view === 'front') {
      g.position.set(0, maxH * 0.5, dist + 0.4);
      g.target.set(0, maxH * 0.5, 0);
    } else if (view === 'top') {
      g.position.set(0, dist * 1.25, d + islandDepth / 2 + 0.3);
      g.target.set(0, 0, d / 2 + islandDepth / 2);
    } else {
      // Higher vantage point when an island would otherwise hide the run behind it
      g.position.set(width * 0.38 + 0.6, maxH * 0.85 + 0.5 + islandDepth * 0.6, dist);
      g.target.set(0, maxH * 0.42, d / 2 + islandDepth * 0.25);
    }
    g.active = true;
    // Re-frame only on explicit triggers, not on every slider move
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, fitKey, state.preset]);

  useEffect(() => {
    if (!controls) return;
    const stop = () => {
      goal.current.active = false;
    };
    controls.addEventListener('start', stop);
    return () => controls.removeEventListener('start', stop);
  }, [controls]);

  useFrame(() => {
    const g = goal.current;
    if (!g.active || !controls) return;
    camera.position.lerp(g.position, 0.12);
    controls.target.lerp(g.target, 0.12);
    controls.update();
    if (camera.position.distanceTo(g.position) < 0.01) g.active = false;
  });

  return null;
}

function Furniture({ state, selectedId, onSelect }: Pick<ConfiguratorSceneProps, 'state' | 'selectedId' | 'onSelect'>) {
  const front = useFinishMaterial(resolveFinish(state.frontFinish, state.customFrontColor));
  const body = useFinishMaterial(resolveFinish(state.bodyFinish, state.customBodyColor));
  const top = useFinishMaterial(resolveFinish(state.topFinish, state.customFrontColor));
  const statics = useStaticMaterials(state.handles);
  const materials: Materials = { front, body, top, ...statics };

  const width = totalWidth(state) / 100;
  const positions: number[] = [];
  let cursor = -width / 2;
  for (const m of state.modules) {
    positions.push(cursor);
    cursor += m.width / 100;
  }

  return (
    <group>
      {state.modules.map((m, i) => (
        <ModuleView key={m.id} module={m} index={i} x={positions[i]} state={state} materials={materials} selected={m.id === selectedId} onSelect={onSelect} />
      ))}
      {state.preset === 'kitchen' && <KitchenExtras state={state} positions={positions} materials={materials} />}
      {state.preset === 'living' && <LivingExtras state={state} width={width} materials={materials} />}
    </group>
  );
}

export default function ConfiguratorScene({ state, selectedId, onSelect, view, fitKey, active }: ConfiguratorSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [2.5, 2, 5], fov: 38, near: 0.05, far: 100 }}
      onPointerMissed={() => onSelect(null)}
      onCreated={({ gl }) => {
        // Lets the browser restore the scene after it drops the GPU context instead of leaving it blank
        gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault());
      }}
    >
      <color attach="background" args={['#1D1B19']} />
      <fog attach="fog" args={['#1D1B19', 12, 26]} />
      <ambientLight intensity={0.5} />
      <hemisphereLight args={['#fff4e3', '#2a2623', 0.8]} />
      <directionalLight
        position={[3.5, 5.5, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      <directionalLight position={[-4, 3, 3]} intensity={0.45} />

      {/* Room */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#3a342e" roughness={0.92} />
      </mesh>
      <mesh position={[0, 3, -0.035]} receiveShadow>
        <planeGeometry args={[30, 6]} />
        <meshStandardMaterial color="#4d463f" roughness={0.95} />
      </mesh>

      <Furniture state={state} selectedId={selectedId} onSelect={onSelect} />

      <OrbitControls makeDefault enablePan={false} minDistance={1.2} maxDistance={14} maxPolarAngle={Math.PI / 2.05} />
      <CameraRig state={state} view={view} fitKey={fitKey} />
    </Canvas>
  );
}
