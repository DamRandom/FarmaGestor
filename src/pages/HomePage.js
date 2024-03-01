import React from 'react';
import { HeadComponent } from '../components/HeadComponent';
import logo from '../assets/Farmagestor-removebg-preview.png';
import secureIcon from '../assets/secureIcon.png';
import reliableIcon from '../assets/reliableIcon.png';
import organizedIcon from '../assets/organizedIcon.png';
import fastIcon from '../assets/fastIcon.png';
import '../css/principal.css';
import { Footer } from '../components/Footer';

const HomePage = () => {
    return (
        <div className="home-page">
            <HeadComponent /> 

            <div className="logo-container">
                <img src={logo} alt="Logo de la empresa" className="logo" />
            </div>

            <div className="benefits-container">
                <div className='left-icons'>
                    <div className="benefit">
                        <div className='icon-title'>
                            <img src={fastIcon} alt="Icono de rapidez" className="icon" />
                            <h3>Rápido</h3>
                        </div>
                        <p>Incrementa la eficiencia y velocidad en tus operaciones diarias.</p>
                    </div>

                    <div className="benefit">
                        <div className='icon-title'>
                            <img src={organizedIcon} alt="Icono de organización" className="icon" />
                            <h3>Organizado</h3>
                        </div>
                        <p>Organiza y gestiona tus datos de forma clara y estructurada.</p>
                    </div>
                </div>

                <div className='right-icons'>
                    <div className="benefit">

                        <div className='icon-title'>
                            <img src={secureIcon} alt="Icono de seguridad" className="icon" />
                            <h3>Seguro</h3>
                        </div>
                        <p>Protección de datos confiable y encriptación avanzada para tu farmacia.</p>
                    </div>

                    <div className="benefit">
                        <div className='icon-title'>
                            <img src={reliableIcon} alt="Icono de confiabilidad" className="icon" />
                            <h3>Confiable</h3>
                        </div>
                        <p>Confía en nuestra plataforma probada y confiable para todas tus necesidades empresariales.</p>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    );
}

export default HomePage;
