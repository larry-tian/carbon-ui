import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Plot from 'react-plotly.js';

// Loading spinner library
import HashLoader from "react-spinners/HashLoader";
import ClockLoader from "react-spinners/ClockLoader";

import { css } from "@emotion/react";

import './Explore.css'

const Explore = () => {

    const [display, setDisplay] = useState("initial_page");
    const [graphOne, setGraphOne] = useState(null);
    const [mappy, setMappy] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [loadingResult, setLoadingResult] = useState(false);
    const [resultData, setResultData] = useState(undefined);
    const [loadColor, setLoadColor] = useState("#8EB93B");

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

    useEffect(() => {
        setDisplay("initial_page");
        setLoadingInitial(true)
        getData();
    }, [])

    
    // Display the intial page, fetch the map/table's data and store it
    const getData = () => {
        setLoadingResult(true);
        fetch("/all_index").then(
            res => res.json()

        ).then(data => {
            setGraphOne(JSON.parse(data.graphOne));
            setMappy(JSON.parse(data.mappy));
            setLoadingInitial(false);
        })
    }

    // Onclick function when user submit the form
    const getResult = () => {
        // Change the page's display
        setDisplay("result_page");

        // fetch the data using "Post" and the form, store it
        fetch("/overview", {
            method: "POST", 
            body: new FormData(document.getElementById("explore_form")),
        }).then(
            res => res.json()
        ).then(data => {
            setResultData(data)
            setLoadingResult(false);
        })
        
    }

    // Create an initial variable to store the map plot
    let plot = null

    if (graphOne !== null) {
        plot = <Plot data={graphOne.data} layout={graphOne.layout}/>
    } 
    
    // Disable the form from posting when hit "submit"
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    // Create an initial variable to store the content
    let content = null 

    // Page content will change based on the display's state
    if (display === "initial_page") {
        content = <div>
            {!loadingInitial && 
            <div className="form-container">
                <p>Explore</p>

                <form id="explore_form" method="POST" action="/overview" onSubmit={handleSubmit}>
                    <label htmlFor="data">Details of a specific Azure region's WattTime balancing authority:</label>
                
                    <select className="form-control" name="data" id="data">
                        <option value="nada">  </option>
                        <option value="PJM Roanoke">East US</option>
                        <option value="PJM DC">East US 2</option>
                        <option value="PJM DC">East US 2 EUAP</option>
                        <option value="ERCOT San Antonio">South Central US</option>
                        <option value="PUD No 2 of Grant County">West US 2</option>
                        <option value="National Electricity Market (Australia)">Australia Central</option>
                        <option value="National Electricity Market (Australia)">Australia Central 2</option>
                        <option value="National Electricity Market (Australia)">Australia East</option>
                        <option value="National Electricity Market (Australia)">Australia Southeast</option>
                        <option value="Ireland">North Europe</option>
                        <option value="United Kingdom">UK South</option>
                        <option value="Netherlands">West Europe</option>
                        <option value="MISO Madison City">Central US EUAP</option>
                        <option value="MISO Madison City">Central US</option>
                        <option value="PJM Chicago">North Central US</option>
                        <option value="California ISO Northern">West US</option>
                        <option value="Independent Electricity System Operator (Ontario)">Canada Central</option>
                        <option value="France">France South</option>
                        <option value="France">France Central</option>
                        <option value="Hydro Quebec">Canada East</option>
                        <option value="Germany and Luxembourg">Germany West Central</option>
                        <option value="Germany and Luxembourg">Germany North</option>
                        <option value="PacifiCorp East">West Central US</option>
                        <option value="Arizona Public Service Co">West US 3</option>
                        <option value="Norway">Norway West</option>
                        <option value="Norway">Norway East</option>
                    </select>
                    <br />

                    <input 
                        className="findButton btn-success btn" 
                        value="See Region Emission History"
                        type="submit"
                        onClick= {() => {
                            getResult()
                        }}
                    />

                </form>
            </div>}

            <div>
                <br></br>
            </div>

            <div className="intensity-table">

            </div>

            <div id="map-plot">
                {loadingInitial ? <div className="loading">
                    {/* Loading screen */}
                    <div className="extra-space">
                        <br />
                    </div> 
                
                    <HashLoader color={loadColor} css={override} size={150}/>
                    <p className="loading-title">Hang in there!</p>
                    <p className="loading-desc">We are trying to load the page, this might take a while...</p>
                    <p className="loading-desc">Rome wasn't built in a day</p>
                </div> : plot}
            </div>
        </div>
    
    // Result page content
    } else if (display === "result_page") {

        // Create the result content 
        let result = null;

        // If the result data isn't null
        if (resultData != null) {
            // If the returned data is an error message
            if (resultData.type === "error") {
                // Create intial variables to store the error information
                let errorMsg = resultData.errorMsg;
                let errorCode = resultData.errorCode;
    
                // Return the error message display 
                result = <div>
                    <p>{errorMsg}</p>
                    <p>{errorCode}</p>
                </div>

            // Else display the result 
            } else {
                if (resultData.type === "region" || resultData.type === "region_bad_freq") {
                    // Create initial varaibles to store the needed information
                    let plotOne = JSON.parse(resultData.plot1);
                    let plotTwo = JSON.parse(resultData.plot2);
                    let plotThree = null;
                    let plotThreeDisplay = null;

                    let titleOne = "";
                    let titleTwo = "";
                    let titleThree = "";
                    let warningMsg = null;
                    
                    // Rename the title based on the returned data type's name
                    if (resultData.type === "region" || resultData.type === "region_2") {
                        titleOne = "Last 24 Hours:";
                        titleTwo = "Last 7 Days:";

                        if (resultData.type === "region") {
                            titleThree = "Last 30 Days:"
                        }
                    } else {
                        titleOne = "Past Day:";
                        titleTwo = "Past Week:";
                        warningMsg = <p><strong>***Notice***</strong> WattTime data frequency is greater than 5min. Frequency is {resultData.msg}s </p>

                        if (resultData.type === "region_bad_freq") {
                            titleThree = "Past Month:";
                        }
                    }

                    // If the data returned type has 3 plots
                    if (resultData.type === "region" || resultData.type === "region_bad_freq") {
                        // Store the third plot's data and create a plot 
                        plotThree = JSON.parse(resultData.plot3)
                        plotThreeDisplay = <div className="row">
                            <p>{titleThree}</p>
                            <p>Average MOER: <span>{resultData.display_data.avg_month}<sup>lbs</sup>&frasl;<sub>MWh</sub></span></p>
                            <p>Percentage of Time at 0g of Carbon: <span>{resultData.display_data.month}%</span></p>
                            <p>Number of Times at 0g of Carbon: <span>{resultData.display_data.num_month_0}<sup></sup>&frasl;<sub>day</sub></span></p>
                            <Plot data={plotThree.data} layout={plotThree.layout}/>
                        </div>
                    }

                    result = <div>
                        {/* Display the title */}
                        <p>Balancing Authority: <span>{resultData.display_data.name}</span></p>
                        <p>Real Time Emissions: <span>{resultData.display_data.moer_value}<sup>lbs</sup>&frasl;<sub>MWh</sub></span></p>
                        <p>{warningMsg}</p>

                        {/* Display plot one */}
                        <div className="row">
                            <p>{titleOne}</p>
                            <p>Average MOER: <span>{resultData.display_data.avg_day}<sup>lbs</sup>&frasl;<sub>MWh</sub></span></p>
                            <p>Percentage of Time at 0g of Carbon: <span>{resultData.display_data.day}%</span></p>
                            <p>Number of Times at 0g of Carbon: <span>{resultData.display_data.num_day_0}<sup></sup>&frasl;<sub>day</sub></span></p>
                            <Plot data={plotOne.data} layout={plotOne.layout}/>
                        </div>
                        
                        {/* Display plot two */}
                        <div className="row">
                            <p>{titleTwo}</p>
                            <p>Average MOER: <span>{resultData.display_data.avg_week}<sup>lbs</sup>&frasl;<sub>MWh</sub></span></p>
                            <p>Percentage of Time at 0g of Carbon: <span>{resultData.display_data.week}%</span></p>
                            <p>Number of Times at 0g of Carbon: <span>{resultData.display_data.num_week_0}<sup></sup>&frasl;<sub>day</sub></span></p>
                            <Plot data={plotTwo.data} layout={plotTwo.layout}/>
                        </div>

                        {/* Display plot three */}
                        {plotThreeDisplay}

                    </div>
                // In case something went wrong, display error message manually
                } else {
                    result = <div>
                        <p>Sorry, somthing went wrong</p>
                    </div>
                }
            }
        }

        content = <div>
            {loadingResult ? <div className="loading">
                <div className="extra-space">
                    <br />
                </div> 
            
                <ClockLoader color={loadColor} css={override} size={150}/>
                <p className="loading-title">Trying to find the emission history</p>
                <p className="loading-desc">This might take a few seconds, a watched pot never boils!</p>
            </div> : 
            <div> 
                {result}
            </div>}
        </div>
    }


    // Return the Explore page
    return(    
        <div>
            {content}
        </div>
    );
}

export default Explore; 

