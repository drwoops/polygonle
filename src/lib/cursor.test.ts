import { cursorDelete } from './cursor'
describe('cursorDelete', () => {
  test('empty guess', () => {
    const { guess, index } = cursorDelete('', 0)
    expect(guess).toBe('')
    expect(index).toBe(0)
  })

  test('whitespace guess', () => {
    const { guess, index } = cursorDelete('   ', 3)
    expect(guess).toBe('')
    expect(index).toBe(0)
  })

  test('cursor beyond guess', () => {
    const { guess, index } = cursorDelete('guess', 7)
    expect(guess).toBe('guess')
    expect(index).toBe(5)
  })

  test('trailing whitespace guess', () => {
    const { guess, index } = cursorDelete('abc  ', 5)
    expect(guess).toBe('abc')
    expect(index).toBe(3)
  })

  test('adjacent delete', () => {
    const { guess, index } = cursorDelete('guess', 5)
    expect(guess).toBe('gues')
    expect(index).toBe(4)
  })

  test('specific character delete', () => {
    const { guess, index } = cursorDelete('guess', 2)
    expect(guess).toBe('gu ss')
    expect(index).toBe(2)
  })

  test('trailing specific character delete', () => {
    const { guess, index } = cursorDelete('guess', 4)
    expect(guess).toBe('gues')
    expect(index).toBe(4)
  })

  test('central whitespace delete', () => {
    const { guess, index } = cursorDelete('gu ss', 2)
    expect(guess).toBe('g  ss')
    expect(index).toBe(1)
  })

  test('central whitespace cursor shift', () => {
    const { guess, index } = cursorDelete('gu  s', 3)
    expect(guess).toBe('gu  s')
    expect(index).toBe(2)
  })
})
