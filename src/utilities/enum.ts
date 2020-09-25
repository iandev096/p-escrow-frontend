export const enumToArray = (en: any) => {
  const arr = [];
  for (const value in en) {
      arr.push(en[value]);
  }
  return arr;
}
