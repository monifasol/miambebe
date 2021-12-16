import React from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';


const GraphicBars = ( { dataGoals, labelsFoodgroups } ) => {

    const styleAxis = {
                        axis: {stroke: "#4C536A"},
                        axisLabel: {fontSize: 6, fontFamily: "'Montserrat Alternates', sans-serif"},
                        grid: {stroke: "#eaeaea"},
                        ticks: {stroke: "#4C536A"},
                        tickLabels: {width: 40, 
                                    fontSize: 8, 
                                    padding: 4, 
                                    fontFamily: "'Montserrat Alternates', sans-serif"} }

    const buildTooltip = (datum) => {
        let message = `You wanted to give ${datum.goalQ} portions of ${datum.labelFoodgroup} this week, and baby ate ${datum.givenQ} so far`        
        let tooltipEl = document.getElementById('tooltip')
        tooltipEl.textContent = message
        tooltipEl.classList.add("show")
    }

    const hideTooltip = () => {
        let tooltipEl = document.getElementById('tooltip')
        tooltipEl.classList.remove("show")
    }

    return (

        <>

        <div id="tooltip" className="tooltip-databoard">Here it goes tooltip</div>
        
        <VictoryChart
                height={300}
                domainPadding={20}
                theme={VictoryTheme.material} 
                horizontal={true} 
                animate={{ duration: 500 }} >

                <VictoryAxis crossAxis
                    tickFormat={labelsFoodgroups}
                    style={styleAxis} 
                    //fixLabelOverlap={true} 
                    />

                <VictoryAxis crossAxis
                    tickValues={[0, 25, 50, 100]}
                    tickFormat={(x) => (`${x} %`)}
                    dependentAxis
                    animate={{ duration: 0, delay: 0 }}
                    style={styleAxis}
                 />

                <VictoryBar 
                    data={dataGoals}
                    x="foodgroup"
                    y="given"
                    categories={{ x: labelsFoodgroups }}

                    style={{
                            data: { fill: "#F6F4FF", stroke: "#ADA1D8", strokeWidth: 0.5 },
                            labels: { fontSize: 7, fill: "#333" } 
                           }}

                    alignment="middle"
                    barRatio={0.8}
                    cornerRadius={5}

                    events={[{
                        target: "data",
                        eventHandlers: {
                            onMouseOver: () => {
                                return [
                                    {   target: "data",
                                        mutation: (props) => { 
                                            buildTooltip(props.datum)
                                            return { style: { fill: "#E7E3F5", stroke: "#ADA1D8", strokeWidth: 0.5 }}
                                        }
                                    }
                                ];
                            },
                            onMouseOut: () => {
                                return [
                                    {   target: "data",
                                        mutation: () => { 
                                            hideTooltip()
                                            return { style: { fill: "#F6F4FF", stroke: "#ADA1D8", strokeWidth: 0.5 }}
                                        }
                                    }
                                ];
                            }
                        }
                        }]}
                />

            </VictoryChart>

            </>
    )
}

export default GraphicBars
