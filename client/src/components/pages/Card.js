import React, {useState, useContext, useEffect} from 'react'
import CountDown from '../../utils/CountDown'
import AuthContext from '../../context/auth/authContext'
import axios from 'axios';
import AlertContext from "../../context/alert/alertContext";

const Card = ({product}) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const [curBidVal,  setcurBidVal] = useState(product.basePrice);
    const [finished, setFinished] = useState(false);

    const { user, loadUser } = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        loadUser();
    }, [])

    const handleChange = (event) =>{
        setcurBidVal(event.target.value);
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        const time1= new Date(product.deadline);
        const time2= new Date();
        if(time1-time2 <=0 ){
            setAlert("Sorry, Auction is finished. Please bid on some other live Auction", "primary");
        }
        else if(user._id === product.sellerId){
            setAlert("A seller cannot bid for Auction", "primary");
        }
        else if(curBidVal > product.biddingPrice){
            console.log(curBidVal, user.name);
            console.log(user);
            const userName = user.name;
            const config = {
                headers: {
                  "Content-Type": "application/json"
                }
            };
            try {
                const res = await axios.put(`/api/products/${product._id}`, {curBidVal, userName}, config );
                setAlert("Thank you for bidding :) Please refresh the page to view changes", "primary");
            } catch (err) {
                console.log(err);
            }
        }
        else{
            setAlert("Your bidding price is smaller or equal to the maximum bid!!", "primary");
        }
    }

    return (
        <div className="card bg-light">  
            <h3 className="text-primary text-left">
                {product.name}
            </h3>
            <ul className="list">
                <li>
                    Uploaded by {product.sellerName}
                </li>
                {
                    product.buyerName === "" && (
                        <li>
                            No buyer yet
                        </li>
                    )
                }
                {
                    product.buyerName !== "" && (
                        <li>
                            Highest Bid: {product.biddingPrice} Rs by {product.buyerName}
                        </li>
                    )
                }
                <li>
                    <form onSubmit={onSubmit}>
                        <input type="number" value={curBidVal} name="bidval" min={product.basePrice} onChange={handleChange}/>
                        <button className="btn" type="submit">Place Bid</button>
                    </form>
                </li>
                <li>
                    <CountDown finalDate={product.deadline}/>
                </li>
            </ul>
        </div>
    )
}


export default Card;