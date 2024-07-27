const trim = (input: string): string => {
  if (input.length > 40) {
    return `${input.substring(0, 40)}...`;
  }

  return input;
};

export { trim };
