import React from 'react';
import Image from 'next/image';

const AdsN = ({img, url}) => {
    return (
        <div className="AsdN">
            {url == "No"? 
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

export default AdsN;