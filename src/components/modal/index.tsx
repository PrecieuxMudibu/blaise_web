import { RxCross2 } from 'react-icons/rx';

interface Props {
    isOpen: boolean;
    children: any;
    onClick: any | undefined;
    classNames: string;
}
export default function ModalContainer({
    isOpen,
    children,
    onClick,
    classNames
}: Props) {
    if (isOpen)
        return (
            <div
                className="fixed inset-0 left-0 right-0 top-0 bottom-0 text-white bg-black/25 z-50 flex justify-center items-center "
                onClick={onClick}
            >
                <div className="w-full h-[95%] flex items-center justify-center relative">
                    <div
                        className={`${classNames} relative bg-white overflow-x-hidden py-5 px-6 text-black rounded animate__animated animate__slideInDown`}
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    >
                        <div
                            className="absolute top-4 right-4 rounded-full bg-gray-500 text-white p-1 text-black text-sm hover:cursor-pointer"
                            onClick={onClick}
                        >
                            <RxCross2 />
                        </div>
                        <div className="w-full h-full py-8">{children}</div>
                    </div>
                </div>
            </div>
        );
    return null;
}