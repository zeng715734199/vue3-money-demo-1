export const clone = <X>(data: X): X => {
  return JSON.parse(JSON.stringify(data));
};

export default clone;
