import { useEffect, useRef , useState} from "react";
import "../../css/chart.css";
import getUSHistory from "../../store/action/getUSHistory";

function USChart(props){
    let {dispatch, mapType, echarts, className} = props;
    // initialize data
    const [historyDate, setHistoryDate] = useState([]);
    const [positive, setPositive] = useState([]);
    const [positiveIncrease, setPositiveIncrease] = useState([]);
    const [hospitalized, setHospitalized] = useState([]);
    const [hospitalizedIncrease, setHospitalizedIncrease] = useState([]);
    const [death, setDeath] = useState([]);
    const [deathIncrease, setDeathIncrease] = useState([]);
    // loading of map
    const [loading, setLoading] = useState(true);
    var lineChart = useRef(null);
    var option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            top: '0%',
            text: 'COVID-19 US historic values',
        },
        legend:{
            data: ['Positive', 'Positive Increase', 'Hospitalized', 'Hospitalized Increase', 'Death', 'Death Increase'],
            type: "scroll",
            padding: [30, 0]
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: historyDate
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [{
            type: 'inside',
            start: 50,
            end: 100
        }, {
            start: 0,
            end: 10
        }],
        series: [
            {
                name: 'Positive',
                type: 'line',
                data: positive
            },
            {
                name: 'Positive Increase',
                type: 'line',
                data: positiveIncrease
            },
            {
                name: 'Hospitalized',
                type: 'line',
                data: hospitalized
            },
            {
                name: 'Hospitalized Increase',
                type: 'line',
                data: hospitalizedIncrease
            },
            {
                name: 'Death',
                type: 'line',
                data: death
            },
            {
                name: 'Death Increase',
                type: 'line',
                data: deathIncrease
            }
        ]
    };
    var myChart;
    // configuration item of loading animation, which is related to loading type.
    var defaultLoading = {
        text: 'Double Click',
        color: '#c23531',
        textColor: '#c23531',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0,
      
        // Font size. Available since `v4.8.0`.
        fontSize: 30,
        // Show an animated "spinner" or not. Available since `v4.8.0`.
        showSpinner: true,
        // Radius of the "spinner". Available since `v4.8.0`.
        spinnerRadius: 10,
        // Line width of the "spinner". Available since `v4.8.0`.
        lineWidth: 5,
        // Font thick weight. Available since `v5.0.1`.
        fontWeight: 'bold',
        // Font style. Available since `v5.0.1`.
        fontStyle: 'normal',
        // Font family. Available since `v5.0.1`.
        fontFamily: 'sans-serif'
    };
    function showChart(){
        // avoid init again
        myChart = echarts.getInstanceByDom(lineChart.current);
        if(!myChart){
            myChart = echarts.init(lineChart.current);
        }
        myChart.showLoading('default', defaultLoading);
        if (!loading){
            myChart.hideLoading();
            myChart.setOption(option);
        }
    }
    useEffect(()=>{
        dispatch(getUSHistory()).then(res=>{
            // update the data
            setHistoryDate(res.map(item=>item.date));
            setPositive(res.map(item=>item.positive));
            setPositiveIncrease(res.map(item=>item.positiveIncrease));
            setHospitalized(res.map(item=>item.hospitalized));
            setHospitalizedIncrease(res.map(item=>item.hospitalizedIncrease));
            setDeath(res.map(item=>item.death));
            setDeathIncrease(res.map(item=>item.deathIncrease));
            showChart();
        });
    }, []);
    useEffect(()=>{
        // if change the mapType, show the map
        setLoading(false);
        showChart();
    }, [mapType!==""]);
    return (
        <div
            className={className}
            ref={lineChart}
            onDoubleClick={()=>{
                // Double click to show the map
                setLoading(false);
                showChart();
            }}
        >

        </div>
    )
}

export default USChart;