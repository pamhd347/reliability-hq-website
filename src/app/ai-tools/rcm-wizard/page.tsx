'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

// Types
interface FunctionStatement {
  id: string;
  verb: string;
  noun: string;
  performance: string;
  fullStatement: string;
  selected: boolean;
}

interface FailureMode {
  id: string;
  functionId: string;
  mode: string;
  cause: string;
  localEffect: string;
  systemEffect: string;
  endEffect: string;
  consequence: string;
  consequenceCategory: 'hidden-safety' | 'hidden-operational' | 'safety' | 'environmental' | 'operational' | 'non-operational' | '';
  detection: string;
  pfInterval: string;
  taskInterval: string;
  recommendedTask: string;
  selected: boolean;
}

interface Analysis {
  id: string;
  equipmentName: string;
  equipmentType: string;
  equipmentDescription: string;
  operatingContext: string;
  functions: FunctionStatement[];
  failureModes: FailureMode[];
  createdAt: string;
  updatedAt: string;
}

// Equipment categories and types (hierarchical)
const equipmentCategories: { category: string; types: { value: string; label: string }[] }[] = [
  {
    category: 'Pumps',
    types: [
      { value: 'centrifugal-pump', label: 'Centrifugal Pump' },
      { value: 'positive-displacement-pump', label: 'Positive Displacement Pump' },
      { value: 'peristaltic-pump', label: 'Peristaltic Pump' },
      { value: 'diaphragm-pump', label: 'Diaphragm Pump' },
      { value: 'gear-pump', label: 'Gear Pump' },
      { value: 'screw-pump', label: 'Screw Pump' },
    ],
  },
  {
    category: 'Compressors',
    types: [
      { value: 'centrifugal-compressor', label: 'Centrifugal Compressor' },
      { value: 'reciprocating-compressor', label: 'Reciprocating Compressor' },
      { value: 'screw-compressor', label: 'Screw Compressor' },
      { value: 'scroll-compressor', label: 'Scroll Compressor' },
    ],
  },
  {
    category: 'Motors & Drives',
    types: [
      { value: 'ac-induction-motor', label: 'AC Induction Motor' },
      { value: 'dc-motor', label: 'DC Motor' },
      { value: 'synchronous-motor', label: 'Synchronous Motor' },
      { value: 'servo-motor', label: 'Servo Motor' },
      { value: 'vfd', label: 'Variable Frequency Drive' },
    ],
  },
  {
    category: 'Fans & Blowers',
    types: [
      { value: 'centrifugal-fan', label: 'Centrifugal Fan' },
      { value: 'axial-fan', label: 'Axial Fan' },
      { value: 'blower', label: 'Blower' },
    ],
  },
  {
    category: 'Valves',
    types: [
      { value: 'control-valve', label: 'Control Valve' },
      { value: 'isolation-valve', label: 'Isolation Valve (Gate/Ball)' },
      { value: 'relief-valve', label: 'Relief/Safety Valve' },
      { value: 'check-valve', label: 'Check Valve' },
      { value: 'butterfly-valve', label: 'Butterfly Valve' },
    ],
  },
  {
    category: 'Heat Exchangers',
    types: [
      { value: 'shell-tube-hx', label: 'Shell & Tube' },
      { value: 'plate-hx', label: 'Plate Heat Exchanger' },
      { value: 'air-cooled-hx', label: 'Air Cooled / Fin Fan' },
      { value: 'condenser', label: 'Condenser' },
      { value: 'evaporator', label: 'Evaporator' },
    ],
  },
  {
    category: 'Vessels & Tanks',
    types: [
      { value: 'pressure-vessel', label: 'Pressure Vessel' },
      { value: 'storage-tank', label: 'Storage Tank' },
      { value: 'reactor', label: 'Reactor' },
      { value: 'separator', label: 'Separator' },
      { value: 'filter-vessel', label: 'Filter Vessel' },
    ],
  },
  {
    category: 'Conveyors',
    types: [
      { value: 'belt-conveyor', label: 'Belt Conveyor' },
      { value: 'screw-conveyor', label: 'Screw Conveyor' },
      { value: 'chain-conveyor', label: 'Chain Conveyor' },
      { value: 'bucket-elevator', label: 'Bucket Elevator' },
    ],
  },
  {
    category: 'Instrumentation',
    types: [
      { value: 'pressure-transmitter', label: 'Pressure Transmitter' },
      { value: 'temperature-transmitter', label: 'Temperature Transmitter' },
      { value: 'flow-meter', label: 'Flow Meter' },
      { value: 'level-transmitter', label: 'Level Transmitter' },
      { value: 'analyzer', label: 'Analyzer' },
    ],
  },
  {
    category: 'Electrical',
    types: [
      { value: 'transformer', label: 'Transformer' },
      { value: 'switchgear', label: 'Switchgear / Breaker' },
      { value: 'ups', label: 'UPS System' },
      { value: 'generator', label: 'Generator' },
      { value: 'mcc', label: 'Motor Control Centre' },
    ],
  },
  {
    category: 'Piping & Fittings',
    types: [
      { value: 'piping', label: 'Piping System' },
      { value: 'expansion-joint', label: 'Expansion Joint' },
      { value: 'strainer', label: 'Strainer' },
      { value: 'steam-trap', label: 'Steam Trap' },
    ],
  },
  {
    category: 'Other',
    types: [
      { value: 'gearbox', label: 'Gearbox / Reducer' },
      { value: 'coupling', label: 'Coupling' },
      { value: 'crane-hoist', label: 'Crane / Hoist' },
      { value: 'agitator', label: 'Agitator / Mixer' },
      { value: 'other', label: 'Other Equipment' },
    ],
  },
];

// Failure mode database (condensed from failure modes tool)
const failureModeDatabase: Record<string, { component: string; modes: { mode: string; cause: string; effect: string; pfInterval: string; detection: string }[] }[]> = {
  'centrifugal-pump': [
    {
      component: 'Impeller',
      modes: [
        { mode: 'Impeller eroded', cause: 'Abrasive particles, cavitation', effect: 'Reduced flow rate and head', pfInterval: '2-6 months', detection: 'Performance monitoring, vibration' },
        { mode: 'Impeller cracked', cause: 'Fatigue, thermal shock', effect: 'Sudden loss of pumping', pfInterval: 'Days to weeks', detection: 'Vibration spike' },
      ],
    },
    {
      component: 'Mechanical Seal',
      modes: [
        { mode: 'Seal faces worn', cause: 'Normal wear, dry running', effect: 'Increasing leakage', pfInterval: '2-8 weeks', detection: 'Visual inspection, leakage monitoring' },
        { mode: 'Seal fails catastrophically', cause: 'Thermal shock, pressure spike', effect: 'Major leakage, shutdown', pfInterval: 'Hours to days', detection: 'Sudden leakage' },
      ],
    },
    {
      component: 'Bearings',
      modes: [
        { mode: 'Bearing worn', cause: 'Fatigue, misalignment', effect: 'Vibration, eventual seizure', pfInterval: '2-8 weeks', detection: 'Vibration analysis, temperature' },
        { mode: 'Bearing lubrication failure', cause: 'Insufficient/wrong lubricant', effect: 'Rapid wear, overheating', pfInterval: 'Days to 2 weeks', detection: 'Temperature rise' },
      ],
    },
  ],
  'electric-motor': [
    {
      component: 'Stator Windings',
      modes: [
        { mode: 'Winding insulation breakdown', cause: 'Age, overheating, contamination', effect: 'Motor trips, potential fire', pfInterval: '2-8 weeks', detection: 'Insulation testing, PD monitoring' },
        { mode: 'Winding overheated', cause: 'Overload, poor ventilation', effect: 'Accelerated degradation', pfInterval: '1-6 months', detection: 'Temperature monitoring' },
      ],
    },
    {
      component: 'Bearings',
      modes: [
        { mode: 'Bearing worn', cause: 'Fatigue, lubrication issues', effect: 'Vibration, eventual seizure', pfInterval: '2-8 weeks', detection: 'Vibration analysis, temperature' },
        { mode: 'Bearing electrical pitting', cause: 'VFD-induced shaft currents', effect: 'Premature failure', pfInterval: '1-6 months', detection: 'High-frequency vibration' },
      ],
    },
    {
      component: 'Cooling System',
      modes: [
        { mode: 'Cooling fan damaged', cause: 'Fatigue, foreign object', effect: 'Motor overheating', pfInterval: '1-4 weeks', detection: 'Visual, temperature rise' },
      ],
    },
  ],
  'control-valve': [
    {
      component: 'Trim (Plug & Seat)',
      modes: [
        { mode: 'Plug/seat worn', cause: 'Erosion, cavitation', effect: 'Valve leaks, poor control', pfInterval: '3-12 months', detection: 'Valve signature testing' },
        { mode: 'Trim cavitation damage', cause: 'High pressure drop', effect: 'Rapid erosion, noise', pfInterval: '1-6 months', detection: 'Noise increase' },
      ],
    },
    {
      component: 'Packing',
      modes: [
        { mode: 'Packing worn/leaking', cause: 'Normal wear, stem scoring', effect: 'External leakage', pfInterval: '2-8 weeks', detection: 'Visual inspection' },
      ],
    },
    {
      component: 'Actuator',
      modes: [
        { mode: 'Diaphragm ruptured', cause: 'Age, over-pressure', effect: 'Loss of control', pfInterval: 'Hours to days', detection: 'Air consumption increase' },
        { mode: 'Actuator spring broken', cause: 'Fatigue, corrosion', effect: 'Loss of fail-safe', pfInterval: 'Sudden', detection: 'Stroke testing' },
      ],
    },
  ],
  'compressor': [
    {
      component: 'Impeller/Rotor',
      modes: [
        { mode: 'Impeller eroded', cause: 'Wet gas, particulates', effect: 'Reduced efficiency', pfInterval: '3-12 months', detection: 'Performance monitoring' },
        { mode: 'Rotor imbalance', cause: 'Fouling, blade damage', effect: 'High vibration', pfInterval: '1-4 weeks', detection: 'Vibration analysis' },
      ],
    },
    {
      component: 'Bearings',
      modes: [
        { mode: 'Bearing wiped', cause: 'Oil starvation, overload', effect: 'High temperature, potential seizure', pfInterval: 'Hours to days', detection: 'Temperature, vibration' },
      ],
    },
    {
      component: 'Seals',
      modes: [
        { mode: 'Primary seal leakage high', cause: 'Face damage, contamination', effect: 'Increased seal gas, hazard', pfInterval: '2-8 weeks', detection: 'Seal gas flow monitoring' },
      ],
    },
  ],
  'heat-exchanger': [
    {
      component: 'Tubes',
      modes: [
        { mode: 'Tubes fouled', cause: 'Scaling, biological growth', effect: 'Reduced heat transfer', pfInterval: '1-12 months', detection: 'Performance monitoring' },
        { mode: 'Tube leaked', cause: 'Corrosion, vibration fatigue', effect: 'Cross-contamination', pfInterval: 'Sudden after degradation', detection: 'Pressure test, leak test' },
      ],
    },
    {
      component: 'Shell',
      modes: [
        { mode: 'Shell corroded', cause: 'Internal/external corrosion', effect: 'Wall thinning, potential breach', pfInterval: '12-60 months', detection: 'UT thickness testing' },
      ],
    },
    {
      component: 'Gaskets',
      modes: [
        { mode: 'Gasket leaking', cause: 'Age, bolt relaxation', effect: 'External leakage', pfInterval: '1-12 months', detection: 'Visual inspection' },
      ],
    },
  ],
};

// Generic failure mode templates by equipment category
const genericFailureModes: Record<string, { component: string; modes: { mode: string; cause: string; effect: string; pfInterval: string; detection: string }[] }[]> = {
  'rotating': [
    {
      component: 'Bearings',
      modes: [
        { mode: 'Bearing worn/failed', cause: 'Fatigue, lubrication failure, misalignment', effect: 'Vibration, overheating, seizure', pfInterval: '2-8 weeks', detection: 'Vibration analysis, temperature monitoring' },
      ],
    },
    {
      component: 'Shaft/Rotor',
      modes: [
        { mode: 'Shaft bent/damaged', cause: 'Thermal distortion, overload, impact', effect: 'Vibration, seal damage, bearing wear', pfInterval: '1-4 weeks', detection: 'Vibration analysis, runout measurement' },
        { mode: 'Rotor imbalance', cause: 'Wear, buildup, damage', effect: 'High vibration, bearing wear', pfInterval: '2-8 weeks', detection: 'Vibration analysis' },
      ],
    },
    {
      component: 'Seals',
      modes: [
        { mode: 'Seal leaking', cause: 'Wear, damage, incorrect installation', effect: 'External leakage, contamination', pfInterval: '2-8 weeks', detection: 'Visual inspection, leakage monitoring' },
      ],
    },
    {
      component: 'Coupling',
      modes: [
        { mode: 'Coupling worn/failed', cause: 'Misalignment, fatigue, overload', effect: 'Vibration, power transmission loss', pfInterval: '1-6 months', detection: 'Visual inspection, vibration' },
      ],
    },
  ],
  'electrical': [
    {
      component: 'Windings/Coils',
      modes: [
        { mode: 'Insulation breakdown', cause: 'Age, overheating, moisture, contamination', effect: 'Short circuit, trip, fire risk', pfInterval: '2-12 weeks', detection: 'Insulation testing, thermal imaging' },
      ],
    },
    {
      component: 'Connections',
      modes: [
        { mode: 'Connection loose/corroded', cause: 'Vibration, thermal cycling, corrosion', effect: 'Overheating, arcing, failure', pfInterval: '1-4 weeks', detection: 'Thermal imaging, resistance testing' },
      ],
    },
    {
      component: 'Cooling',
      modes: [
        { mode: 'Cooling system failed', cause: 'Fan failure, blocked airways, coolant loss', effect: 'Overheating, derating, trip', pfInterval: '1-4 weeks', detection: 'Temperature monitoring, visual inspection' },
      ],
    },
    {
      component: 'Protection',
      modes: [
        { mode: 'Protection device failed', cause: 'Age, mechanical failure, incorrect setting', effect: 'No trip on fault, equipment damage', pfInterval: 'Unknown', detection: 'Functional testing' },
      ],
    },
  ],
  'valve': [
    {
      component: 'Sealing (Seat/Plug)',
      modes: [
        { mode: 'Seat/plug worn', cause: 'Erosion, corrosion, cavitation', effect: 'Through leakage, poor control', pfInterval: '3-12 months', detection: 'Leak testing, valve signature' },
      ],
    },
    {
      component: 'Stem/Packing',
      modes: [
        { mode: 'Packing leaking', cause: 'Wear, incorrect adjustment', effect: 'External leakage', pfInterval: '2-8 weeks', detection: 'Visual inspection' },
        { mode: 'Stem damaged', cause: 'Corrosion, scoring, bending', effect: 'Sticking, leakage', pfInterval: '1-6 months', detection: 'Stroke testing, visual' },
      ],
    },
    {
      component: 'Actuator',
      modes: [
        { mode: 'Actuator failed', cause: 'Diaphragm rupture, spring break, air loss', effect: 'Valve stuck, loss of control', pfInterval: 'Hours to weeks', detection: 'Stroke testing, air consumption' },
      ],
    },
    {
      component: 'Positioner',
      modes: [
        { mode: 'Positioner malfunction', cause: 'Electronics failure, calibration drift', effect: 'Poor control, hunting', pfInterval: '1-6 months', detection: 'Control response, diagnostics' },
      ],
    },
  ],
  'vessel': [
    {
      component: 'Shell/Walls',
      modes: [
        { mode: 'Wall thinning/corrosion', cause: 'Internal/external corrosion, erosion', effect: 'Leak risk, structural weakness', pfInterval: '6-60 months', detection: 'UT thickness, visual inspection' },
      ],
    },
    {
      component: 'Nozzles/Connections',
      modes: [
        { mode: 'Nozzle cracked/corroded', cause: 'Fatigue, corrosion, thermal stress', effect: 'Leakage', pfInterval: '6-24 months', detection: 'Visual, NDT inspection' },
      ],
    },
    {
      component: 'Internals',
      modes: [
        { mode: 'Internals damaged/fouled', cause: 'Corrosion, erosion, buildup', effect: 'Reduced performance, blockage', pfInterval: '3-24 months', detection: 'Internal inspection, performance' },
      ],
    },
    {
      component: 'Relief Device',
      modes: [
        { mode: 'Relief device failed', cause: 'Corrosion, seat damage, spring failure', effect: 'Over-pressure risk or spurious relief', pfInterval: 'Unknown', detection: 'Functional testing, pop test' },
      ],
    },
  ],
  'instrument': [
    {
      component: 'Sensor/Element',
      modes: [
        { mode: 'Sensor failed/drifted', cause: 'Age, contamination, damage, temperature', effect: 'Incorrect reading, control upset', pfInterval: '1-12 months', detection: 'Calibration check, comparison' },
      ],
    },
    {
      component: 'Process Connection',
      modes: [
        { mode: 'Process connection blocked', cause: 'Fouling, freezing, corrosion', effect: 'No/incorrect reading', pfInterval: '1-6 months', detection: 'Comparison, impulse line check' },
      ],
    },
    {
      component: 'Electronics/Transmitter',
      modes: [
        { mode: 'Electronics failed', cause: 'Age, power surge, moisture', effect: 'No output, incorrect signal', pfInterval: 'Variable', detection: 'Signal monitoring, diagnostics' },
      ],
    },
  ],
  'conveyor': [
    {
      component: 'Belt/Chain',
      modes: [
        { mode: 'Belt/chain worn', cause: 'Normal wear, misalignment, overload', effect: 'Slipping, breakage risk', pfInterval: '2-12 weeks', detection: 'Visual inspection, tension check' },
        { mode: 'Belt/chain broken', cause: 'Fatigue, damage, overload', effect: 'Complete stoppage', pfInterval: 'Days to weeks', detection: 'Visual, tension monitoring' },
      ],
    },
    {
      component: 'Drive',
      modes: [
        { mode: 'Drive motor/gearbox failed', cause: 'Overload, lubrication, electrical', effect: 'Conveyor stopped', pfInterval: '2-8 weeks', detection: 'Vibration, temperature, current' },
      ],
    },
    {
      component: 'Rollers/Pulleys',
      modes: [
        { mode: 'Roller/pulley seized', cause: 'Bearing failure, contamination', effect: 'Belt damage, fire risk', pfInterval: '1-8 weeks', detection: 'Visual, thermal, vibration' },
      ],
    },
    {
      component: 'Structure',
      modes: [
        { mode: 'Structure corroded/damaged', cause: 'Corrosion, impact, overload', effect: 'Misalignment, collapse risk', pfInterval: '6-24 months', detection: 'Visual inspection' },
      ],
    },
  ],
  'piping': [
    {
      component: 'Pipe Wall',
      modes: [
        { mode: 'Wall thinning', cause: 'Corrosion, erosion, flow-accelerated corrosion', effect: 'Leak risk', pfInterval: '6-60 months', detection: 'UT thickness measurement' },
      ],
    },
    {
      component: 'Joints/Flanges',
      modes: [
        { mode: 'Joint leaking', cause: 'Gasket failure, bolt relaxation, damage', effect: 'External leakage', pfInterval: '1-12 months', detection: 'Visual, leak detection' },
      ],
    },
    {
      component: 'Supports',
      modes: [
        { mode: 'Support failed/corroded', cause: 'Corrosion, overload, vibration', effect: 'Pipe stress, movement', pfInterval: '6-24 months', detection: 'Visual inspection' },
      ],
    },
  ],
};

// Helper functions to auto-populate analysis fields
function generateSystemEffect(localEffect: string, equipmentName: string): string {
  const effect = localEffect.toLowerCase();
  
  if (effect.includes('vibration') || effect.includes('seizure')) {
    return `${equipmentName} performance degraded, potential secondary damage to connected equipment`;
  }
  if (effect.includes('leakage') || effect.includes('leak')) {
    return `Process fluid loss, potential contamination of surrounding area`;
  }
  if (effect.includes('overheat') || effect.includes('temperature')) {
    return `${equipmentName} may trip on high temperature, risk of thermal damage to components`;
  }
  if (effect.includes('reduced') || effect.includes('loss') || effect.includes('poor')) {
    return `System throughput or efficiency reduced, downstream process affected`;
  }
  if (effect.includes('trip') || effect.includes('shutdown') || effect.includes('stop')) {
    return `${equipmentName} unavailable, system capacity reduced or lost`;
  }
  if (effect.includes('fire') || effect.includes('hazard')) {
    return `Potential safety hazard, may require emergency response`;
  }
  
  return `${equipmentName} function impaired, system performance may be affected`;
}

function generateEndEffect(localEffect: string, equipmentName: string): string {
  const effect = localEffect.toLowerCase();
  
  if (effect.includes('seizure') || effect.includes('catastrophic') || effect.includes('fire')) {
    return `Unplanned shutdown, significant repair time and cost, potential safety incident`;
  }
  if (effect.includes('leakage') || effect.includes('leak')) {
    return `Environmental cleanup required, repair needed, potential regulatory concern`;
  }
  if (effect.includes('reduced') || effect.includes('degraded')) {
    return `Production loss or quality impact until repaired, increased operating costs`;
  }
  if (effect.includes('trip') || effect.includes('shutdown')) {
    return `Unplanned outage, production loss, repair cost`;
  }
  if (effect.includes('vibration')) {
    return `Progressive damage if not addressed, eventual failure requiring repair`;
  }
  
  return `Repair or replacement required, associated downtime and cost`;
}

function generateRecommendedTask(detection: string, pfInterval: string): string {
  const detect = detection.toLowerCase();
  const taskInterval = calculateTaskInterval(pfInterval);
  
  if (detect.includes('vibration')) {
    return `Vibration monitoring every ${taskInterval}`;
  }
  if (detect.includes('temperature') || detect.includes('thermal')) {
    return `Temperature monitoring/thermal survey every ${taskInterval}`;
  }
  if (detect.includes('visual')) {
    return `Visual inspection every ${taskInterval}`;
  }
  if (detect.includes('oil analysis') || detect.includes('lubricant')) {
    return `Oil analysis every ${taskInterval}`;
  }
  if (detect.includes('performance')) {
    return `Performance monitoring/trending - continuous or every ${taskInterval}`;
  }
  if (detect.includes('test') || detect.includes('stroke')) {
    return `Functional test every ${taskInterval}`;
  }
  if (detect.includes('insulation')) {
    return `Insulation resistance test every ${taskInterval}`;
  }
  if (detect.includes('leak') || detect.includes('leakage')) {
    return `Leak inspection every ${taskInterval}`;
  }
  if (detect.includes('thickness') || detect.includes('ut')) {
    return `UT thickness measurement every ${taskInterval}`;
  }
  
  return `Condition monitoring (${detection}) every ${taskInterval}`;
}

function calculateTaskInterval(pfInterval: string): string {
  // Extract numbers from P-F interval and halve them
  const match = pfInterval.match(/(\d+)[-–]?(\d+)?\s*(weeks?|months?|days?|hours?)/i);
  
  if (!match) return pfInterval;
  
  const minValue = parseInt(match[1]);
  const maxValue = match[2] ? parseInt(match[2]) : minValue;
  const unit = match[3].toLowerCase();
  
  // Use half of the minimum P-F interval
  const taskMin = Math.max(1, Math.floor(minValue / 2));
  const taskMax = Math.max(1, Math.floor(maxValue / 2));
  
  if (taskMin === taskMax) {
    return `${taskMin} ${unit}`;
  }
  return `${taskMin}-${taskMax} ${unit}`;
}

// Function to get failure modes for any equipment type
function getFailureModesForEquipment(equipmentType: string): { component: string; modes: { mode: string; cause: string; effect: string; pfInterval: string; detection: string }[] }[] {
  // First check for exact match in database
  if (failureModeDatabase[equipmentType]) {
    return failureModeDatabase[equipmentType];
  }
  
  // Map equipment types to generic categories
  const eqType = equipmentType.toLowerCase();
  
  // Pumps, compressors, motors, fans, blowers, gearboxes, agitators = rotating
  if (eqType.includes('pump') || eqType.includes('compressor') || eqType.includes('motor') || 
      eqType.includes('fan') || eqType.includes('blower') || eqType.includes('gearbox') || 
      eqType.includes('agitator') || eqType === 'coupling') {
    return genericFailureModes['rotating'];
  }
  
  // Valves
  if (eqType.includes('valve')) {
    return genericFailureModes['valve'];
  }
  
  // Electrical equipment
  if (eqType === 'transformer' || eqType === 'switchgear' || eqType === 'ups' || 
      eqType === 'generator' || eqType === 'mcc' || eqType === 'vfd') {
    return genericFailureModes['electrical'];
  }
  
  // Heat exchangers, vessels, tanks
  if (eqType.includes('hx') || eqType === 'condenser' || eqType === 'evaporator' ||
      eqType.includes('vessel') || eqType.includes('tank') || eqType === 'reactor' || 
      eqType === 'separator' || eqType.includes('filter')) {
    return [...genericFailureModes['vessel']];
  }
  
  // Conveyors
  if (eqType.includes('conveyor') || eqType === 'bucket-elevator') {
    return genericFailureModes['conveyor'];
  }
  
  // Instrumentation
  if (eqType.includes('transmitter') || eqType.includes('meter') || eqType === 'analyzer') {
    return genericFailureModes['instrument'];
  }
  
  // Piping
  if (eqType === 'piping' || eqType === 'expansion-joint' || eqType === 'strainer' || eqType === 'steam-trap') {
    return genericFailureModes['piping'];
  }
  
  // Default: return rotating + vessel basics
  return [
    ...genericFailureModes['rotating'].slice(0, 2),
    { component: 'General', modes: [
      { mode: 'Structural failure', cause: 'Fatigue, corrosion, overload', effect: 'Equipment damage, loss of function', pfInterval: '3-12 months', detection: 'Visual inspection, NDT' },
      { mode: 'Performance degraded', cause: 'Wear, fouling, misadjustment', effect: 'Reduced output, efficiency loss', pfInterval: '1-6 months', detection: 'Performance monitoring' },
    ]},
  ];
}

const consequenceCategories = {
  'hidden-safety': { label: 'Hidden - Safety', color: 'bg-red-500', description: 'Hidden failure protecting against safety hazard' },
  'hidden-operational': { label: 'Hidden - Operational', color: 'bg-orange-500', description: 'Hidden failure protecting against operational event' },
  'safety': { label: 'Safety', color: 'bg-red-600', description: 'Could cause injury or death' },
  'environmental': { label: 'Environmental', color: 'bg-green-600', description: 'Could breach environmental standards' },
  'operational': { label: 'Operational', color: 'bg-amber-500', description: 'Direct impact on production/output' },
  'non-operational': { label: 'Non-Operational', color: 'bg-blue-500', description: 'Only repair cost, no other consequence' },
};

const steps = [
  { id: 1, name: 'Equipment', description: 'Define the equipment' },
  { id: 2, name: 'Functions', description: 'What must it do?' },
  { id: 3, name: 'Failure Modes', description: 'How can it fail?' },
  { id: 4, name: 'Analysis', description: 'Classify & assess' },
  { id: 5, name: 'Summary', description: 'Review & export' },
];

export default function RCMWizardPage() {
  const { user, loading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [hasAccess, setHasAccess] = useState(true);  // Free for now - no login required
  const [checkingAccess, setCheckingAccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentModeIndex, setCurrentModeIndex] = useState(0);
  
  // Analysis state
  const [analysis, setAnalysis] = useState<Analysis>({
    id: crypto.randomUUID(),
    equipmentName: '',
    equipmentType: '',
    equipmentDescription: '',
    operatingContext: '',
    functions: [],
    failureModes: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Check if user has access (for now, just check if logged in - payment check comes later)
  useEffect(() => {
    if (!authLoading) {
      // For now, grant access to logged-in users (we'll add Gumroad check later)
      setHasAccess(!!user);
      setCheckingAccess(false);
    }
  }, [user, authLoading]);

  // Step 1: Equipment Setup
  const renderEquipmentStep = () => {
    const selectedCategoryData = equipmentCategories.find(c => c.category === selectedCategory);
    
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Equipment Name *</label>
          <input
            type="text"
            value={analysis.equipmentName}
            onChange={(e) => setAnalysis({ ...analysis, equipmentName: e.target.value })}
            className="w-full px-4 py-3 border border-light-grey rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
            placeholder="e.g., Cooling Water Pump P-101A"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Equipment Category *</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {equipmentCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => {
                  setSelectedCategory(cat.category);
                  // Clear equipment type if changing category
                  if (selectedCategory !== cat.category) {
                    setAnalysis({ ...analysis, equipmentType: '' });
                  }
                }}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  selectedCategory === cat.category
                    ? 'border-deep-teal bg-deep-teal/5'
                    : 'border-light-grey hover:border-mid-grey'
                }`}
              >
                <span className={`text-sm font-medium ${
                  selectedCategory === cat.category ? 'text-deep-teal' : 'text-charcoal'
                }`}>
                  {cat.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {selectedCategoryData && (
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Equipment Type *</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {selectedCategoryData.types.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setAnalysis({ ...analysis, equipmentType: type.value })}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    analysis.equipmentType === type.value
                      ? 'border-deep-teal bg-deep-teal/5'
                      : 'border-light-grey hover:border-mid-grey'
                  }`}
                >
                  <span className={`text-sm font-medium ${
                    analysis.equipmentType === type.value ? 'text-deep-teal' : 'text-charcoal'
                  }`}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Equipment Description</label>
          <textarea
            value={analysis.equipmentDescription}
            onChange={(e) => setAnalysis({ ...analysis, equipmentDescription: e.target.value })}
            className="w-full px-4 py-3 border border-light-grey rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
            rows={3}
            placeholder="Brief description of the equipment, its role, and key specifications..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Operating Context</label>
          <textarea
            value={analysis.operatingContext}
            onChange={(e) => setAnalysis({ ...analysis, operatingContext: e.target.value })}
            className="w-full px-4 py-3 border border-light-grey rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
            rows={3}
            placeholder="How is this equipment used? What are the operating conditions, duty cycle, environment?"
          />
        </div>
      </div>
    );
  };

  // Step 2: Functions
  const renderFunctionsStep = () => {
    const addFunction = () => {
      const newFunc: FunctionStatement = {
        id: crypto.randomUUID(),
        verb: '',
        noun: '',
        performance: '',
        fullStatement: '',
        selected: true,
      };
      setAnalysis({ ...analysis, functions: [...analysis.functions, newFunc] });
    };

    const updateFunction = (id: string, updates: Partial<FunctionStatement>) => {
      setAnalysis({
        ...analysis,
        functions: analysis.functions.map(f => {
          if (f.id === id) {
            const updated = { ...f, ...updates };
            // Auto-generate full statement
            if (updates.verb !== undefined || updates.noun !== undefined || updates.performance !== undefined) {
              const verb = updates.verb ?? f.verb;
              const noun = updates.noun ?? f.noun;
              const performance = updates.performance ?? f.performance;
              updated.fullStatement = `To ${verb} ${noun}${performance ? ` ${performance}` : ''}`;
            }
            return updated;
          }
          return f;
        }),
      });
    };

    const removeFunction = (id: string) => {
      setAnalysis({ ...analysis, functions: analysis.functions.filter(f => f.id !== id) });
    };

    const suggestFunctions = () => {
      // Generate suggested functions based on equipment type
      const suggestions: Partial<FunctionStatement>[] = [];
      const eqType = analysis.equipmentType;
      
      // Pumps (all types)
      if (eqType.includes('pump')) {
        suggestions.push(
          { verb: 'transfer', noun: 'fluid from source to destination', performance: 'at a flow rate of [X] m³/h' },
          { verb: 'maintain', noun: 'discharge pressure', performance: 'at [X] bar minimum' },
          { verb: 'contain', noun: 'pumped fluid', performance: 'with zero external leakage' },
        );
      }
      // Compressors (all types)
      else if (eqType.includes('compressor')) {
        suggestions.push(
          { verb: 'compress', noun: 'gas', performance: 'from [X] to [Y] bar' },
          { verb: 'deliver', noun: 'compressed gas', performance: 'at [X] m³/h flow rate' },
          { verb: 'contain', noun: 'process gas', performance: 'with no external leakage' },
        );
      }
      // Motors (all types)
      else if (eqType.includes('motor')) {
        suggestions.push(
          { verb: 'convert', noun: 'electrical energy to mechanical energy', performance: 'at [X] kW output' },
          { verb: 'drive', noun: 'connected equipment', performance: 'at [X] RPM' },
          { verb: 'start', noun: 'on demand', performance: 'within [X] seconds of command' },
        );
      }
      // VFD
      else if (eqType === 'vfd') {
        suggestions.push(
          { verb: 'control', noun: 'motor speed', performance: 'between [X] and [Y] Hz' },
          { verb: 'provide', noun: 'soft start capability', performance: 'limiting inrush current to [X] A' },
          { verb: 'protect', noun: 'motor from overload', performance: 'by tripping at [X]% overload' },
        );
      }
      // Fans and Blowers
      else if (eqType.includes('fan') || eqType === 'blower') {
        suggestions.push(
          { verb: 'move', noun: 'air/gas', performance: 'at [X] m³/h flow rate' },
          { verb: 'maintain', noun: 'differential pressure', performance: 'at [X] Pa minimum' },
          { verb: 'operate', noun: 'continuously', performance: 'without excessive vibration' },
        );
      }
      // Control Valves
      else if (eqType === 'control-valve') {
        suggestions.push(
          { verb: 'regulate', noun: 'flow rate', performance: 'between 0-100% of design flow' },
          { verb: 'respond', noun: 'to control signal', performance: 'within [X] seconds' },
          { verb: 'fail', noun: 'to safe position', performance: 'on loss of signal/air' },
        );
      }
      // Isolation Valves
      else if (eqType === 'isolation-valve') {
        suggestions.push(
          { verb: 'isolate', noun: 'process flow', performance: 'achieving bubble-tight shutoff' },
          { verb: 'open/close', noun: 'on demand', performance: 'within [X] seconds' },
          { verb: 'contain', noun: 'process fluid', performance: 'with no external leakage' },
        );
      }
      // Relief/Safety Valves
      else if (eqType === 'relief-valve') {
        suggestions.push(
          { verb: 'relieve', noun: 'excess pressure', performance: 'at set pressure of [X] bar' },
          { verb: 'reseat', noun: 'after relief', performance: 'at [X]% of set pressure' },
          { verb: 'remain', noun: 'closed', performance: 'during normal operation' },
        );
      }
      // Check Valves
      else if (eqType === 'check-valve') {
        suggestions.push(
          { verb: 'prevent', noun: 'reverse flow', performance: 'with zero backflow' },
          { verb: 'allow', noun: 'forward flow', performance: 'with minimal pressure drop' },
          { verb: 'close', noun: 'on flow reversal', performance: 'without water hammer' },
        );
      }
      // Butterfly Valves
      else if (eqType === 'butterfly-valve') {
        suggestions.push(
          { verb: 'control/isolate', noun: 'flow', performance: 'from 0-100% opening' },
          { verb: 'operate', noun: 'on demand', performance: 'within [X] seconds quarter turn' },
          { verb: 'seal', noun: 'against process fluid', performance: 'to specified leakage class' },
        );
      }
      // Heat Exchangers (all types)
      else if (eqType.includes('hx') || eqType === 'condenser' || eqType === 'evaporator') {
        suggestions.push(
          { verb: 'transfer', noun: 'heat between fluids', performance: 'at [X] kW duty' },
          { verb: 'maintain', noun: 'outlet temperature', performance: 'at [X]°C ± [Y]°C' },
          { verb: 'separate', noun: 'process streams', performance: 'with no cross-contamination' },
        );
      }
      // Vessels and Tanks
      else if (eqType.includes('vessel') || eqType.includes('tank') || eqType === 'reactor' || eqType === 'separator') {
        suggestions.push(
          { verb: 'contain', noun: 'process fluid', performance: 'at [X] bar design pressure' },
          { verb: 'maintain', noun: 'structural integrity', performance: 'under all operating conditions' },
          { verb: 'provide', noun: 'sufficient capacity', performance: 'of [X] m³ working volume' },
        );
      }
      // Filter Vessel
      else if (eqType === 'filter-vessel') {
        suggestions.push(
          { verb: 'remove', noun: 'particulates from fluid', performance: 'to [X] micron rating' },
          { verb: 'maintain', noun: 'flow capacity', performance: 'at [X] m³/h with clean element' },
          { verb: 'indicate', noun: 'element condition', performance: 'via differential pressure' },
        );
      }
      // Conveyors
      else if (eqType.includes('conveyor') || eqType === 'bucket-elevator') {
        suggestions.push(
          { verb: 'transport', noun: 'material', performance: 'at [X] tonnes/hour' },
          { verb: 'operate', noun: 'continuously', performance: 'for [X] hours per day' },
          { verb: 'contain', noun: 'transported material', performance: 'with minimal spillage' },
        );
      }
      // Instrumentation - Transmitters
      else if (eqType.includes('transmitter') || eqType.includes('meter')) {
        suggestions.push(
          { verb: 'measure', noun: 'process variable', performance: 'with accuracy of ±[X]%' },
          { verb: 'transmit', noun: 'signal to control system', performance: '4-20mA / HART / digital' },
          { verb: 'operate', noun: 'within specified range', performance: '[X] to [Y] units' },
        );
      }
      // Analyzer
      else if (eqType === 'analyzer') {
        suggestions.push(
          { verb: 'analyze', noun: 'process sample', performance: 'with accuracy of ±[X]%' },
          { verb: 'provide', noun: 'continuous measurement', performance: 'with response time of [X] seconds' },
          { verb: 'self-calibrate', noun: 'automatically', performance: 'every [X] hours' },
        );
      }
      // Transformer
      else if (eqType === 'transformer') {
        suggestions.push(
          { verb: 'transform', noun: 'voltage', performance: 'from [X] kV to [Y] kV' },
          { verb: 'supply', noun: 'electrical load', performance: 'at [X] MVA capacity' },
          { verb: 'isolate', noun: 'primary from secondary', performance: 'per insulation class' },
        );
      }
      // Switchgear
      else if (eqType === 'switchgear') {
        suggestions.push(
          { verb: 'interrupt', noun: 'fault current', performance: 'up to [X] kA' },
          { verb: 'isolate', noun: 'electrical circuit', performance: 'on demand' },
          { verb: 'protect', noun: 'downstream equipment', performance: 'via protection relays' },
        );
      }
      // UPS
      else if (eqType === 'ups') {
        suggestions.push(
          { verb: 'provide', noun: 'uninterrupted power', performance: 'at [X] kVA capacity' },
          { verb: 'maintain', noun: 'battery charge', performance: 'for [X] minutes autonomy' },
          { verb: 'transfer', noun: 'to bypass', performance: 'without interruption' },
        );
      }
      // Generator
      else if (eqType === 'generator') {
        suggestions.push(
          { verb: 'generate', noun: 'electrical power', performance: 'at [X] kW output' },
          { verb: 'start', noun: 'on loss of mains', performance: 'within [X] seconds' },
          { verb: 'maintain', noun: 'frequency and voltage', performance: 'within ±[X]%' },
        );
      }
      // MCC
      else if (eqType === 'mcc') {
        suggestions.push(
          { verb: 'distribute', noun: 'power to motors', performance: 'at [X] V supply' },
          { verb: 'protect', noun: 'motors from overload', performance: 'via starters and overloads' },
          { verb: 'provide', noun: 'local/remote control', performance: 'of connected motors' },
        );
      }
      // Piping
      else if (eqType === 'piping') {
        suggestions.push(
          { verb: 'convey', noun: 'process fluid', performance: 'at [X] m³/h design flow' },
          { verb: 'contain', noun: 'fluid at pressure', performance: 'up to [X] bar' },
          { verb: 'withstand', noun: 'operating temperature', performance: 'from [X] to [Y]°C' },
        );
      }
      // Steam Trap
      else if (eqType === 'steam-trap') {
        suggestions.push(
          { verb: 'remove', noun: 'condensate from steam system', performance: 'without passing live steam' },
          { verb: 'discharge', noun: 'condensate', performance: 'as it accumulates' },
          { verb: 'vent', noun: 'air and non-condensables', performance: 'on startup' },
        );
      }
      // Strainer
      else if (eqType === 'strainer') {
        suggestions.push(
          { verb: 'remove', noun: 'debris from fluid', performance: 'larger than [X] mm' },
          { verb: 'protect', noun: 'downstream equipment', performance: 'from damage' },
          { verb: 'allow', noun: 'cleaning without shutdown', performance: 'via duplex arrangement' },
        );
      }
      // Gearbox
      else if (eqType === 'gearbox') {
        suggestions.push(
          { verb: 'reduce/increase', noun: 'rotational speed', performance: 'at ratio of [X]:1' },
          { verb: 'transmit', noun: 'torque to driven equipment', performance: 'at [X] kW capacity' },
          { verb: 'contain', noun: 'lubricating oil', performance: 'with no external leakage' },
        );
      }
      // Coupling
      else if (eqType === 'coupling') {
        suggestions.push(
          { verb: 'transmit', noun: 'torque between shafts', performance: 'at [X] kW capacity' },
          { verb: 'accommodate', noun: 'misalignment', performance: 'within specified limits' },
          { verb: 'protect', noun: 'connected equipment', performance: 'by failing before damage' },
        );
      }
      // Crane/Hoist
      else if (eqType === 'crane-hoist') {
        suggestions.push(
          { verb: 'lift', noun: 'loads', performance: 'up to [X] tonnes SWL' },
          { verb: 'traverse', noun: 'loads horizontally', performance: 'across [X] m span' },
          { verb: 'lower', noun: 'loads safely', performance: 'with controlled descent' },
        );
      }
      // Agitator
      else if (eqType === 'agitator') {
        suggestions.push(
          { verb: 'mix', noun: 'vessel contents', performance: 'to achieve homogeneity' },
          { verb: 'maintain', noun: 'solids in suspension', performance: 'during operation' },
          { verb: 'operate', noun: 'at specified speed', performance: '[X] RPM' },
        );
      }
      // Default fallback
      else {
        suggestions.push(
          { verb: 'perform', noun: 'primary function', performance: 'to specified standard' },
          { verb: 'operate', noun: 'on demand', performance: 'when required' },
          { verb: 'contain', noun: 'process media', performance: 'without leakage' },
        );
      }

      const newFunctions = suggestions.map(s => ({
        id: crypto.randomUUID(),
        verb: s.verb || '',
        noun: s.noun || '',
        performance: s.performance || '',
        fullStatement: `To ${s.verb} ${s.noun}${s.performance ? ` ${s.performance}` : ''}`,
        selected: true,
      }));

      setAnalysis({ ...analysis, functions: [...analysis.functions, ...newFunctions] });
    };

    return (
      <div className="space-y-6">
        <div className="bg-off-white rounded-lg p-4">
          <p className="text-sm text-mid-grey">
            Define what {analysis.equipmentName || 'this equipment'} must do. Each function should start with a verb and include measurable performance standards where possible.
          </p>
        </div>

        {analysis.functions.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-light-grey rounded-xl">
            <p className="text-mid-grey mb-4">No functions defined yet</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={suggestFunctions}
                className="px-4 py-2 bg-industrial-amber text-white rounded-lg font-medium hover:bg-industrial-amber/90"
              >
                ✨ Suggest Functions
              </button>
              <button
                onClick={addFunction}
                className="px-4 py-2 border border-deep-teal text-deep-teal rounded-lg font-medium hover:bg-deep-teal/5"
              >
                + Add Manually
              </button>
            </div>
          </div>
        )}

        {analysis.functions.map((func, index) => (
          <div key={func.id} className="bg-white border border-light-grey rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-deep-teal">Function {index + 1}</span>
              <button
                onClick={() => removeFunction(func.id)}
                className="text-mid-grey hover:text-red-500"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs text-mid-grey mb-1">Verb (action)</label>
                <input
                  type="text"
                  value={func.verb}
                  onChange={(e) => updateFunction(func.id, { verb: e.target.value })}
                  className="w-full px-3 py-2 border border-light-grey rounded-lg text-sm focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
                  placeholder="transfer, maintain, regulate..."
                />
              </div>
              <div>
                <label className="block text-xs text-mid-grey mb-1">Noun (what)</label>
                <input
                  type="text"
                  value={func.noun}
                  onChange={(e) => updateFunction(func.id, { noun: e.target.value })}
                  className="w-full px-3 py-2 border border-light-grey rounded-lg text-sm focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
                  placeholder="fluid, pressure, temperature..."
                />
              </div>
              <div>
                <label className="block text-xs text-mid-grey mb-1">Performance standard</label>
                <input
                  type="text"
                  value={func.performance}
                  onChange={(e) => updateFunction(func.id, { performance: e.target.value })}
                  className="w-full px-3 py-2 border border-light-grey rounded-lg text-sm focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
                  placeholder="at X rate, to Y standard..."
                />
              </div>
            </div>
            <div className="bg-slate-navy/5 rounded-lg p-3">
              <span className="text-xs text-mid-grey block mb-1">Generated statement:</span>
              <span className="text-charcoal font-medium">{func.fullStatement || 'To [verb] [noun] [performance]'}</span>
            </div>
          </div>
        ))}

        {analysis.functions.length > 0 && (
          <button
            onClick={addFunction}
            className="w-full py-3 border-2 border-dashed border-light-grey rounded-xl text-mid-grey hover:border-deep-teal hover:text-deep-teal transition-colors"
          >
            + Add Another Function
          </button>
        )}
      </div>
    );
  };

  // Step 3: Failure Modes
  const renderFailureModesStep = () => {
    const suggestFailureModes = () => {
      // Use the helper function to get failure modes for any equipment type
      const equipmentModes = getFailureModesForEquipment(analysis.equipmentType);
      const newModes: FailureMode[] = [];
      
      // Get the primary function (first one) to associate failure modes with
      const primaryFunction = analysis.functions.find(f => f.selected) || analysis.functions[0];
      const equipmentName = analysis.equipmentName || 'equipment';
      
      // Add failure modes once per equipment (not per function)
      equipmentModes.forEach(component => {
        component.modes.forEach(mode => {
          // Auto-generate system and end effects based on local effect
          const systemEffect = generateSystemEffect(mode.effect, equipmentName);
          const endEffect = generateEndEffect(mode.effect, equipmentName);
          
          // Auto-generate recommended task based on detection method and P-F interval
          const recommendedTask = generateRecommendedTask(mode.detection, mode.pfInterval);
          
          // Calculate task interval (half of P-F interval)
          const taskInterval = calculateTaskInterval(mode.pfInterval);
          
          newModes.push({
            id: crypto.randomUUID(),
            functionId: primaryFunction?.id || '',
            mode: `${component.component}: ${mode.mode}`,
            cause: mode.cause,
            localEffect: mode.effect,
            systemEffect: systemEffect,
            endEffect: endEffect,
            consequence: '',
            consequenceCategory: '',
            detection: mode.detection,
            pfInterval: mode.pfInterval,
            taskInterval: taskInterval,
            recommendedTask: recommendedTask,
            selected: true,
          });
        });
      });

      setAnalysis({ ...analysis, failureModes: newModes });
    };

    const toggleFailureMode = (id: string) => {
      setAnalysis({
        ...analysis,
        failureModes: analysis.failureModes.map(fm =>
          fm.id === id ? { ...fm, selected: !fm.selected } : fm
        ),
      });
    };

    return (
      <div className="space-y-6">
        <div className="bg-off-white rounded-lg p-4">
          <p className="text-sm text-mid-grey">
            Select the failure modes that are credible for {analysis.equipmentName || 'this equipment'} in its operating context.
          </p>
        </div>

        {analysis.failureModes.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-light-grey rounded-xl">
            <p className="text-mid-grey mb-4">No failure modes generated yet</p>
            <button
              onClick={suggestFailureModes}
              className="px-6 py-3 bg-industrial-amber text-white rounded-lg font-semibold hover:bg-industrial-amber/90"
            >
              ✨ Generate Failure Modes
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-mid-grey">
                {analysis.failureModes.filter(fm => fm.selected).length} of {analysis.failureModes.length} selected
              </span>
              <button
                onClick={() => setAnalysis({
                  ...analysis,
                  failureModes: analysis.failureModes.map(fm => ({ ...fm, selected: true }))
                })}
                className="text-sm text-deep-teal hover:underline"
              >
                Select all
              </button>
            </div>
            
            {analysis.failureModes.map((fm) => (
              <div
                key={fm.id}
                onClick={() => toggleFailureMode(fm.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  fm.selected
                    ? 'border-deep-teal bg-deep-teal/5'
                    : 'border-light-grey hover:border-mid-grey opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    fm.selected ? 'bg-deep-teal border-deep-teal' : 'border-light-grey'
                  }`}>
                    {fm.selected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-charcoal">{fm.mode}</h4>
                    <p className="text-sm text-mid-grey mt-1">Cause: {fm.cause}</p>
                    <p className="text-sm text-mid-grey">Effect: {fm.localEffect}</p>
                    <div className="flex gap-4 mt-2 text-xs">
                      <span className="text-industrial-amber">P-F: {fm.pfInterval}</span>
                      <span className="text-deep-teal">Detection: {fm.detection}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Step 4: Analysis (Consequence Classification)
  const renderAnalysisStep = () => {
    const selectedModes = analysis.failureModes.filter(fm => fm.selected);
    
    const updateFailureMode = (id: string, updates: Partial<FailureMode>) => {
      setAnalysis({
        ...analysis,
        failureModes: analysis.failureModes.map(fm =>
          fm.id === id ? { ...fm, ...updates } : fm
        ),
      });
    };

    if (selectedModes.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-mid-grey">No failure modes selected. Go back and select at least one.</p>
        </div>
      );
    }

    const currentMode = selectedModes[currentModeIndex];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-off-white rounded-lg p-4">
          <span className="text-sm text-mid-grey">
            Analyzing {currentModeIndex + 1} of {selectedModes.length} failure modes
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentModeIndex(Math.max(0, currentModeIndex - 1))}
              disabled={currentModeIndex === 0}
              className="p-2 rounded-lg border border-light-grey disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentModeIndex(Math.min(selectedModes.length - 1, currentModeIndex + 1))}
              disabled={currentModeIndex === selectedModes.length - 1}
              className="p-2 rounded-lg border border-light-grey disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-white border border-light-grey rounded-xl p-6">
          <h3 className="font-heading font-semibold text-lg text-slate-navy mb-4">
            {currentMode.mode}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Consequence Category *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.entries(consequenceCategories).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => updateFailureMode(currentMode.id, { consequenceCategory: key as FailureMode['consequenceCategory'] })}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      currentMode.consequenceCategory === key
                        ? 'border-deep-teal bg-deep-teal/5'
                        : 'border-light-grey hover:border-mid-grey'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${value.color} mb-1`} />
                    <span className="text-sm font-medium text-charcoal block">{value.label}</span>
                    <span className="text-xs text-mid-grey">{value.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">System-Level Effect</label>
              <textarea
                value={currentMode.systemEffect}
                onChange={(e) => updateFailureMode(currentMode.id, { systemEffect: e.target.value })}
                className="w-full px-4 py-3 border border-light-grey rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
                rows={2}
                placeholder="What happens to the system/process when this fails?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">End Effect (Consequence)</label>
              <textarea
                value={currentMode.endEffect}
                onChange={(e) => updateFailureMode(currentMode.id, { endEffect: e.target.value })}
                className="w-full px-4 py-3 border border-light-grey rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
                rows={2}
                placeholder="What is the ultimate impact? (safety, environmental, production, cost)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Recommended Maintenance Task</label>
              <input
                type="text"
                value={currentMode.recommendedTask}
                onChange={(e) => updateFailureMode(currentMode.id, { recommendedTask: e.target.value })}
                className="w-full px-4 py-3 border border-light-grey rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
                placeholder="e.g., Vibration monitoring every 4 weeks"
              />
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1">
          {selectedModes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentModeIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentModeIndex ? 'bg-deep-teal w-4' : 'bg-light-grey hover:bg-mid-grey'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Step 5: Summary
  const renderSummaryStep = () => {
    const selectedModes = analysis.failureModes.filter(fm => fm.selected);
    
    const exportAsCSV = () => {
      const headers = ['Function', 'Failure Mode', 'Cause', 'Local Effect', 'System Effect', 'End Effect', 'Consequence Category', 'Detection Method', 'P-F Interval', 'Recommended Task'];
      const rows = selectedModes.map(fm => {
        const func = analysis.functions.find(f => f.id === fm.functionId);
        return [
          func?.fullStatement || '',
          fm.mode,
          fm.cause,
          fm.localEffect,
          fm.systemEffect,
          fm.endEffect,
          consequenceCategories[fm.consequenceCategory as keyof typeof consequenceCategories]?.label || '',
          fm.detection,
          fm.pfInterval,
          fm.recommendedTask,
        ].map(cell => `"${cell.replace(/"/g, '""')}"`).join(',');
      });
      
      const csv = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${analysis.equipmentName.replace(/[^a-z0-9]/gi, '-')}-rcm-analysis.csv`;
      a.click();
    };

    return (
      <div className="space-y-6">
        {/* Summary Header */}
        <div className="bg-deep-teal text-white rounded-xl p-6">
          <h2 className="font-heading text-2xl font-bold mb-2">{analysis.equipmentName}</h2>
          <p className="text-white/80">{analysis.equipmentDescription}</p>
          <div className="flex gap-6 mt-4 text-sm">
            <div>
              <span className="text-white/60">Functions:</span>
              <span className="ml-2 font-semibold">{analysis.functions.length}</span>
            </div>
            <div>
              <span className="text-white/60">Failure Modes:</span>
              <span className="ml-2 font-semibold">{selectedModes.length}</span>
            </div>
          </div>
        </div>

        {/* FMEA Table */}
        <div className="bg-white rounded-xl border border-light-grey overflow-hidden">
          <div className="px-6 py-4 bg-off-white border-b border-light-grey">
            <h3 className="font-heading font-semibold text-slate-navy">FMEA Summary</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-navy/5">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-charcoal">Failure Mode</th>
                  <th className="px-4 py-3 text-left font-medium text-charcoal">Cause</th>
                  <th className="px-4 py-3 text-left font-medium text-charcoal">Effect</th>
                  <th className="px-4 py-3 text-left font-medium text-charcoal">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-charcoal">Task</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-grey">
                {selectedModes.map((fm) => (
                  <tr key={fm.id} className="hover:bg-off-white">
                    <td className="px-4 py-3 font-medium text-charcoal">{fm.mode}</td>
                    <td className="px-4 py-3 text-mid-grey">{fm.cause}</td>
                    <td className="px-4 py-3 text-mid-grey">{fm.endEffect || fm.localEffect}</td>
                    <td className="px-4 py-3">
                      {fm.consequenceCategory && (
                        <span className={`text-xs px-2 py-1 rounded-full text-white ${consequenceCategories[fm.consequenceCategory]?.color}`}>
                          {consequenceCategories[fm.consequenceCategory]?.label}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-mid-grey">{fm.recommendedTask || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-3">
          <button
            onClick={exportAsCSV}
            className="flex-1 bg-deep-teal text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-navy transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export as CSV
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 border border-deep-teal text-deep-teal py-3 px-4 rounded-lg font-semibold hover:bg-deep-teal/5 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
            </svg>
            Print
          </button>
        </div>
      </div>
    );
  };

  // Navigation
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return analysis.equipmentName && analysis.equipmentType;
      case 2:
        return analysis.functions.length > 0;
      case 3:
        return analysis.failureModes.filter(fm => fm.selected).length > 0;
      case 4:
        return analysis.failureModes.filter(fm => fm.selected && fm.consequenceCategory).length > 0;
      default:
        return true;
    }
  };

  // Loading state
  if (authLoading || checkingAccess) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <svg className="w-8 h-8 animate-spin text-deep-teal mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-mid-grey">Loading...</p>
        </div>
      </div>
    );
  }

  // Access gate
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-off-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-8 text-center">
              <div className="w-20 h-20 bg-industrial-amber/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-industrial-amber" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h1 className="font-heading text-2xl font-bold text-slate-navy mb-4">
                RCM Analysis Wizard Pro
              </h1>
              <p className="text-mid-grey mb-6">
                Get the complete end-to-end RCM analysis experience. Connect all our tools into one seamless workflow with professional exports.
              </p>
              
              <div className="bg-off-white rounded-xl p-6 mb-6 text-left">
                <h3 className="font-semibold text-charcoal mb-3">What&apos;s included:</h3>
                <ul className="space-y-2 text-sm text-mid-grey">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Guided 5-step analysis workflow
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Auto-generated functions & failure modes
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Consequence classification for each mode
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Export to CSV / Print-ready summary
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Save & resume analyses (coming soon)
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-slate-navy">£49</span>
                <span className="text-mid-grey ml-2">one-time</span>
              </div>

              {!user ? (
                <div className="space-y-3">
                  <Link
                    href="/login"
                    className="block w-full bg-deep-teal text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-navy transition-colors"
                  >
                    Sign in to Purchase
                  </Link>
                  <p className="text-sm text-mid-grey">
                    Already purchased? <Link href="/login" className="text-deep-teal hover:underline">Sign in</Link> to access.
                  </p>
                </div>
              ) : (
                <a
                  href="https://reliabilityhq.gumroad.com/l/rcm-wizard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-deep-teal text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-navy transition-colors"
                >
                  Purchase on Gumroad →
                </a>
              )}

              <div className="mt-6 pt-6 border-t border-light-grey">
                <p className="text-sm text-mid-grey">
                  Want to try individual tools first?{' '}
                  <Link href="/ai-tools" className="text-deep-teal hover:underline">
                    Use our free tools →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <div className="bg-white border-b border-light-grey">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/ai-tools" 
              className="flex items-center gap-2 text-mid-grey hover:text-deep-teal transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span className="text-sm font-medium">Back to AI Tools</span>
            </Link>
            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-medium">FREE</span>
          </div>
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-slate-navy">RCM Analysis Wizard</h1>
            <p className="text-mid-grey mt-2">Complete equipment analysis in 5 steps</p>
            
            {/* Coming Soon Banner */}
            <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-lg text-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
              <span><strong>AI-Powered Version Coming Soon</strong> — Full RCM analysis with expert AI assistance</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        currentStep === step.id
                          ? 'bg-deep-teal text-white'
                          : currentStep > step.id
                          ? 'bg-green-500 text-white'
                          : 'bg-light-grey text-mid-grey'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : (
                        step.id
                      )}
                    </div>
                    <span className={`text-xs mt-2 hidden md:block ${
                      currentStep === step.id ? 'text-deep-teal font-medium' : 'text-mid-grey'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-full h-1 mx-2 rounded ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-light-grey'
                    }`} style={{ minWidth: '40px' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-light-grey p-6 md:p-8 mb-6">
            <h2 className="font-heading text-xl font-semibold text-slate-navy mb-6">
              {steps[currentStep - 1].name}: {steps[currentStep - 1].description}
            </h2>
            
            {currentStep === 1 && renderEquipmentStep()}
            {currentStep === 2 && renderFunctionsStep()}
            {currentStep === 3 && renderFailureModesStep()}
            {currentStep === 4 && renderAnalysisStep()}
            {currentStep === 5 && renderSummaryStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-light-grey rounded-lg font-medium text-charcoal hover:bg-light-grey transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            
            {currentStep < 5 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className="px-6 py-3 bg-deep-teal text-white rounded-lg font-semibold hover:bg-slate-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => {
                  // Save and finish
                  alert('Analysis complete! Export your results above.');
                }}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                ✓ Complete Analysis
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
