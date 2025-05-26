let idSeed = 0;

export function generateId() {
  return `id_${Date.now()}_${idSeed++}`;
}