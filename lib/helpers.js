export const getScoreFromTask = ({ frequency, effort, lastTimeDone }, now) => {
  // frequency in ms
  const f = frequency * 24 * 60 * 60 * 1000

  // diff time in ms
  const t = now - lastTimeDone

  return (t / f) * effort
}
