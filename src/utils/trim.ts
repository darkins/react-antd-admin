/**
 * Remove spaces at both ends
 */
export const trim = (val: string): string => {
  return val.replace(/(^\s*)|(\s*$)/g, '');
};

/**
 * Remove the left space
 */
export const ltrim = (val: string): string => {
  return val.replace(/(^\s*)/g, '');
};

/**
 * Remove the space on the right
 */
export const rtrim = (val: string): string => {
  return val.replace(/(\s*$)/g, '');
};

/**
 * Remove both ends
 */
export const trimComma = (val: string): string => {
  return val.replace(/(^,*)|(,*$)/g, '');
};

/**
 * Remove both ends
 */
export const trimVerticalBar = (val: string): string => {
  return val.replace(/(^\|*)|(\|*$)/g, '');
};
