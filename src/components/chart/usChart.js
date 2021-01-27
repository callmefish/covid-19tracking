import { useEffect, useRef , useState} from "react";
import "../../css/chart.css";
import getUSHistory from "../../store/action/getUSHistory";

function USChart(props){
    let {dispatch, mapType, echarts, className} = props;
    const [historyDate, setHistoryDate] = useState([]);
    const [positive, setPositive] = useState([]);
    const [positiveIncrease, setPositiveIncrease] = useState([]);
    const [hospitalized, setHospitalized] = useState([]);
    const [hospitalizedIncrease, setHospitalizedIncrease] = useState([]);
    const [death, setDeath] = useState([]);
    const [deathIncrease, setDeathIncrease] = useState([]);
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
    function showChart(){
        myChart = echarts.init(lineChart.current);
        myChart.showLoading();
        if (!loading){
            myChart.hideLoading();
            myChart.setOption(option);
        }
    }
    useEffect(()=>{
        dispatch(getUSHistory()).then(res=>{
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
        setLoading(false);
        showChart();
    }, [mapType!==""]);
    return (
        <div
            className={className}
            ref={lineChart}
            onDoubleClick={()=>{
                setLoading(false);
                showChart();
            }}
        >

        </div>
    )
}

export default USChart;