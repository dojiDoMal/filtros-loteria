class Sorteio {
  #primos = []

  constructor(universo = 80, quantidadeDezenas = 5) {
    this.universo = universo
    this.quantidadeDezenas = quantidadeDezenas
    this.somaMinima = (quantidadeDezenas * (quantidadeDezenas + 1)) / 2
    this.somaMaxima = quantidadeDezenas * universo - (quantidadeDezenas * (quantidadeDezenas - 1)) / 2
    this.mediaSoma = (this.somaMinima + this.somaMaxima) / 2
    this.desvio = Math.sqrt(quantidadeDezenas * ((universo * universo - 1) / 12) * ((universo - quantidadeDezenas) / (universo - 1)))
  }

  getPrimos() {
    if (this.#primos.length > 0) return this.#primos
    const primos = []
    for (let i = 2; i <= this.universo; i++) {
      if (i <= 3) { primos.push(i); continue }
      if (i % 2 === 0 || i % 3 === 0) continue
      let ehPrimo = true
      for (let k = 5; k * k <= i; k += 6) {
        if (i % k === 0 || i % (k + 2) === 0) { ehPrimo = false; break }
      }
      if (ehPrimo) primos.push(i)
    }
    this.#primos = primos
    return this.#primos
  }
}

const sorteio = new Sorteio()

export const FILTROS_CONFIG_DEFAULT = {
  pares: { min: 1, max: 4 },
  primos: { max: 3 },
  multiplos5: { max: 3 },
  consecutivos: { max: 2 },
  decadas: { min: 3 },
  zeros: { max: 2 },
}

export const FILTROS = [
  { id: 'soma', label: 'Soma dos números' },
  { id: 'pares', label: 'Números pares', configSchema: [
    { campo: 'min', label: 'Mín.', min: 0, max: 5 },
    { campo: 'max', label: 'Máx.', min: 0, max: 5 },
  ]},
  { id: 'primos', label: 'Números primos', configSchema: [
    { campo: 'max', label: 'Máx.', min: 0, max: 5 },
  ]},
  { id: 'zeros', label: 'Terminados em zero', configSchema: [
    { campo: 'max', label: 'Máx', min: 0, max: 5 },
  ]},
  { id: 'decadas', label: 'Décadas concentradas', configSchema: [
    { campo: 'min', label: 'Mín.', min: 1, max: 8 },
  ]},
  { id: 'consecutivos', label: 'Consecutivos', configSchema: [
    { campo: 'max', label: 'Máx.', min: 0, max: 4 },
  ]},
  { id: 'multiplos5', label: 'Múltiplos de 5', configSchema: [
    { campo: 'max', label: 'Máx.', min: 0, max: 5 },
  ]},
]

const fns = {
  soma(jogos) {
    const inf = sorteio.mediaSoma - sorteio.desvio * 2.02
    const sup = sorteio.mediaSoma + sorteio.desvio * 2.02
    return jogos.filter(j => {
      const s = j.split('-').reduce((a, v) => a + parseInt(v), 0)
      return s >= inf && s <= sup
    })
  },



  pares(jogos) {
    return jogos.filter(j => {
      const q = j.split('-').filter(d => parseInt(d) % 2 === 0).length
      return q >= 1 && q <= 4
    })
  },


}

export function filtrar(texto, ativos, config = {}) {
  if (!texto.trim()) return []
  let jogos = texto.trim().split('\n').map(j => j.trim()).filter(Boolean)
  const cfg = { ...FILTROS_CONFIG_DEFAULT, ...config }
  const fnsComConfig = {
    ...fns,
    pares(jogos) {
      return jogos.filter(j => {
        const q = j.split('-').filter(d => parseInt(d) % 2 === 0).length
        return q >= cfg.pares.min && q <= cfg.pares.max
      })
    },
    primos(jogos) {
      const p = sorteio.getPrimos()
      return jogos.filter(j => j.split('-').filter(d => p.includes(parseInt(d))).length <= cfg.primos.max)
    },
    multiplos5(jogos) {
      return jogos.filter(j => j.split('-').filter(d => parseInt(d) % 5 === 0).length <= cfg.multiplos5.max)
    },
    consecutivos(jogos) {
      return jogos.filter(j => {
        const d = j.split('-').map(Number).sort((a, b) => a - b)
        let c = 0
        for (let i = 0; i < d.length - 1; i++) if (d[i + 1] - d[i] === 1) c++
        return c <= cfg.consecutivos.max
      })
    },
    decadas(jogos) {
      return jogos.filter(j => new Set(j.split('-').map(d => Math.ceil(parseInt(d) / 10))).size >= cfg.decadas.min)
    },
    zeros(jogos) {
      return jogos.filter(j => j.split('-').filter(d => parseInt(d) % 10 === 0).length <= cfg.zeros.max)
    },
  }
  for (const id of ativos) if (fnsComConfig[id]) jogos = fnsComConfig[id](jogos)
  return jogos
}
