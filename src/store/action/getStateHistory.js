import HTTP from "./http";

export default function getStateHistory(oneState){
    return function(dispatch){
        return HTTP.get("/states/" + oneState + "/daily.json").then(res=>{
            if(res.data.length > 0){
                return res.data.map(item=>{
                    let oldDate = item.date.toString();
                    let newDate = oldDate.slice(0, 4) + "-" + oldDate.slice(4,6) + "-" + oldDate.slice(6, 8);
                    return {
                        date: newDate,
                        positive: item.positive?item.positive:0,
                        positiveIncrease: item.positiveIncrease?item.positiveIncrease:0,
                        hospitalized: item.hospitalizedCurrently?item.hospitalizedCurrently:0,
                        hospitalizedIncrease: item.hospitalizedIncrease?item.hospitalizedIncrease:0,
                        death: item.death?item.death:0,
                        deathIncrease: item.deathIncrease?item.deathIncrease:0
                    }
                }).reverse();
            }
        });
    }
}