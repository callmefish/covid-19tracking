import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
} from "echarts/components";
import { MapChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useRef, useState } from "react";
import usaMap from "./usaMap.json";
import usStates from "./usStates.json";
import "../../css/map.css";
import { connect } from "react-redux";
import getStatesCurrent from "../../store/action/getStatesCurrent";

function Map(props) {
  let {dispatch, setOneState, mapType} = props;
  // Minimal Bundle for echarts
  echarts.use([TitleComponent,ToolboxComponent,TooltipComponent,VisualMapComponent,GeoComponent,MapChart,CanvasRenderer,]);
  // initial value use the map of population estimates
  let [mapData, setMapData] = useState([
    {name: 'Alabama', value: 4822023},
    {name: 'Alaska', value: 731449},
    {name: 'Arizona', value: 6553255},
    {name: 'Arkansas', value: 2949131},
    {name: 'California', value: 38041430},
    {name: 'Colorado', value: 5187582},
    {name: 'Connecticut', value: 3590347},
    {name: 'Delaware', value: 917092},
    {name: 'District of Columbia', value: 632323},
    {name: 'Florida', value: 19317568},
    {name: 'Georgia', value: 9919945},
    {name: 'Hawaii', value: 1392313},
    {name: 'Idaho', value: 1595728},
    {name: 'Illinois', value: 12875255},
    {name: 'Indiana', value: 6537334},
    {name: 'Iowa', value: 3074186},
    {name: 'Kansas', value: 2885905},
    {name: 'Kentucky', value: 4380415},
    {name: 'Louisiana', value: 4601893},
    {name: 'Maine', value: 1329192},
    {name: 'Maryland', value: 5884563},
    {name: 'Massachusetts', value: 6646144},
    {name: 'Michigan', value: 9883360},
    {name: 'Minnesota', value: 5379139},
    {name: 'Mississippi', value: 2984926},
    {name: 'Missouri', value: 6021988},
    {name: 'Montana', value: 1005141},
    {name: 'Nebraska', value: 1855525},
    {name: 'Nevada', value: 2758931},
    {name: 'New Hampshire', value: 1320718},
    {name: 'New Jersey', value: 8864590},
    {name: 'New Mexico', value: 2085538},
    {name: 'New York', value: 19570261},
    {name: 'North Carolina', value: 9752073},
    {name: 'North Dakota', value: 699628},
    {name: 'Ohio', value: 11544225},
    {name: 'Oklahoma', value: 3814820},
    {name: 'Oregon', value: 3899353},
    {name: 'Pennsylvania', value: 12763536},
    {name: 'Rhode Island', value: 1050292},
    {name: 'South Carolina', value: 4723723},
    {name: 'South Dakota', value: 833354},
    {name: 'Tennessee', value: 6456243},
    {name: 'Texas', value: 26059203},
    {name: 'Utah', value: 2855287},
    {name: 'Vermont', value: 626011},
    {name: 'Virginia', value: 8185867},
    {name: 'Washington', value: 6897012},
    {name: 'West Virginia', value: 1855413},
    {name: 'Wisconsin', value: 5726398},
    {name: 'Wyoming', value: 576412},
    {name: 'Puerto Rico', value: 3667084}
  ]);
  // uesRef hold a mutable value in its .current property.
  var myChart = useRef(null);
  var visualMap = {
      left: "right",
      min: 500000,
      max: 38000000,
      inRange: {
        color: ["#313695","#4575b4","#74add1","#abd9e9","#e0f3f8","#ffffbf","#fee090","#fdae61","#f46d43","#d73027","#a50026",],
      },
      text: ["High", "Low"], // Text, default is numeric text
      calculable: true,
  };
  // option for echarts
  var option = {
    title: {
      text: 'USA ' + `${mapType?mapType:"Population Estimates (2012)"}`,
      left: 'center'
    },
    tooltip: {
      trigger: "item",
      triggerOn: "click",
      showDelay: 0,
      transitionDuration: 0.2,
      formatter: function (params) {
        var paramsData = params.data;
        setOneState(paramsData.name);
        if(paramsData.hasOwnProperty("positive")){
          return (`<div>
              <b>${paramsData.name}</b><br />
              <b>Positive</b> : ${paramsData.positive}<br />
              <b>Positive Increase</b> : ${paramsData.positiveIncrease}<br />
              <b>Hospitalized</b> : ${paramsData.hospitalized}<br />
              <b>Hospitalized Increase</b> : ${paramsData.hospitalizedIncrease}<br />
              <b>Death</b> : ${paramsData.death}<br />
              <b>Death Increase</b> : ${paramsData.deathIncrease}
            <div>`);
        }else{
          return (
            `<div>
              <b>${paramsData.name}</b><br />
              <b>Population</b> : ${paramsData.value}<br />
            </div>`
          );
        }
      },
    },
    visualMap: visualMap,
    toolbox: {
      show: true,
      //orient: 'vertical',
      left: "left",
      top: "top",
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: "USA map",
        type: "map",
        roam: true,
        scaleLimit: {
          min: 1,
          max: 3,
        },
        map: "USA",
        emphasis: {
          label: {
            show: true,
          },
        },
        // Text position correction
        textFixed: {
          Alaska: [20, -20],
        },
        data: mapData,
      },
    ],
  };
  var chart;
  function showMap() {
    // if has an instance, don't initialize again
    chart = echarts.getInstanceByDom(myChart.current);
    if(!chart){
      chart = echarts.init(myChart.current);
    }
    echarts.registerMap("USA", usaMap, {
      // change some place of state on the map
      Alaska: {
        left: -131,
        top: 25,
        width: 15,
      },
      Hawaii: {
        left: -113,
        top: 24,
        width: 5,
      },
      "Puerto Rico": {
        left: -76,
        top: 26,
        width: 2,
      },
    });
    // Configuration item, data, universal interface, all parameters and data can all be modified through setOption. 
    // ECharts will merge new parameters and data, and then refresh chart.
    chart.setOption(option);
  }

  useEffect(() => {
    // first mount, get data
    dispatch(getStatesCurrent()).then((res) => {
      let ans = [];
      for (let i = 0; i < res.length; i++) {
        if (usStates.hasOwnProperty(res[i].state)) {
          ans.push({
            name: usStates[res[i].state],
            positive: res[i].positive?res[i].positive:0,
            positiveIncrease: res[i].positiveIncrease?res[i].positiveIncrease:0,
            death: res[i].death?res[i].death:0,
            deathIncrease: res[i].deathIncrease?res[i].deathIncrease:0,
            hospitalized: res[i].hospitalized?res[i].hospitalized:0,
            hospitalizedIncrease: res[i].hospitalizedIncrease?res[i].hospitalizedIncrease:0,
          });
        }
      }
      // update to mapData
      setMapData(ans);
      // show the map
      showMap();
    });
  }, []);

  // change the min value and max value of map
  function changeMinMax(minValue, maxValue, itemValue){
    if(maxValue < itemValue){
      maxValue = itemValue; 
    }
    if(minValue > itemValue){
      minValue = itemValue;
    }
    return [minValue, maxValue];
  }
  // change value of mapData, and the min and max value of visualMap
  function changeValue(){
    let minV = 38000000;
    let maxV = 0;
    if(mapType==="TOTAL CASES"){
      mapData.map(item=>{
        item.value=item.positive;
        [minV, maxV] = changeMinMax(minV, maxV, item.value);
        return item;
      });
    }else if(mapType==="HOSPITALIZED"){
      mapData.map(item=>{
        item.value=item.hospitalized;
        [minV, maxV] = changeMinMax(minV, maxV, item.value);
        return item;
      });
    }else if(mapType==="TOTAL DEATHS"){
      mapData.map(item=>{
        item.value=item.death;
        [minV, maxV] = changeMinMax(minV, maxV, item.value);
        return item;
      });
    }
    visualMap.min = minV;
    visualMap.max = maxV;
  }
  useEffect(()=>{
    // depends on mapType to change the map
    if (mapType!==""){
      changeValue();
    }
    showMap();
  }, [mapType]);

  return (
    <div className="map">
      <div className="mapChart" ref={myChart}></div>
      <br />
      <hr />
    </div>
  );
}
export default connect((res) => res)(Map);
