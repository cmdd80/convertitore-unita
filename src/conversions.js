// Ogni unità indica la grandezza a cui appartiene e il fattore
// per passare all'unità base della grandezza (per le lunghezze: mm).
// Le unità con scala non proporzionale (temperatura) hanno anche un
// offset: valore_base = valore * factor + offset (base: kelvin).
export const UNITS = {
  mm: { quantity: 'lunghezza', factor: 1 },
  cm: { quantity: 'lunghezza', factor: 10 },
  m: { quantity: 'lunghezza', factor: 1000 },
  in: { quantity: 'lunghezza', factor: 25.4 },
  ft: { quantity: 'lunghezza', factor: 304.8 },
  Nm: { quantity: 'coppia', factor: 1 },
  'lbf-ft': { quantity: 'coppia', factor: 1.3558179 },
  'lbf-in': { quantity: 'coppia', factor: 0.1129848 },
  kPa: { quantity: 'pressione', factor: 1 },
  MPa: { quantity: 'pressione', factor: 1000 },
  bar: { quantity: 'pressione', factor: 100 },
  psi: { quantity: 'pressione', factor: 6.894757 },
  K: { quantity: 'temperatura', factor: 1, offset: 0 },
  C: { quantity: 'temperatura', factor: 1, offset: 273.15 },
  F: { quantity: 'temperatura', factor: 5 / 9, offset: 273.15 - (32 * 5) / 9 },
};

const DECIMALS = 3;

export function convert(value, from, to) {
  const source = UNITS[from];
  const target = UNITS[to];

  if (!source) throw new Error(`Unità non supportata: ${from}`);
  if (!target) throw new Error(`Unità non supportata: ${to}`);
  if (source.quantity !== target.quantity) {
    throw new Error(`Impossibile convertire ${from} in ${to}`);
  }

  const base = value * source.factor + (source.offset ?? 0);
  return round((base - (target.offset ?? 0)) / target.factor);
}

function round(n) {
  const scale = 10 ** DECIMALS;
  // toFixed elimina il rumore della virgola mobile (es. 211.99999999999997)
  // prima del troncamento; "|| 0" evita di restituire -0.
  return Math.trunc(Number((n * scale).toFixed(6))) / scale || 0;
}
