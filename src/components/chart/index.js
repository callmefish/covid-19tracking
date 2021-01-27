import { connect } from "react-redux";
import "../../css/chart.css";

import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DataZoomComponent,
    LegendComponent
} from 'echarts/components';
import {
    LineChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';
import USChart from "./usChart";
import StateChart from "./stateChart";


function Chart(props){
    // Minimal Bundle for echarts
    echarts.use([TitleComponent, TooltipComponent, GridComponent, DataZoomComponent, LineChart, CanvasRenderer, LegendComponent]);
    
    return (
        <div className="charts">
            <USChart
                className={"usChart"}
                echarts={echarts} 
                {...props} 
            />
            <StateChart
                className={"stateChart"}
                echarts={echarts} 
                {...props} 
            />
            <br />
            <hr />
        </div>
    )
}

export default connect(res=>{
    return res;
})(Chart);