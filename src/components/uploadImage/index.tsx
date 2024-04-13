import Image from 'next/image';
import { FiCamera } from 'react-icons/fi';

export default function UploadImage({
    errorLabel,
    id,
    label,
    onChange,
    typeOfFile,
    image,
    ...rest
}: any) {
    return (
        <div className="w-full">
            <label className="w-full flex flex-col justify-center items-center rounded-full mt-4">
                <input
                    type={'file'}
                    id={id}
                    onChange={onChange}
                    {...rest}
                    className="hidden"
                />
                {image ? (
                    image.localLink ? (
                        <div className="w-fit flex items-center justify-center">
                            <Image
                                src={image.localLink}
                                alt="Picture of the author"
                                width={200}
                                height={200}
                                className="h-28 w-28 bg-gray-200 rounded-full object-contain"
                            />
                        </div>
                    ) : (
                        <Image
                            src={image}
                            alt="Picture of the author"
                            width={200}
                            height={200}
                            className="h-28 w-28 bg-gray-200 rounded-full object-contain"
                        />
                    )
                ) : (
                    <label className="h-28 w-28 relative">
                        <input
                            type={'file'}
                            id={id}
                            onChange={onChange}
                            {...rest}
                            className="hidden"
                        />
                        {/* <div className="rounded-full h-full w-full brightness-50 bg-[url('https://www.itmafrica.com/_next/image?url=https%3A%2F%2Fitmafrica.blob.core.windows.net%2Ftest%2FLogo_RDC.png&w=128&q=75')] bg-contain"></div> */}
                        <div className="rounded-full h-full w-full brightness-50 bg-gray-100 bg-contain"></div>
                        <FiCamera className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-white hover:cursor-pointer" />
                    </label>
                )}
                {errorLabel && (
                    <p className="text-center text-red-600 text-xs my-4">
                        {errorLabel}
                    </p>
                )}
            </label>
        </div>
    );
}