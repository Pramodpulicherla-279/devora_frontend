/* Shared sample trie holding: cat, car, card, do, dog. Used across the Trie-part visuals so
 * learners see one consistent structure. Each node has a fixed layout position. */
export const TRIE = [
  { id: 0, ch: '•', x: 320, y: 30, parent: null, end: false },
  { id: 1, ch: 'c', x: 210, y: 95, parent: 0, end: false },
  { id: 2, ch: 'a', x: 210, y: 160, parent: 1, end: false },
  { id: 3, ch: 't', x: 140, y: 235, parent: 2, end: true },   // cat
  { id: 4, ch: 'r', x: 290, y: 235, parent: 2, end: true },   // car
  { id: 5, ch: 'd', x: 290, y: 305, parent: 4, end: true },   // card
  { id: 6, ch: 'd', x: 460, y: 95, parent: 0, end: false },
  { id: 7, ch: 'o', x: 460, y: 160, parent: 6, end: true },   // do
  { id: 8, ch: 'g', x: 460, y: 235, parent: 7, end: true },   // dog
];
export const WORDS = { cat: [0, 1, 2, 3], car: [0, 1, 2, 4], card: [0, 1, 2, 4, 5], do: [0, 6, 7], dog: [0, 6, 7, 8] };
export const childrenOf = id => TRIE.filter(n => n.parent === id);
export const nodeAt = id => TRIE.find(n => n.id === id);
// walk chars from root; returns array of node ids matched (partial ok) and whether fully matched
export function walk(word) {
  let cur = 0; const path = [0];
  for (const c of word) {
    const child = TRIE.find(n => n.parent === cur && n.ch === c);
    if (!child) return { path, matched: false, endHit: false };
    cur = child.id; path.push(cur);
  }
  return { path, matched: true, endHit: nodeAt(cur).end };
}
