import React from 'react';
import './Accept.css'
import acceptImg from '../../img/accept.png'
import { Link } from 'react-router-dom';



const Accept = () => {

    return(    
        <div>
            <div className="result">
                <div className="sm-extra-space">
                    <br />
                </div> 

                <div className="row center center-display mt-5">
                    <div className="icon-card">
                        <img className="icon mr-1" src={acceptImg} />
                        <br />
                    </div>
                </div>

                <h3 className="thank-you">Thank You for Thinking Green!!</h3>

                <div className="sm-extra-space">
                    <br />
                </div> 

                <div className="text-center mt-5">
                    <Link to="/"><button className="btn-secondary btn btn-default btn-lg center" >Main Page</button></Link>
                </div>

                <div className="extra-space">
                    <br />
                </div> 

            </div>
        </div>
    );
}

export default Accept; 
