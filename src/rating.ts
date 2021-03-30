const K = 32
export const E = (Ra: number, Rb: number) => 1 / (1 + Math.pow(10, (Rb-Ra) / 400))
export const R = (Ra: number, Sa: number, Ea: number) => Ra + K * (Sa - Ea)