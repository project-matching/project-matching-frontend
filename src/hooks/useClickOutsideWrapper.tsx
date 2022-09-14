import React, { useEffect } from 'react';

interface Props {
  ref: React.RefObject<HTMLDivElement>;
  open: boolean;
  setOpen: (_value: React.SetStateAction<boolean>) => void;
}

const useClickOutsideWrapper = ({ ref, open, setOpen }: Props) => {
  useEffect(() => {
    const handleCloseDropdown = (e: Event) => {
      if (open && ref.current && !ref.current.contains(e.target as Element)) {
        console.log(
          'clicked outside profile',
          ref.current.contains(e.target as Element)
        );
        setOpen(false);
      }
    };

    window.addEventListener('click', handleCloseDropdown);

    return () => {
      window.removeEventListener('click', handleCloseDropdown);
    };
  }, [ref, open, setOpen]);

  return {};
};

export default useClickOutsideWrapper;
