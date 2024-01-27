import createPublication from "../lib/es";

describe("pusu", () => {
  test("Should return a unique new publication object every time", () => {
    expect.hasAssertions();

    const publication1 = createPublication({ name: "name" });
    const publication2 = createPublication({ name: "name" });
    const publication3 = createPublication({ name: "name" });

    expect(publication1 === publication2).toBe(false);
    expect(publication1 === publication3).toBe(false);
    expect(publication2 === publication3).toBe(false);
  });

  test("Should not error when publishing a publication without any subscribers", () => {
    expect.hasAssertions();

    const publication = createPublication({ name: "test" });

    publication.publish(undefined);

    expect(true).toBe(true);
  });

  test("Should call subscribers with data", () => {
    expect.hasAssertions();

    const testData1 = "test-data1";
    const testData2 = { data: "test-data2" };
    const testData3 = ["test-data3"];

    const publication = createPublication({ name: "test" });

    const subscriber1 = jest.fn((val) => val);
    const subscriber2 = jest.fn((val) => val);

    const unsubscribe1 = publication.subscribe(subscriber1);
    const unsubscribe2 = publication.subscribe(subscriber2);

    publication.publish({ testData1, testData2, testData3 });

    expect(subscriber1).toHaveBeenCalledWith({
      testData1,
      testData2,
      testData3,
    });
    expect(subscriber2).toHaveBeenCalledWith({
      testData1,
      testData2,
      testData3,
    });

    unsubscribe1();
    unsubscribe2();
  });

  test("Should unsubscribe using subscribe().unsubscribe", () => {
    expect.hasAssertions();

    const publication = createPublication({ name: "test" });

    const subscriber1 = jest.fn((val) => val);
    const subscriber2 = jest.fn((val) => val);

    const unsubscribe1 = publication.subscribe(subscriber1);
    const unsubscribe2 = publication.subscribe(subscriber2);

    publication.publish("value1");

    expect(subscriber1).toHaveBeenCalledWith("value1");
    expect(subscriber2).toHaveBeenCalledWith("value1");

    unsubscribe1();

    publication.publish("value2");

    expect(subscriber2).toHaveBeenCalledWith("value2");

    unsubscribe2();

    publication.publish("value3");

    expect(subscriber1).toHaveBeenCalledTimes(1);
    expect(subscriber2).toHaveBeenCalledTimes(2);
  });

  test("Should unsubscribe using publication.unsubscribe", () => {
    expect.hasAssertions();

    const publication = createPublication({ name: "test" });

    const subscriber = jest.fn((val) => val);

    publication.subscribe(subscriber);

    publication.publish(undefined);

    expect(subscriber).toHaveBeenCalledTimes(1);

    publication.unsubscribe(subscriber);

    publication.publish(undefined);

    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  test("Should not error on multiple calls to unsubscribe", () => {
    expect.hasAssertions();

    const publication = createPublication({ name: "test" });

    const subscriber = jest.fn((val) => val);

    const unsubscribe = publication.subscribe(subscriber);

    publication.publish(undefined);

    expect(subscriber).toHaveBeenCalledTimes(1);

    unsubscribe();
    unsubscribe();
    unsubscribe();

    publication.publish(undefined);

    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  test("Should not log when flag is not passed", () => {
    expect.hasAssertions();

    const logSpy = jest.spyOn(console, "log");

    const testData = "test-data";

    const publication = createPublication();

    expect(logSpy).not.toHaveBeenCalled();

    const subscriber = jest.fn((val) => val);

    const unsubscribe = publication.subscribe(subscriber);

    expect(logSpy).not.toHaveBeenCalled();

    publication.publish(testData);

    expect(logSpy).not.toHaveBeenCalled();

    expect(subscriber).toHaveBeenCalledWith(testData);

    unsubscribe();
  });

  test("Should not log when flag is passed", () => {
    expect.hasAssertions();

    const logSpy = jest.spyOn(console, "log");

    const testData = "test-data";

    const publication = createPublication({ enableLogging: false });

    expect(logSpy).not.toHaveBeenCalled();

    const subscriber = jest.fn((val) => val);

    const unsubscribe = publication.subscribe(subscriber);

    expect(logSpy).not.toHaveBeenCalled();

    publication.publish(testData);

    expect(logSpy).not.toHaveBeenCalled();

    expect(subscriber).toHaveBeenCalledWith(testData);

    unsubscribe();
  });

  test("Should log", () => {
    expect.hasAssertions();

    const logSpy = jest.spyOn(console, "log");

    const testData1 = "test-data1";
    const testData2 = { data: "test-data2" };
    const testData3 = ["test-data3"];

    const publication = createPublication({
      name: "test",
      enableLogging: true,
    });

    expect(logSpy).toHaveBeenCalledWith("pusu", {
      publication: "test",
      action: "create",
    });

    const subscriber1 = jest.fn((val) => val);
    const subscriber2 = jest.fn((val) => val);

    const unsubscribe1 = publication.subscribe(subscriber1);

    expect(logSpy).toHaveBeenCalledWith("pusu", {
      publication: "test",
      action: "subscribe",
      meta: { subscriber: "mockConstructor" },
    });

    const unsubscribe2 = publication.subscribe(subscriber2);

    expect(logSpy).toHaveBeenCalledWith("pusu", {
      publication: "test",
      action: "subscribe",
      meta: { subscriber: "mockConstructor" },
    });

    publication.publish({ testData1, testData2, testData3 });

    expect(logSpy).toHaveBeenCalledWith("pusu", {
      publication: "test",
      action: "publish",
      data: {
        testData1: "test-data1",
        testData2: { data: "test-data2" },
        testData3: ["test-data3"],
      },
    });

    expect(subscriber1).toHaveBeenCalledWith({
      testData1,
      testData2,
      testData3,
    });

    expect(subscriber2).toHaveBeenCalledWith({
      testData1,
      testData2,
      testData3,
    });

    unsubscribe1();
    unsubscribe2();
  });

  test("Should log default name", () => {
    expect.hasAssertions();

    const logSpy = jest.spyOn(console, "log");

    const testData = "test-data";

    const publication = createPublication({ enableLogging: true });

    expect(logSpy).toHaveBeenCalledWith("pusu", {
      publication: "Unknown",
      action: "create",
    });

    const subscriber = jest.fn((val) => val);

    const unsubscribe = publication.subscribe(subscriber);

    expect(logSpy).toHaveBeenCalledWith("pusu", {
      publication: "Unknown",
      action: "subscribe",
      meta: { subscriber: "mockConstructor" },
    });

    publication.publish(testData);

    expect(logSpy).toHaveBeenCalledWith("pusu", {
      publication: "Unknown",
      action: "publish",
      data: "test-data",
    });

    expect(subscriber).toHaveBeenCalledWith(testData);

    unsubscribe();
  });
});
