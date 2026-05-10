import { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactForm = () =>{

    const { dispatch } = useGlobalReducer();

    const [contact,setContact] = useState({
        fullName:"",
        email:"",
        phone:"",
        address: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setContact((prev)=>({...prev,[name]: value}));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch({ type: "add_contact", payload: contact});
    };


    return(
        <div className="contact-form-container">
            <div className="contact-form-wrapper">
                <h1 className="contact-form-title">Add a new contact</h1>

                <form className="contact-form">

                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input name="fullName" value={contact.fullName} onChange={handleChange} type="text" placeholder="Full Name" className="form-input"/>
                </div>

            
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input name="email" value={contact.email} onChange={handleChange} type="email" placeholder="Enter email" className="form-input"/>
                </div>

                <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input name="phone" value={contact.phone} onChange={handleChange} type="tel" placeholder="Enter phone" className="form-input"/>
                </div>

                
                <div className="form-group">
                    <label className="form-label">Address</label>
                    <input name="address" value={contact.address} onChange={handleChange} type="text" placeholder="Enter address" className="form-input"/>
                </div>

            
                <button type="submit" className="form-button">
                    Save Contact
                </button>
                </form>

                <div className="contact-form-footer">
                <a href="#" className="contact-form-link">or get back to contacts</a>
                </div>
            </div>
        </div>
    )
}