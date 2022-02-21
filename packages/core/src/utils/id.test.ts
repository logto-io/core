import { buildIdGenerator, alphabet } from './id';

describe('id generator', () => {
  it('should match the input length', () => {
    const id = buildIdGenerator(10)();
    expect(id.length).toEqual(10);
  });

  it('to random id should not equal', () => {
    const id_1 = buildIdGenerator(10)();
    const id_2 = buildIdGenerator(10)();

    expect(id_1).not.toEqual(id_2);
  });

  it('should only contains provided alphabets', () => {
    const id = buildIdGenerator(20)();

    for (const char of id) {
      expect(alphabet.includes(char)).toBeTruthy();
    }
  });
});
