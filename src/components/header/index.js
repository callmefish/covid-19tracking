import { useEffect, useRef, useState } from "react"
import { connect} from "react-redux";
import getUSCurrent from "../../store/action/getUSCurrent";
import "../../css/header.css"

function Header(props){
    let {dispatch, setMapType} = props;
    const secondHeader = useRef(null);
    const [updateTime, setUpdateTime] = useState("2021-01-25");
    const [cardData, setCardData] = useState([
        {
            title: "TOTAL CASES",
            number: 24935139,
            recent: 133067
        },
        {
            title: "HOSPITALIZED",
            number: 109936,
            recent: 2515
        },
        {
            title: "TOTAL DEATHS",
            number: 411823,
            recent: 1593
        }
    ]);
    useEffect(()=>{
        dispatch(getUSCurrent()).then(res=>{
            setUpdateTime(res.updateTime);
            setCardData(res.cardData);
        });
    }, []);
    function itemActive(Index){
        let cards = secondHeader.current.querySelectorAll(".card");
        cards.forEach(item => {
            item.classList.remove("active");
        });
        cards.forEach((item, index)=>{
            if(index==Index){
                item.classList.add("active");
            }
        })
    }
    return (
        <div className="header">
            <div className="firstHeader">
                <h1>COVID-19 Tracking</h1>
                <p>Track the spread of the Coronavirus (Covid-19) Outbreak in the U.S.</p>
                <i>{"Last Updated: " + updateTime}</i>
            </div>
            <br />
            <hr />
            <div className="secondHeader" ref={secondHeader}>
                {
                    cardData.map((item, index)=>(
                        <div 
                            className="card" 
                            key={index}
                            onClick={()=>{
                                itemActive(index);
                                setMapType(item.title);
                            }}
                        >
                            <h3>{item.title}</h3>
                            <div className="card-number">{item.number.toLocaleString()}</div>
                            <div className="card-recent">+ {item.recent.toLocaleString()} New Cases</div>
                        </div>
                    ))
                }
            </div>
            <br />
            <hr />
        </div>
    )
}
export default connect(res=>{
    return res
})(Header);