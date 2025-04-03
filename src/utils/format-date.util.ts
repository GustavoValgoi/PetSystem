export const formatDateToISOString = (day: string, hour?: string): string => {
  if (hour) {
    const format = new Date(`${day} ${hour}`).setHours(
      new Date(`${day} ${hour}`).getHours() - 3,
    );

    return new Date(format).toISOString();
  }

  return new Date(day).toISOString();
};
