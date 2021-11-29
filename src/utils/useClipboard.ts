import { useState, useEffect } from 'react';
import copy from 'copy-to-clipboard';

export const useClipboard = (text: string): [boolean, () => void] => {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (hasCopied) {
      const id = setTimeout(() => {
        setHasCopied(false);
      }, 600);

      return () => {
        clearTimeout(id);
      };
    }
  }, [hasCopied]);

  return [
    hasCopied,
    () => {
      setHasCopied(copy(text));
    },
  ];
};
