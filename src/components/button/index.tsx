import React, { useEffect, useState } from 'react';

interface ButtonProps {
    icon: any;
    label: string;
    onClick: any;
    type: 'primary' | 'secondary' | 'error';
}

export default function Button({ icon, label, onClick, type }: ButtonProps) {
    const [style, setStyle] = useState<string>('bg-cyan-400 text-white');

    useEffect(() => {
        switch (type) {
            case 'primary':
                setStyle('bg-cyan-400 text-white');
                break;

            case 'secondary':
                setStyle(
                    'border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white'
                );
                break;

            case 'error':
                setStyle(
                    'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                );
                break;

            default:
                setStyle('bg-cyan-400 text-white');
                break;
        }
    }, []);

    return (
        <button
            onClick={onClick}
            className={`${style} px-4 py-2 rounded-[25px] flex items-center justify-center font-medium w-full`}
        >
            {icon} {label}
        </button>
    );
}