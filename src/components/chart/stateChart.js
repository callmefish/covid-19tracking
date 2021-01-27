import { useEffect, useRef , useState} from "react";
import "../../css/chart.css";
import getStateHistory from "../../store/action/getStateHistory";
import usStatesReverse from "./usStatesReverse.json";

function StateChart(props){
    let {dispatch, oneState, echarts, className} = props;
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
            text: 'COVID-19 ' + oneState + ' historic values',
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
    function showChart(option){
        myChart = echarts.init(lineChart.current);
        myChart.showLoading();
        if (!loading){
            myChart.hideLoading();
            myChart.setOption(option);
        }
    }
    function changeOption(option, date, pos, posI, hos, hosI, dea, deaI){
        option.xAxis.data = date;
        option.series[0].data = pos;
        option.series[1].data = posI;
        option.series[2].data = hos;
        option.series[3].data = hosI;
        option.series[4].data = dea;
        option.series[5].data = deaI;
        return option;
    }
    useEffect(()=>{
        showChart(option);
    }, []);
    useEffect(()=>{
        setLoading(false);
        console.log(oneState);
        if(oneState!==""){
            dispatch(getStateHistory(usStatesReverse[oneState])).then(res=>{
                let [date, pos, posI, hos, hosI, dea, deaI] = [
                    res.map(item=>item.date),
                    res.map(item=>item.positive),
                    res.map(item=>item.positiveIncrease),
                    res.map(item=>item.hospitalized),
                    res.map(item=>item.hospitalizedIncrease),
                    res.map(item=>item.death),
                    res.map(item=>item.deathIncrease)
                ];
                setHistoryDate(date);
                setPositive(pos);
                setPositiveIncrease(posI);
                setHospitalized(hos);
                setHospitalizedIncrease(hosI);
                setDeath(dea);
                setDeathIncrease(deaI);
                option = changeOption(option, date, pos, posI, hos, hosI, dea, deaI);
                showChart(option);
            });
        }
    }, [oneState])
    return (
        <div
            className={className}
            ref={lineChart}
        >

        </div>
    )
}

export default StateChart;