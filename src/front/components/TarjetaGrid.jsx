import React from "react";

export default function TarjetaGrid({ url, text, className = "", ...props }) {
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
            <div className="text-sm m-2 text-center leading-tight text-black">
                {text}
            </div>
        </>
    );
}