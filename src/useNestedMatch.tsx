import { useState, useEffect } from 'react';

type NestedMatchOpts = {
  type?: string;
  path?: string;
};

export const useNestedMatch = (
  test: string,
  { type = '', path = '' }: NestedMatchOpts = {}
) => {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    let result;
    switch (type) {
      case 'startsWith':
        result = path.match(new RegExp(`^/${test}`))?.length ? true : false;
        break;
      case 'endsWith':
        result = path.match(new RegExp(`/${test}$`))?.length ? true : false;
        break;
      default:
        result = path.match(new RegExp(`${test}`))?.length ? true : false;
        break;
    }
    setMatch(result);
  }, [test, type, path]);

  return match;
};
