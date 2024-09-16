import React from 'react';
import '../css/error.css';
import { useNavigate, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    if (error.status === 404) {
        return (
            <div className="bg-purple">
                <div className="stars">
                    <div className="central-body">
                        <img className="image-404" src="http://salehriaz.com/404Page/img/404.svg" alt="404 Error" width="300px" />
                        <button onClick={() => { navigate(-1) }} className="btn-go-home" target="_blank" rel="noopener noreferrer">GO BACK</button>
                    </div>
                    <div className="objects">
                        <img className="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" alt="Rocket" width="40px" />
                        <div className="earth-moon">
                            <img className="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" alt="Earth" width="100px" />
                            <img className="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" alt="Moon" width="80px" />
                        </div>
                        <div className="box_astronaut">
                            <img className="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" alt="Astronaut" width="140px" />
                        </div>
                    </div>
                    <div className="glowing_stars">
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                    </div>
                </div>
            </div>
        );
    }
    console.log(error);
    return <h1> The page you are looking does not exist </h1>;
};

export default ErrorPage;
