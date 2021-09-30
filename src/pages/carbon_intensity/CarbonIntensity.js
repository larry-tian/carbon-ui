import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

import './CarbonIntensity.css'

const CarbonIntensity = () => {

    const [display, setDisplay] = useState("initial_page");
    const [resultData, setResultData] = useState(undefined);

    // onClick function when user submit the form
    // const getResult = () => {
    //     // Change the page's display
    //     setDisplay("result_page");

    //     // fetch the data using "Post" and the form, store it
    //     fetch("/overview", {
    //         method: "POST", 
    //         body: new FormData(document.getElementById("explore_form")),
    //     }).then(
    //         res => res.json()
    //     ).then(data => {
    //         setResultData(data)
    //         setLoadingResult(false);
    //     })
        
    // }

    // Return the Explore page
    return(    
        <div>
            <div className="container">
                <div className="d-flex">
                    <div className="card mb-3 mt-4">
                        <div className="card-body">
                            <div className="horizontal-list top">
                                <h2 className="card-title">Carbon Intensity:</h2>
                                <p className="mt-5"><strong>Grid Data:</strong> Obtain historical marginal emissions for a given area. Omitting the starttime and endtime parameters will return generated data updates for the region. </p>

                                <p><strong>Historical Data: </strong>Obtain a zip file containing the MOER values and timestamps for a given region for (up to) the past two years.  Historical data will be updated on the 2nd of each month at midnight UTC for the previous month. </p>
                                <p className="mt-1">
                                    <strong>Real-Time Data:</strong> Provides a real-time signal indicating the carbon intensity on the local grid in that moment (typically updated every 5 minutes). The current emissions rate of the grid is returned as a raw Marginal Operating Emissions Rate (MOER)
                                </p>
                                <p>
                                    <strong>Forecast Data:</strong> Obtain Margial Operating Emission Rate forecasts for a given region. Omitting the starttime and endtime parameters will return recently generated forecast for a given region.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form method="POST" action="/chooser" encType="multipart/form-data">
                <div className="mt-5">
                    {/* Step 1 */}
                    <span className="steps"><strong>Step One:</strong></span>
                    <label className="mt-4"><b>Pick an Azure Region or WattTime Balancing Authority</b></label>
                    <br />
                    <label htmlFor="data_az" className="mt-4">Azure Region:</label>
                    <select name="data_az" id="data_az">
                        <option value="nada"> </option>
                        <option value="West US">West US</option>
                        <option value="West US 2">West US 2</option>
                        <option value="West Central US">West Central US</option>
                        <option value="East US">East US</option>
                        <option value="North Central US">North Central US</option>
                        <option value="East US 2">East US 2</option>
                        <option value="East US 2 EUAP">East US 2 EUAP</option>
                        <option value="South Central US">South Central US</option>
                        <option value="Central US EUAP">Central US EUAP</option>
                        <option value="Central US">Central US</option>
                        <option value="Germany West Central">Germany West Central</option>
                        <option value="Germany North">Germany North</option>
                        <option value="Canada Central">Canada Central</option>
                        <option value="West Europe">West Europe</option>
                        <option value="Australia Southeast">Australia Southeast</option>
                        <option value="Australia Central">Australia Central</option>
                        <option value="Australia East">Australia East</option>
                        <option value="Australia Central 2">Australia Central 2</option>
                        <option value="UK South">UK South</option>
                        <option value="North Europe">North Europe</option>
                        <option value="France Central">France Central</option>
                        <option value="France South">France South</option>
                        <option value="West US 3">West US 3</option>
                        <option value="Norway East">Norway East</option>
                        <option value="Norway West">Norway West</option>
                        <option value="UK West">UK West</option>
                        <option value="Switzerland North">Switzerland North</option>
                        <option value="Canada East">Canada East</option>
                        <option value="Switzerland West">Switzerland West</option>
                        <option value="Korea Central">Korea Central</option>
                        <option value="Japan East">Japan East</option>
                        <option value="Korea South">Korea South</option>
                        <option value="Japan West">Japan West</option>
                        <option value="UAE North">UAE North</option>
                        <option value="UAE Central">UAE Central</option>
                        <option value="JIO India West">JIO India West</option>
                        <option value="East Asia">East Asia</option>
                        <option value="West India">West India</option>
                        <option value="Central India">Central India</option>
                        <option value="South India">South India</option>
                        <option value="Southeast Asia">Southeast Asia</option>
                        <option value="South Africa West">South Africa West</option>
                        <option value="South Africa North">South Africa North</option>
                        <option value="Brazil South">Brazil South</option>
                        <option value="Brazil Southeast">Brazil Southeast</option>
                    </select>
                    &emsp;&emsp;&emsp;

                    <span><strong>or</strong></span>

                    <label htmlFor="data_ba" className="mt-2 ml-5">Balancing Authority:</label>
                    <select name="data_ba" id="data_ba">
                        <option value="nada">  </option>
                        <option value="PJM Roanoke">PJM Roanoke</option>
                        <option value="PJM DC">PJM DC</option>
                        <option value="ERCOT San Antonio">ERCOT San Antonio</option>
                        <option value="PUD No 2 of Grant County">PUD No 2 of Grant County</option>
                        <option value="National Electricity Market (Australia)">National Electricity Market (Australia)</option>
                        <option value="Ireland">Ireland</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="MISO Madison City">MISO Madison City</option>
                        <option value="PJM Chicago">PJM Chicago</option>
                        <option value="California ISO Northern">California ISO Northern</option>
                        <option value="Independent Electricity System Operator (Ontario)">Independent Electricity System Operator (Ontario)</option>
                        <option value="France">France</option>
                        <option value="Hydro Quebec">Hydro Quebec</option>
                        <option value="Germany and Luxembourg">Germany and Luxembourg</option>
                        <option value="PacifiCorp East">PacifiCorp East</option>
                        <option value="Arizona Public Service Co">Arizona Public Service Co</option>
                    </select>

                    {/* Step 2 */}
                    <hr size="8" width="100%" color="#d3d3d3" align="left" /> 
                    <span className="steps"><strong>Step Two:</strong></span>
                    <label className="mt-4"><b>Select an Output and Type</b> (see above descriptions)</label>
                    <br />

                    <label htmlFor="data" className="mt-4">Carbon Intensity Output:</label>
                    <select name="data" id="data">
                        <option value="nada">  </option>
                        <option value="grid">Grid Data</option>
                        <option value="historical">Historical Data Zipfile</option>
                        <option value="index">Real-Time Data</option>
                        <option value="forecast">Forecast Data</option>
                    </select>

                    {/* Step 3 */}
                    <hr size="8" width="100%" color="#d3d3d3" align="left" /> 
                    <span className="steps"><strong>Step Three:</strong></span>
                    <label className="mt-4"><b>Enter WattTime User Information:</b> </label>
                    
                    <div className="form-group row mt-3 ml-1">
                        <div>
                            <label htmlFor="data" className="form-label">Username:</label>
                            <input type="text" className="form-control" name = "user_name" />
                        </div>&emsp;&emsp;&emsp;
                        <div>
                            <label htmlFor="data" className="form=label">Password:</label>
                            <input type="password" className="form-control" id="password_input" name="pass_word" />
                        </div>
                    </div>

                    <input className="mt-3" type="checkbox"/> Show Password

                    {/* Step 4 */}
                    <hr size="8" width="100%" color="#d3d3d3" align="left" /> 
                    <span className="steps"><strong>Step Four:</strong></span>
                    <label className="mt-4"><b>Enter a Time Window:</b> (Optional input for grid data and forecast data)</label>
                    <p>Example: 7/16/2021 5:30:00 PM PST</p>
                    <div className="form-group row mt-4 ml-1">
                        <div>
                            <label htmlFor="data" className="form-label">Start Time:</label>
                            <input type="text" className="form-control" name = "starttime" />
                        </div>
                        
                        &emsp;&emsp;&emsp;

                        <div>
                            <label htmlFor="data" className="form=label">End Time:</label>
                            <input type="text" className="form-control" name="endtime" />
                        </div>
                    </div>
                
                    <div className="text-center mt-5">
                        <input className="findButton btn-success btn mb-5 mt-3" type = "submit" value="Query carbon intensity data"/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CarbonIntensity; 
