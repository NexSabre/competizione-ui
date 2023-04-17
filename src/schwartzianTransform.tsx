const SchwartzianTransform = (dictionary: any) => {
  const items = Object.keys(dictionary).map((key: string) => {
    return [key, dictionary[key]];
  });

  items.sort((f: any, s: any) => {
    return s[1] - f[1];
  });

  const keys: any = {};
  items.forEach((l: any) => {
    keys[l[0]] = l[1];
  });

  return keys;
};

export default SchwartzianTransform;
