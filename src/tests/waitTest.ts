import awaitMilliseconds from "../awaitMiliseconds";

it('waits the specified amount of miliseconds', async (): Promise<void> => {
  const startTest = (new Date()).getTime();
  await awaitMilliseconds(200);
  const endTest = (new Date()).getTime();
  const totalTime = endTest - startTest;
  expect(totalTime).toBeGreaterThanOrEqual(200);
  expect(totalTime).toBeLessThan(300);
});
