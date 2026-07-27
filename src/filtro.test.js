const Filtro = require('./filtro')
const Sorteio = require('./sorteio')

const sorteio = new Sorteio(80, 5)

// universo=80, n=5 → mediaSoma=202.5, desvio≈50.31
// limiarSoma=2.02 → inf≈55.3, sup≈349.7

describe('filtrarSomasDezenas', () => {
  test('mantém jogo com soma dentro do intervalo', () => {
    const f = new Filtro('10-20-30-40-50', sorteio)
    expect(f.filtrarSomasDezenas()).toEqual(['10-20-30-40-50']) // soma=150
  })

  test('remove jogo com soma abaixo do limite inferior', () => {
    const f = new Filtro('01-02-03-04-05', sorteio)
    expect(f.filtrarSomasDezenas()).toEqual([]) // soma=15
  })

  test('remove jogo com soma acima do limite superior', () => {
    const f = new Filtro('76-77-78-79-80', sorteio)
    expect(f.filtrarSomasDezenas()).toEqual([]) // soma=390
  })

  test('mantém jogo com soma exatamente no limite inferior', () => {
    // limiteInferior ≈ 101.9 → menor inteiro válido = 102
    // 01-02-03-04-92 não existe (max=80), então usamos soma=102: 01-02-03-16-80
    const f = new Filtro('01-02-03-16-80', sorteio)
    expect(f.filtrarSomasDezenas()).toEqual(['01-02-03-16-80']) // soma=102
  })

  test('mantém jogo com soma exatamente no limite superior', () => {
    // limiteSuperior ≈ 303.1 → maior inteiro válido = 303
    // 60-61-62-63-57 → soma=303
    const f = new Filtro('57-60-61-62-63', sorteio)
    expect(f.filtrarSomasDezenas()).toEqual(['57-60-61-62-63']) // soma=303
  })

  test('filtra corretamente múltiplos jogos', () => {
    const f = new Filtro('01-02-03-04-05\n10-20-30-40-50\n76-77-78-79-80', sorteio)
    expect(f.filtrarSomasDezenas()).toEqual(['10-20-30-40-50'])
  })

  test('retorna array vazio quando todos os jogos são inválidos', () => {
    const f = new Filtro('01-02-03-04-05\n76-77-78-79-80', sorteio)
    expect(f.filtrarSomasDezenas()).toEqual([])
  })

  test('lida com espaços/quebras extras (trim)', () => {
    const f = new Filtro('\n10-20-30-40-50\n', sorteio)
    expect(f.filtrarSomasDezenas()).toEqual(['10-20-30-40-50'])
  })
})

describe('filtrarPrimos', () => {
  test('mantém jogo com quantidade de primos abaixo do limite', () => {
    const f = new Filtro('02-04-06-08-10', sorteio)
    expect(f.filtrarPrimos()).toEqual(['02-04-06-08-10']) // 1 primo
  })

  test('mantém jogo com quantidade de primos igual ao limite', () => {
    const f = new Filtro('02-03-05-08-10', sorteio)
    expect(f.filtrarPrimos()).toEqual(['02-03-05-08-10']) // 3 primos
  })

  test('remove jogo com quantidade de primos acima do limite', () => {
    const f = new Filtro('02-03-05-07-10', sorteio)
    expect(f.filtrarPrimos()).toEqual([]) // 4 primos
  })

  test('remove jogo com todos os números primos', () => {
    const f = new Filtro('02-03-05-07-11', sorteio)
    expect(f.filtrarPrimos()).toEqual([]) // 5 primos
  })

  test('mantém jogo sem nenhum primo', () => {
    const f = new Filtro('04-06-08-10-12', sorteio)
    expect(f.filtrarPrimos()).toEqual(['04-06-08-10-12'])
  })

  test('filtra corretamente múltiplos jogos', () => {
    const f = new Filtro('02-03-05-07-11\n02-04-06-08-10\n02-03-05-08-10', sorteio)
    expect(f.filtrarPrimos()).toEqual(['02-04-06-08-10', '02-03-05-08-10'])
  })
})

describe('filtrarTerminadosEmZero', () => {
  test('mantém jogo sem nenhuma dezena terminada em 0', () => {
    const f = new Filtro('01-02-03-04-05', sorteio)
    expect(f.filtrarTerminadosEmZero()).toEqual(['01-02-03-04-05'])
  })

  test('mantém jogo com quantidade igual ao limite', () => {
    const f = new Filtro('10-20-03-04-05', sorteio)
    expect(f.filtrarTerminadosEmZero()).toEqual(['10-20-03-04-05']) // 2
  })

  test('remove jogo com quantidade acima do limite', () => {
    const f = new Filtro('10-20-30-04-05', sorteio)
    expect(f.filtrarTerminadosEmZero()).toEqual([]) // 3
  })

  test('remove jogo com todos terminados em 0', () => {
    const f = new Filtro('10-20-30-40-50', sorteio)
    expect(f.filtrarTerminadosEmZero()).toEqual([]) // 5
  })

  test('filtra corretamente múltiplos jogos', () => {
    const f = new Filtro('10-20-30-04-05\n01-02-03-04-05\n10-20-03-04-05', sorteio)
    expect(f.filtrarTerminadosEmZero()).toEqual(['01-02-03-04-05', '10-20-03-04-05'])
  })
})

describe('filtrarDecadasConcentradas', () => {
  test('mantém jogo com décadas distintas igual ao limite', () => {
    const f = new Filtro('11-12-13-21-31', sorteio)
    expect(f.filtrarDecadasConcentradas()).toEqual(['11-12-13-21-31']) // 3 décadas
  })

  test('mantém jogo com décadas distintas acima do limite', () => {
    const f = new Filtro('01-11-21-31-41', sorteio)
    expect(f.filtrarDecadasConcentradas()).toEqual(['01-11-21-31-41']) // 5 décadas
  })

  test('remove jogo com décadas distintas abaixo do limite', () => {
    const f = new Filtro('11-12-13-21-22', sorteio)
    expect(f.filtrarDecadasConcentradas()).toEqual([]) // 2 décadas
  })

  test('remove jogo com todas as dezenas na mesma década', () => {
    const f = new Filtro('11-12-13-14-15', sorteio)
    expect(f.filtrarDecadasConcentradas()).toEqual([]) // 1 década
  })

  test('trata corretamente dezenas no limite da década (ex: 10 e 11)', () => {
    const f = new Filtro('10-11-21-31-41', sorteio)
    expect(f.filtrarDecadasConcentradas()).toEqual(['10-11-21-31-41']) // 5 décadas
  })

  test('filtra corretamente múltiplos jogos', () => {
    const f = new Filtro('11-12-13-21-22\n01-11-21-31-41\n11-12-13-14-15', sorteio)
    expect(f.filtrarDecadasConcentradas()).toEqual(['01-11-21-31-41'])
  })
})

describe('filtrarPares', () => {
  test('mantém jogo com quantidade de pares dentro do intervalo', () => {
    const f = new Filtro('02-04-11-13-15', sorteio)
    expect(f.filtrarPares()).toEqual(['02-04-11-13-15']) // 2 pares, limites padrão 1-4
  })

  test('mantém jogo com quantidade de pares igual ao mínimo', () => {
    const f = new Filtro('02-03-05-07-09', sorteio)
    expect(f.filtrarPares()).toEqual(['02-03-05-07-09']) // 1 par = mínimo
  })

  test('mantém jogo com quantidade de pares igual ao máximo', () => {
    const f = new Filtro('02-04-06-08-11', sorteio)
    expect(f.filtrarPares()).toEqual(['02-04-06-08-11']) // 4 pares = máximo
  })

  test('remove jogo com quantidade de pares abaixo do mínimo', () => {
    const f = new Filtro('01-03-05-07-09', sorteio)
    expect(f.filtrarPares()).toEqual([]) // 0 pares
  })

  test('remove jogo com quantidade de pares acima do máximo', () => {
    const f = new Filtro('02-04-06-08-10', sorteio)
    expect(f.filtrarPares()).toEqual([]) // 5 pares
  })

  test('filtra corretamente múltiplos jogos', () => {
    const f = new Filtro('01-03-05-07-09\n02-04-11-13-15\n02-04-06-08-10', sorteio)
    expect(f.filtrarPares()).toEqual(['02-04-11-13-15'])
  })
})

describe('filtrarConsecutivos', () => {
  test('mantém jogo sem nenhum par consecutivo', () => {
    const f = new Filtro('01-03-05-07-09', sorteio)
    expect(f.filtrarConsecutivos()).toEqual(['01-03-05-07-09']) // 0 consecutivos
  })

  test('mantém jogo com consecutivos igual ao limite', () => {
    const f = new Filtro('01-02-03-07-09', sorteio)
    expect(f.filtrarConsecutivos()).toEqual(['01-02-03-07-09']) // 2 pares
  })

  test('remove jogo com consecutivos acima do limite', () => {
    const f = new Filtro('01-02-03-04-09', sorteio)
    expect(f.filtrarConsecutivos()).toEqual([]) // 3 pares
  })

  test('remove jogo com todos consecutivos', () => {
    const f = new Filtro('01-02-03-04-05', sorteio)
    expect(f.filtrarConsecutivos()).toEqual([]) // 4 pares
  })

  test('ordena as dezenas antes de verificar consecutivos', () => {
    const f = new Filtro('09-01-07-03-05', sorteio)
    expect(f.filtrarConsecutivos()).toEqual(['09-01-07-03-05']) // ordenado: 1,3,5,7,9 → 0
  })

  test('filtra corretamente múltiplos jogos', () => {
    const f = new Filtro('01-02-03-04-05\n01-02-03-07-09\n01-03-05-07-09', sorteio)
    expect(f.filtrarConsecutivos()).toEqual(['01-02-03-07-09', '01-03-05-07-09'])
  })
})

describe('filtrarMultiplosDe5', () => {
  test('mantém jogo sem nenhum múltiplo de 5', () => {
    const f = new Filtro('01-02-03-04-06', sorteio)
    expect(f.filtrarMultiplosDe5()).toEqual(['01-02-03-04-06']) // 0 múltiplos
  })

  test('mantém jogo com múltiplos igual ao limite', () => {
    const f = new Filtro('05-10-15-04-06', sorteio)
    expect(f.filtrarMultiplosDe5()).toEqual(['05-10-15-04-06']) // 3 múltiplos
  })

  test('remove jogo com múltiplos acima do limite', () => {
    const f = new Filtro('05-10-15-20-06', sorteio)
    expect(f.filtrarMultiplosDe5()).toEqual([]) // 4 múltiplos
  })

  test('remove jogo com todos múltiplos de 5', () => {
    const f = new Filtro('05-10-15-20-25', sorteio)
    expect(f.filtrarMultiplosDe5()).toEqual([]) // 5 múltiplos
  })

  test('filtra corretamente múltiplos jogos', () => {
    const f = new Filtro('05-10-15-20-25\n05-10-15-04-06\n01-02-03-04-06', sorteio)
    expect(f.filtrarMultiplosDe5()).toEqual(['05-10-15-04-06', '01-02-03-04-06'])
  })
})
