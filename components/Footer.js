import React from 'react';
import ContactForm from './ContactForm';
import Image from 'next/image';
import instagram from '../public/img/instagram.png';
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
                            <a href="https://www.instagram.com/cristian.ast/" target="_blank" rel="noreferrer">
                                <Image width={24} height={24} src={instagram} alt="Instagram" />Instagram
                            </a>
                        </div>
                        <div className="redes">
                            <a href="mailto:cristiancastroastacio@gmail.com" target="_blank" rel="noreferrer">
                                <Image width={24} height={24} src={gmail} alt="Gmail" /> Gmail
                            </a>
                        </div>
                        <div className="redes">
                            <a href="https://api.whatsapp.com/send?phone=18094289886&text=Buenas" target="_blank" rel="noreferrer">
                                <Image width={24} height={24} src={whatsapp} alt="Whatsapp" /> +1-809-428-9886
                            </a>
                        </div>
                    </div>
                    <br/><br/>
                    <div className="despc">
                        Dominican Republic
                    </div>
                    <div className="despc">
                        Cristian Castro Astacio, 2021.
                    </div>
                    <br/><br/>
                </footer>
            </div>
        </div>
    )
}

export default Footer;