import awaitMilliseconds from "./awaitMiliseconds";

export type MeetingFN = () => Promise<string>;

interface MeetingAssistansInfo {
  functions: MeetingFN[];
  testFn: jest.Mock;
  higherTime: number;
}

const generateMeetingAssistants = (): MeetingAssistansInfo  => {
  const conferencePeople = new Array<() => Promise<string>>();
  const testFn = jest.fn();
  let higherTime = 0;
  for (let index = 0; index < 20; index++) {
    const waitTime = Math.floor(Math.random() * 200) + 50;
    higherTime = Math.max(higherTime, waitTime);
    conferencePeople.push(
      // eslint-disable-next-line no-loop-func
      async (): Promise<string> => {
        await awaitMilliseconds(waitTime);
        testFn();
        // eslint-disable-next-line no-console
        return `Persona ${
            index.toString().padStart(2, '0')
          } ha accedido a la conferencia tras ${
            (waitTime / 1000).toString().padEnd(5, '0')
          } segundos`;
      }
    );
  }
  return {
    functions: conferencePeople,
    higherTime,
    testFn
  }
};

export default generateMeetingAssistants;