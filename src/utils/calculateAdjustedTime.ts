export function calculateAdjustedTime(
  minutes: number,
  seconds: number,
  currentSSS: number,
  targetSSS: number,
): string {
  const totalMinutes = minutes + seconds / 60;
  const sssDifference = targetSSS - currentSSS;
  const adjustmentInMinutes = sssDifference * 0.5; // 30 seconds per SSS point
  const adjusted = totalMinutes + adjustmentInMinutes;

  const adjustedMin = Math.floor(adjusted);
  const adjustedSec = Math.round((adjusted - adjustedMin) * 60);
  return `${adjustedMin}m ${adjustedSec}s`;
}
