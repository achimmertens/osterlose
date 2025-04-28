// Add a utility function 'cn' to handle class name concatenation.
export const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};
