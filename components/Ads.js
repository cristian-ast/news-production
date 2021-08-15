import React from 'react';
import Image from 'next/image';

const Ads = ({img, url}) => {
    return (
        <div className="Asd">
            {url === "No"? 
                <div>
                    <Image width={250} height={250} src={img} alt="Imagen de Ads"/>
                </div>
            : 
                <a href={url} target="_blank" rel="noreferrer">
                    <Image width={250} height={250} src={img} alt="Imagen de Ads"/>
                </a>
            }
        </div>
    );
}

export default Ads;