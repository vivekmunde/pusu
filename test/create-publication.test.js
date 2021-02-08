import { createPublication } from '../src';

describe('createPublication()', () => {
  test(`Should return new publication object with name as 'anonymous'`, () => {
    expect.hasAssertions();
    expect(createPublication()).toEqual({ name: 'anonymous', subscribers: [] });
  });

  test('Should return a unique new publication object every time', () => {
    expect.hasAssertions();

    const publication1 = createPublication('publication-name');
    const publication2 = createPublication('publication-name');
    const publication3 = createPublication('publication-name');

    expect(publication1 === publication2).toBe(false);
    expect(publication1 === publication3).toBe(false);
    expect(publication2 === publication3).toBe(false);
  });
});
