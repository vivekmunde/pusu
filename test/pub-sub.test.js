import { createPublication, publish, subscribe } from '../lib/es';

describe('pub-sub', () => {
  test('Should not error when publishing a publication without any subscribers', () => {
    expect.hasAssertions();

    const publication = createPublication('test');

    publish(publication);

    expect(true).toBe(true);
  });

  test('Should publish & call the subscribers without data', () => {
    expect.hasAssertions();

    const publication = createPublication('test');

    const subscriber1 = jest.fn(val => val);
    const subscriber2 = jest.fn(val => val);

    const unsubscribe1 = subscribe(publication, subscriber1);
    const unsubscribe2 = subscribe(publication, subscriber2);

    publish(publication);

    expect(subscriber1).toHaveBeenCalledWith(undefined);
    expect(subscriber2).toHaveBeenCalledWith(undefined);

    unsubscribe1();
    unsubscribe2();
  });

  test('Should publish & call the subscribers with data', () => {
    expect.hasAssertions();

    const testData1 = 'test-data1';
    const testData2 = { data: 'test-data2' };
    const testData3 = ['test-data3'];

    const publication = createPublication('test');

    const subscriber1 = jest.fn(val => val);
    const subscriber2 = jest.fn(val => val);

    const unsubscribe1 = subscribe(publication, subscriber1);
    const unsubscribe2 = subscribe(publication, subscriber2);

    publish(publication, { testData1, testData2, testData3 });

    expect(subscriber1).toHaveBeenCalledWith({ testData1, testData2, testData3 });
    expect(subscriber2).toHaveBeenCalledWith({ testData1, testData2, testData3 });

    unsubscribe1();
    unsubscribe2();
  });

  test('Should not call the subscriber after unsubscribing', () => {
    expect.hasAssertions();

    const publication = createPublication('test');

    const subscriber = jest.fn(val => val);

    const unsubscribe = subscribe(publication, subscriber);

    publish(publication);

    expect(subscriber).toHaveBeenCalledTimes(1);

    unsubscribe();

    publish(publication);

    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  test('Should not error on multiple calls to unsubscribe', () => {
    expect.hasAssertions();

    const publication = createPublication('test');

    const subscriber = jest.fn(val => val);

    const unsubscribe = subscribe(publication, subscriber);

    publish(publication);

    expect(subscriber).toHaveBeenCalledTimes(1);

    unsubscribe();
    unsubscribe();
    unsubscribe();

    publish(publication);

    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  test('Should remove subscribers on unsubscribe', () => {
    expect.hasAssertions();

    const publication = createPublication('test');

    const subscriber1 = jest.fn(val => val);
    const subscriber2 = jest.fn(val => val);

    const unsubscribe1 = subscribe(publication, subscriber1);
    const unsubscribe2 = subscribe(publication, subscriber2);

    publish(publication, 'value1')

    expect(subscriber1).toHaveBeenCalledWith('value1');
    expect(subscriber2).toHaveBeenCalledWith('value1');

    unsubscribe1();

    publish(publication, 'value2')

    expect(subscriber2).toHaveBeenCalledWith('value2');

    unsubscribe2();

    publish(publication, 'value3')

    expect(subscriber1).toHaveBeenCalledTimes(1);
    expect(subscriber2).toHaveBeenCalledTimes(2);
  });
});
