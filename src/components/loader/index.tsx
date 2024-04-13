'use client';
import { Rings } from 'react-loader-spinner';

export default function Loader() {
    return (
        <div className="h-full w-full flex items-center justify-center">
            <Rings
                height="100"
                width="100"
                color="#2DB0E5"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                visible={true}
            />
        </div>
    );
}