export const parseParkrunTime = (time: string): number => {
  const timeParts = time.split(":");

  const hours = Number(timeParts[timeParts.length - 3]) || 0;
  const minutes = Number(timeParts[timeParts.length - 2]);
  const seconds = Number(timeParts[timeParts.length - 1]);

  return (hours * 60 + minutes) * 60 + seconds;
};
