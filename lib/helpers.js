export const getScoreFromTask = ({ frequency, effort, lastTimeDone }, now) => {
  if (!frequency) {
    return effort
  }

  // frequency in ms
  const f = frequency * 24 * 60 * 60 * 1000

  // diff time in ms
  const t = now - lastTimeDone

  return (t / f) * effort
}

export const getMiddleScoreFromUsers = (userList) => {
  const scores = userList.map((u) => u.score)
  const max = Math.max(...scores)
  const min = Math.min(...scores)
  return min + ((max - min) / 2)
}
