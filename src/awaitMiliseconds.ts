const awaitMilliseconds = (miliseconds: number): Promise<void> => 
  new Promise<void>((resolve) => setTimeout(resolve, miliseconds));

export default awaitMilliseconds;