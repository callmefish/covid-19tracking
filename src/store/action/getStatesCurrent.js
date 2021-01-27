import HTTP from "./http";

export default function getStatesCurrent(){
    return function(dispatch){
        return HTTP.get("/states/current.json").then(res=>{
            if(res.data.length > 0){
                return res.data;
            }
        });
    }
}