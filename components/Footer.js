import React from 'react';
import ContactForm from './ContactForm';

const Footer = () => {
    return (
        <div className="footerComponent">
            <div className="footerComponent-2">
                <ContactForm/>
                <footer className="footer">
                    <div className="contenidoFooter">
                        <div className="redes">
                            <a href="https://www.instagram.com/cristian.ast/" target="_blank" rel="noreferrer">
                                <img src="http://localhost:3000/img/instagram.png"alt="Facebook" />Instagram
                            </a>
                        </div>
                        <div className="redes">
                            <a href="mailto:cristiancastroastacio@gmail.com" target="_blank" rel="noreferrer">
                                <img src="http://localhost:3000/img/gmail.png" alt="Gmail" /> Gmail
                            </a>
                        </div>
                        <div className="redes">
                            <a href="https://api.whatsapp.com/send?phone=18094289886&text=Buenas" target="_blank" rel="noreferrer">
                                <img src="http://localhost:3000/img/whatsapp.png" alt="Whatsapp" /> +1-809-428-9886
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