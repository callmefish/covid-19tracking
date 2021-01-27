import HTTP from "./http";

export default function getUSCurrent(){
    return function(dispatch){
        return HTTP.get("/us/current.json").then(res=>{
            if(res.data.length > 0){
                dispatch({
                    type: "CURRENTUS",
                    data: res.data[0]
                });
                return {
                    updateTime: res.data[0].lastModified.slice(0,10),
                    cardData: [
                        {
                            title: "TOTAL CASES",
                            number: res.data[0].positive,
                            recent: res.data[0].positiveIncrease
                        },
                        {
                            title: "HOSPITALIZED",
                            number: res.data[0].hospitalizedCurrently,
                            recent: res.data[0].hospitalizedIncrease
                        },
                        {
                            title: "TOTAL DEATHS",
                            number: res.data[0].death,
                            recent: res.data[0].deathIncrease
                        }
                    ]
                };
            }
        });
    }
}