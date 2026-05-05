import React from "react";

export default function TarjetaGrid({ url, text, descripcion, className = "", ...props }) {
    return (
        <>
            <div
                className={`${className} w-full overflow-hidden group aspect-video`}
                {...props}
            >
                <img
                    src={url}
                    alt={text}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>
            <div className="text-sm m-2 text-center font-bold leading-tight text-black">
                {text}
            </div>
            <div className="text-xs m-2 text-center leading-tight text-gray-600">
                {descripcion}
            </div>
        </>
    );
}