import { useEffect, useState } from 'react';

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
      navigator.clipboard.writeText(text).then(() => setHasCopied(true));
    },
  ];
};
