import emailjs from "emailjs-com";
import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

const ContactForm = () => {

    const [ MensajeAlerta, GuardarMensajeAlerta ] =  useState(false)

    function sendEmail(e) {
        e.preventDefault();

        GuardarMensajeAlerta("Enviando");

        emailjs.sendForm('service_0jkrfrw', 'template_jt7qcfq', e.target, 'user_LCOBwLz89VXJjLOwmr4zK')
        .then((result) => {
            console.log(result.text);
            GuardarMensajeAlerta("Mensaje enviado Exitosamente");

            setTimeout(() => {
                GuardarMensajeAlerta(false);
            }, 2000);

        }, (error) => {
            console.log(error.text);
            GuardarMensajeAlerta("Hubo un error");

            setTimeout(() => {
                GuardarMensajeAlerta(false);
            }, 2000);
        });
        e.target.reset();
    }

    return(
        <div>
            <div className="Contenedoe-Send_email">
                {MensajeAlerta ? (<h3 className="alerta-email">{MensajeAlerta}</h3>) : 
                <Fragment>
                    <h3>Leave us a message:</h3>
                    <form onSubmit={sendEmail}>
                        <div className="">
                            <div className="campo-form campo-form-with2">
                                <input type="text" className="form-control" placeholder="Name" name="name" required/>
                            </div>
                            <div className="campo-form campo-form-with2">
                                <input type="email" className="form-control" placeholder="Email" name="email" required/>
                            </div>
                            <div className="campo-form campo-form-with2">
                                <textarea className="form-control" id="" cols="30" rows="8" placeholder="Write your message" name="message" required></textarea>
                            </div>
                            <br/>
                            <div className="form-group-send">
                                <Button
                                    className="contenedor-info-noticia-cuerpo-botones"
                                    size="small"
                                    variant="contained"
                                    startIcon={<SendIcon/>}
                                    type="submit"
                                >
                                    Send message
                                </Button> 
                            </div>
                           
                        </div>
                    </form>
                </Fragment>}
            </div>
        </div>
    )
}

export default ContactForm;