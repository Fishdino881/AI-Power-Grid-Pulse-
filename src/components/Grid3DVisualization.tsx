import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Html, Text, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Maximize2, RotateCw, Pause, Play, Layers, Eye, EyeOff, Zap, Wind, Sun, Atom } from 'lucide-react';

interface PowerNode {
  id: string;
  position: [number, number, number];
  type: 'solar' | 'wind' | 'nuclear' | 'gas' | 'coal' | 'hydro' | 'storage' | 'substation';
  capacity: number;
  output: number;
  name: string;
  status: 'online' | 'offline' | 'warning' | 'critical';
}

interface PowerFlow {
  from: string;
  to: string;
  amount: number;
  maxCapacity: number;
}

const EnergyNode = ({ node, showLabels, selected, onSelect }: { 
  node: PowerNode; 
  showLabels: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const color = useMemo(() => {
    const colors = {
      solar: '#facc15',
      wind: '#22c55e',
      nuclear: '#8b5cf6',
      gas: '#f97316',
      coal: '#64748b',
      hydro: '#06b6d4',
      storage: '#ec4899',
      substation: '#ffffff',
    };
    return colors[node.type];
  }, [node.type]);

  const statusColor = useMemo(() => {
    switch (node.status) {
      case 'online': return '#22c55e';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  }, [node.status]);

  useFrame((state) => {
    if (meshRef.current) {
      const pulseSpeed = node.status === 'critical' ? 4 : node.status === 'warning' ? 2 : 1;
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * pulseSpeed) * 0.1;
      meshRef.current.scale.setScalar(scale);
      
      if (selected || hovered) {
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 2;
      }
    }
    if (glowRef.current) {
      const glowScale = 1.5 + Math.sin(state.clock.getElapsedTime() * 2) * 0.3;
      glowRef.current.scale.setScalar(glowScale);
    }
  });

  const size = 0.3 + (node.output / node.capacity) * 0.5;
  const efficiency = (node.output / node.capacity) * 100;

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group 
        position={node.position}
        onClick={() => onSelect(node.id)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Glow effect */}
        <Sphere ref={glowRef} args={[size * 1.5, 16, 16]}>
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Main node */}
        <Sphere ref={meshRef} args={[size, 32, 32]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={selected ? 1 : 0.5}
            transparent
            opacity={0.9}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>

        {/* Status ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size + 0.1, size + 0.15, 32]} />
          <meshBasicMaterial color={statusColor} side={THREE.DoubleSide} />
        </mesh>

        {(hovered || selected || showLabels) && (
          <Html distanceFactor={10}>
            <div className={`glass-panel px-4 py-3 rounded-lg text-xs whitespace-nowrap pointer-events-none transition-all ${selected ? 'scale-110 border border-primary' : ''}`}>
              <div className="font-bold text-sm mb-1">{node.name}</div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-[10px]">{node.type.toUpperCase()}</Badge>
                <Badge 
                  variant={node.status === 'online' ? 'default' : node.status === 'warning' ? 'secondary' : 'destructive'}
                  className="text-[10px]"
                >
                  {node.status.toUpperCase()}
                </Badge>
              </div>
              <div className="space-y-1 text-muted-foreground">
                <div className="flex justify-between gap-4">
                  <span>Output:</span>
                  <span className="font-mono text-foreground">{node.output.toFixed(1)} GW</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Capacity:</span>
                  <span className="font-mono text-foreground">{node.capacity.toFixed(1)} GW</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Efficiency:</span>
                  <span className={`font-mono ${efficiency > 80 ? 'text-green-400' : efficiency > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {efficiency.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </Html>
        )}
        
        <pointLight color={color} intensity={selected ? 4 : 2} distance={4} />
      </group>
    </Float>
  );
};

const FlowLine = ({ from, to, amount, maxCapacity, nodes }: { 
  from: string; 
  to: string; 
  amount: number; 
  maxCapacity: number;
  nodes: PowerNode[];
}) => {
  const fromNode = nodes.find(n => n.id === from);
  const toNode = nodes.find(n => n.id === to);
  
  if (!fromNode || !toNode) return null;

  const points = useMemo(() => [
    new THREE.Vector3(...fromNode.position),
    new THREE.Vector3(...toNode.position)
  ], [fromNode, toNode]);

  const [offset, setOffset] = useState(0);

  useFrame(() => {
    setOffset((prev) => (prev + 0.02) % 1);
  });

  const utilization = amount / maxCapacity;
  const color = utilization > 0.9 ? '#ef4444' : utilization > 0.7 ? '#f59e0b' : '#22d3ee';
  const opacity = 0.3 + Math.sin(offset * Math.PI * 2) * 0.2;

  return (
    <>
      <Line
        points={points}
        color={color}
        lineWidth={1 + utilization * 3}
        transparent
        opacity={opacity}
        dashed
        dashSize={0.3}
        dashOffset={-offset * 5}
      />
      {/* Particles along the line */}
      {[0.25, 0.5, 0.75].map((t, i) => {
        const pos = new THREE.Vector3().lerpVectors(points[0], points[1], (t + offset) % 1);
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color={color} />
          </mesh>
        );
      })}
    </>
  );
};

const Grid3DScene = ({ 
  nodes, 
  flows, 
  showLabels, 
  selectedNode, 
  onSelectNode,
  isAnimating 
}: { 
  nodes: PowerNode[];
  flows: PowerFlow[];
  showLabels: boolean;
  selectedNode: string | null;
  onSelectNode: (id: string) => void;
  isAnimating: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current && isAnimating) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0ea5e9" />
      <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={0.5} />
      
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      
      {/* Grid floor */}
      <gridHelper args={[30, 30, '#0ea5e9', '#1e293b']} position={[0, -5, 0]} />
      
      {/* Energy nodes */}
      {nodes.map(node => (
        <EnergyNode 
          key={node.id} 
          node={node} 
          showLabels={showLabels}
          selected={selectedNode === node.id}
          onSelect={onSelectNode}
        />
      ))}
      
      {/* Power flows */}
      {flows.map((flow, idx) => (
        <FlowLine key={idx} {...flow} nodes={nodes} />
      ))}

      {/* Central hub indicator */}
      <mesh position={[0, -4.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[8, 8.2, 64]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

const Grid3DVisualization = () => {
  const [showLabels, setShowLabels] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [nodes, setNodes] = useState<PowerNode[]>([
    { id: '1', position: [-6, 2, 0], type: 'solar', capacity: 15.2, output: 12.8, name: 'California Solar Farm', status: 'online' },
    { id: '2', position: [0, 4, -5], type: 'wind', capacity: 8.5, output: 7.2, name: 'Texas Wind Array', status: 'online' },
    { id: '3', position: [5, 1, 3], type: 'nuclear', capacity: 22.4, output: 21.8, name: 'Arizona Nuclear Plant', status: 'online' },
    { id: '4', position: [-4, -2, 4], type: 'hydro', capacity: 6.8, output: 5.4, name: 'Oregon Hydro Dam', status: 'warning' },
    { id: '5', position: [3, -1, -4], type: 'gas', capacity: 12.6, output: 9.3, name: 'Nevada Gas Station', status: 'online' },
    { id: '6', position: [0, 0, 0], type: 'substation', capacity: 100, output: 78.5, name: 'Central Grid Hub', status: 'online' },
    { id: '7', position: [-3, 2, -3], type: 'solar', capacity: 7.4, output: 6.1, name: 'New Mexico Solar', status: 'online' },
    { id: '8', position: [4, 3, 1], type: 'coal', capacity: 18.9, output: 14.2, name: 'Wyoming Coal Plant', status: 'critical' },
    { id: '9', position: [-5, -1, -2], type: 'storage', capacity: 4.0, output: 2.8, name: 'Grid Battery Storage', status: 'online' },
    { id: '10', position: [6, 0, -2], type: 'wind', capacity: 5.5, output: 4.1, name: 'Oklahoma Wind Farm', status: 'online' },
  ]);

  const flows: PowerFlow[] = useMemo(() => [
    { from: '1', to: '6', amount: 10.5, maxCapacity: 15 },
    { from: '2', to: '6', amount: 6.8, maxCapacity: 10 },
    { from: '3', to: '6', amount: 18.3, maxCapacity: 20 },
    { from: '6', to: '4', amount: 3.8, maxCapacity: 8 },
    { from: '6', to: '5', amount: 8.2, maxCapacity: 12 },
    { from: '7', to: '6', amount: 5.5, maxCapacity: 8 },
    { from: '8', to: '6', amount: 12.4, maxCapacity: 15 },
    { from: '9', to: '6', amount: 2.4, maxCapacity: 4 },
    { from: '10', to: '6', amount: 3.9, maxCapacity: 6 },
  ], []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        output: Math.max(0, Math.min(node.capacity, node.output + (Math.random() - 0.5) * 0.5)),
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const totalOutput = nodes.reduce((acc, n) => acc + n.output, 0);
  const totalCapacity = nodes.reduce((acc, n) => acc + n.capacity, 0);
  const renewableOutput = nodes.filter(n => ['solar', 'wind', 'hydro'].includes(n.type))
    .reduce((acc, n) => acc + n.output, 0);

  const selectedNodeData = nodes.find(n => n.id === selectedNode);

  return (
    <Card className={`glass-panel p-6 transition-all ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-energy-renewable bg-clip-text text-transparent">
            3D Interactive Grid Network
          </h3>
          <p className="text-sm text-muted-foreground">Real-time power infrastructure visualization</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setShowLabels(!showLabels)}>
            {showLabels ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={() => setIsAnimating(!isAnimating)}>
            {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={() => setIsFullscreen(!isFullscreen)}>
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="glass-panel p-2 rounded-lg text-center">
          <p className="text-xs text-muted-foreground">Total Output</p>
          <p className="text-lg font-bold text-primary">{totalOutput.toFixed(1)} GW</p>
        </div>
        <div className="glass-panel p-2 rounded-lg text-center">
          <p className="text-xs text-muted-foreground">Capacity</p>
          <p className="text-lg font-bold">{totalCapacity.toFixed(1)} GW</p>
        </div>
        <div className="glass-panel p-2 rounded-lg text-center">
          <p className="text-xs text-muted-foreground">Renewable</p>
          <p className="text-lg font-bold text-energy-renewable">{((renewableOutput / totalOutput) * 100).toFixed(1)}%</p>
        </div>
        <div className="glass-panel p-2 rounded-lg text-center">
          <p className="text-xs text-muted-foreground">Utilization</p>
          <p className="text-lg font-bold text-status-warning">{((totalOutput / totalCapacity) * 100).toFixed(1)}%</p>
        </div>
      </div>
      
      <div className={`rounded-lg overflow-hidden bg-background/50 border border-border/50 ${isFullscreen ? 'h-[calc(100vh-250px)]' : 'h-[500px]'}`}>
        <Canvas camera={{ position: [15, 10, 15], fov: 50 }}>
          <color attach="background" args={['#050510']} />
          <fog attach="fog" args={['#050510', 15, 60]} />
          <Suspense fallback={null}>
            <Grid3DScene 
              nodes={nodes} 
              flows={flows} 
              showLabels={showLabels}
              selectedNode={selectedNode}
              onSelectNode={setSelectedNode}
              isAnimating={isAnimating}
            />
          </Suspense>
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={isAnimating}
            autoRotateSpeed={0.3}
            maxDistance={50}
            minDistance={8}
          />
        </Canvas>
      </div>

      {/* Selected node info */}
      {selectedNodeData && (
        <div className="mt-4 p-4 glass-panel rounded-lg border border-primary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {selectedNodeData.type === 'solar' && <Sun className="h-5 w-5 text-energy-solar" />}
              {selectedNodeData.type === 'wind' && <Wind className="h-5 w-5 text-energy-wind" />}
              {selectedNodeData.type === 'nuclear' && <Atom className="h-5 w-5 text-energy-nuclear" />}
              {!['solar', 'wind', 'nuclear'].includes(selectedNodeData.type) && <Zap className="h-5 w-5 text-primary" />}
              <div>
                <p className="font-bold">{selectedNodeData.name}</p>
                <p className="text-xs text-muted-foreground">{selectedNodeData.type.toUpperCase()} • {selectedNodeData.status.toUpperCase()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{selectedNodeData.output.toFixed(1)} GW</p>
              <p className="text-xs text-muted-foreground">of {selectedNodeData.capacity.toFixed(1)} GW capacity</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Legend */}
      <div className="mt-4 grid grid-cols-4 md:grid-cols-8 gap-2 text-xs">
        {[
          { type: 'solar', color: 'bg-energy-solar' },
          { type: 'wind', color: 'bg-energy-wind' },
          { type: 'nuclear', color: 'bg-energy-nuclear' },
          { type: 'hydro', color: 'bg-energy-hydro' },
          { type: 'gas', color: 'bg-energy-gas' },
          { type: 'coal', color: 'bg-energy-coal' },
          { type: 'storage', color: 'bg-pink-500' },
          { type: 'hub', color: 'bg-white' },
        ].map(item => (
          <div key={item.type} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
            <span className="capitalize">{item.type}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Grid3DVisualization;