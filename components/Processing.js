import Spinner from './Spinner';

const Processing = ({processText}) => {

    return (
        <div className="Contenedor-Procesando">
            <div className="Contenedor-Procesando-texto">
                <div>
                    <h3>{processText}</h3>
                </div>
                <div>
                    <Spinner/>
                </div>
            </div>
        </div>
    );
}


export default Processing;