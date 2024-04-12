import { useState } from "react";
import 'react-phone-number-input/style.css';
import PhoneInput from "react-phone-number-input";
import "./checkoutPersonalDetails.css";

const BACKEND_URL = "http://127.0.0.1:8000/api/v2/payment/";

export default function PersonalDetails() {
  const [phoneValue, setPhoneValue] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const phoneChangeHandler = (value: any) => {
    setPhoneValue(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = {
      first_name: firstName,
      last_name: lastName,
      address_line1: address1,
      address_line2: address2,
      city: city,
      zip: zip,
      phone_number: phoneValue
    };

    try {
      const userJSON = localStorage.getItem("user");
      if (!userJSON) {
        throw new Error("User data not found in localStorage.");
      }
      
      const user = JSON.parse(userJSON);
      if (!user.access) {
        throw new Error("Access token not found in user data.");
      }

      const accessToken = user.access;
      
      const response = await fetch(BACKEND_URL + "current-personal-details/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Form data submitted successfully!');
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  return (
    <div className="details-form-container">
      <form onSubmit={handleSubmit}>
        <div className="full-name">
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <input type="text" placeholder="Address 1" value={address1} onChange={(e) => setAddress1(e.target.value)} />
        <input type="text" placeholder="Address 2" value={address2} onChange={(e) => setAddress2(e.target.value)} />
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <input type="number" placeholder="Zip" value={zip} onChange={(e) => setZip(e.target.value)} />
        <PhoneInput
          placeholder="Enter phone number"
          value={phoneValue}
          onChange={phoneChangeHandler}
        />
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
}
