export function coverRadius(x: number, y: number, width: number, height: number) {
  return Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
}

export function lensPath(x: number, y: number, tailX: number, tailY: number, radius: number, maxTrail: number) {
  const dx = x - tailX, dy = y - tailY, distance = Math.hypot(dx, dy);
  const nx = distance ? -dy / distance : 0, ny = distance ? dx / distance : 1;
  const trail = Math.min(distance, maxTrail);
  const tx = distance ? x - dx / distance * trail : x, ty = distance ? y - dy / distance * trail : y;
  return `M ${x+nx*radius} ${y+ny*radius} A ${radius} ${radius} 0 0 0 ${x-nx*radius} ${y-ny*radius} L ${tx-nx*radius} ${ty-ny*radius} A ${radius} ${radius} 0 0 0 ${tx+nx*radius} ${ty+ny*radius} Z`;
}
