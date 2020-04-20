import { useState, useEffect } from 'react';

export const useNestedMatch = (test: string, type = '', path: string = '') => {
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
