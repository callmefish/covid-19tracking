export default function currentUS(state="",action){
    switch (action.type) {
        case "CURRENT_US":
            return {
                updateTime: action.data.lastModified.slice(0,10),
                cardData: [
                    {cases: {
                        title: "TOTAL CASES",
                        number: action.data.positive,
                        recent: action.data.positiveIncrease
                    }},
                    {hospitalized: {
                        title: "HOSPITALIZED",
                        number: action.data.hospitalizedCurrently,
                        recent: action.data.hospitalizedIncrease
                    }},
                    {deaths: {
                        title: "TOTAL DEATHS",
                        number: action.data.death,
                        recent: action.data.deathIncrease
                    }}
                ]
            };
    }
    return state;
}