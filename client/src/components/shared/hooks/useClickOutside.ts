import React, { useEffect } from 'react';

type UseClickOutside = (
    ref: React.RefObject<HTMLElement>,
    onClick: (event: MouseEvent) => void
) => void;

export const useClickOutside: UseClickOutside = (ref, onClick) => {
    const handleClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            onClick(e);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
};
