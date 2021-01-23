import React, { Fragment, useState, useEffect, useContext } from 'react'
import AuthContext from "../../context/auth/authContext"
import axios from 'axios'
import AlertContext from "../../context/alert/alertContext";

const CreateProduct = () => {

    const [values, setValues] = useState({
        name: '', 
        formData: '',
        deadline: '', 
        sellerName: '', 
        basePrice: 0, 
        photo: ''
    })

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { user, loadUser } = authContext;
    const { setAlert } = alertContext;

    const {name, formData, deadline, basePrice, sellerName, photo} = values;

    useEffect(() => {
        loadUser();
        setValues({...values, sellerName: user.name, formData: new FormData()});
        // eslint-disable-next-line
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        setValues({ ...values, [name]: value });
    }

    const clickSubmit = async (event)  =>{
        event.preventDefault();
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        try {
            const savedProduct = axios.post("/api/products", {name, sellerName, basePrice, deadline}, config);
            setAlert("Product is saved successfully", "success");
            console.log(savedProduct);
        }catch(err){
            console.log(err)
        }
    } 

    const showform = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" value={name} onChange={handleChange('name')}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Deadline</label>
                <input type="date" className="form-control" value={deadline} onChange={handleChange('deadline')}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Base Price</label>
                <input type="Number" className="form-control" value={basePrice} onChange={handleChange('basePrice')}/>
            </div>
            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    )
    return (
        <Fragment>
            {showform()}
        </Fragment>
    )
}

export default CreateProduct;
