import generateMeetingAssistants, { MeetingFN } from "../generateMeetingAssistants";

const concurrentPromises = async (functions: MeetingFN[], concurrency: number): Promise<string[]> =>
  new Promise<string[]>(resolve => {
    const functionsLength = functions.length;
    const result = new Array<string>(functionsLength);
    let results = 0;
    let lastProcessedIndex = 0;
    const executeNextFunction = (door: number): void => {
      const currentIndex = lastProcessedIndex++;
      if (currentIndex < functionsLength) {
        functions[currentIndex]().then(value => {
          result[currentIndex] = `${value}, por la puerta ${door}`;
          executeNextFunction(door);
          results++;
          if (results === functionsLength) {
            resolve(result);
          }
        });
      }
    }
    for (let index = 0; index < Math.min(concurrency, functionsLength); index++) {
      executeNextFunction(index);
    }
  }
  );

it('waits for all the promises to be completed with a concurrency limit', async (): Promise<void> => {
  const { functions, testFn } = generateMeetingAssistants();
  const startTest = (new Date()).getTime();
  const result = await concurrentPromises(functions, 4);
  const endTest = (new Date()).getTime();
  const totalTime = endTest - startTest;
  // eslint-disable-next-line no-console
  console.log(result.join('\n'));
  // eslint-disable-next-line no-console
  console.log({ totalTime });
  expect(testFn).toBeCalledTimes(20);
  expect(totalTime).toBeGreaterThan((50 * 20) / 4);
  expect(totalTime).toBeGreaterThanOrEqual(50);
});
