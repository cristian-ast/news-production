import React from 'react';
import ContactForm from './ContactForm';
import Image from 'next/image';
import facebook from '../public/img/facebook.png';
import gmail from '../public/img/gmail.png';
import whatsapp from '../public/img/whatsapp.png';

const Footer = () => {
    return (
        <div className="footerComponent">
            <div className="footerComponent-2">
                <ContactForm/>
                <footer className="footer">
                    <div className="contenidoFooter">
                        <div className="redes">
                            <a href="https://facebook.com/victorteinformasfm" target="_blank" rel="noreferrer">
                                <Image className="redes-image" width={24} height={24} src={facebook} alt="Instagram" /> Facebook
                            </a>
                        </div>
                        <div className="redes">
                            <a href="mailto:victormanueldiazrosado@gmail.com" target="_blank" rel="noreferrer">
                                <Image className="redes-image" width={24} height={24} src={gmail} alt="Gmail" /> Gmail
                            </a>
                        </div>
                        <div className="redes">
                            <a href="https://api.whatsapp.com/send?phone=18093158252&text=Buenas" target="_blank" rel="noreferrer">
                                <Image className="redes-image" width={24} height={24} src={whatsapp} alt="Whatsapp" /> +1-809-315-8252
                            </a>
                        </div>
                    </div>
                    <br/><br/>
                    <div className="despc">
                        Dominican Republic
                    </div>
                    <div className="despc">
                        Victor Manuel, 2021.
                    </div>
                    <br/><br/>
                </footer>
            </div>
        </div>
    )
}

export default Footer;