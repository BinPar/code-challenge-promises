import generateMeetingAssistants from "../generateMeetingAssistants";

it('waits for all the promises to be completed', async (): Promise<void> => {
  const { functions, testFn, higherTime } = generateMeetingAssistants();
  const startTest = (new Date()).getTime();
  const result = await Promise.all(functions.map(item => item()));
  const endTest = (new Date()).getTime();
  const totalTime = endTest - startTest;
  // eslint-disable-next-line no-console
  console.log(result.join('\n'));
  // eslint-disable-next-line no-console
  console.log({ totalTime });
  expect(testFn).toBeCalledTimes(20);
  expect(totalTime).toBeLessThanOrEqual(higherTime + 20);
  expect(totalTime).toBeGreaterThanOrEqual(50);
});
