import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormData from "form-data"
import baseurl from "../config";
import axios from "axios";

function CreateWarden() {
  const [hostel, setHostel] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("")
  const [warden, setWarden] = useState("")
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [percentage, setPercentage] = useState(0)
  const handleSubmit = async (e) => {
    e.preventDefault();
        const res = await axios.post(
        `${baseurl}/admin/createWardenAccount`,
        {
            email: email,
            name: name,
            hostelid: hostel,
            contactno: phone,
            password: password,
            wardenid: warden
        },
        {
            headers: {
            Authorization: localStorage.getItem("jwtToken")
                ? `Bearer ${localStorage.getItem("jwtToken")}`
                : "",
            "Content-type": "application/json",
            },
        }
        );
        
        setHostel("")
        setName("")
        setPassword("")
        setWarden("")
        setEmail("")
        setPhone("")

        if (res.status === 200) {
        console.log("Submitted successfully");
        } else {
        console.error("Something went wrong!");
        }
    }

    const selectFile = async(e) => {
      const files = Array.from(e.target.files)
      const file = files[0]

      var bodyFormData = new FormData()

      bodyFormData.append('photo', file)

      const options = {
        headers: {
          "Content-type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          let percent = Math.floor(loaded * 100 / total)
          console.log(`${percent}%`)

          if(percent < 100) {
            setPercentage(percent)
          }
        }
      }

      const res = await axios.post(
        `${baseurl}/sendPhoto`,
        bodyFormData,
        options
      )
      var content = res.data.url
      const response = await axios.post(
        `${baseurl}/admin/createWardenAccount`,
        {
          email: email,
          name: name,
          password: password,
          wardenid: warden,
          hostelid: hostel,
          contactno: phone,
          image: content
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken")
              ? `Bearer ${localStorage.getItem("jwtToken")}`
              : "",
            "Content-type": "application/json",
          },
        }
      )

      if(response.status === 200) {
        console.log('Warden created successfully')
      } else {
        console.error('Something went wrong!')
      }
    }

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handleHostelChange = (e) => {
    e.preventDefault();
    setHostel(e.target.value);
  };
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const handlePhoneChange = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
  };
  const handleWardenChange = (e) => {
    e.preventDefault();
    setWarden(e.target.value);
  };

  return (
    <div className="">
      <h1 className="text-4xl mt-2 text-center">Create Warden</h1>
      <div className="grid grid-cols-3">
      <div className="mx-auto text-center w-80 col-span-1">
        <h1 className="text-center text-2xl mt-20 mb-8">Email</h1>
        <TextField
          id="email"
          label="Enter your email..."
          type="email"
          multiline
          onChange={handleEmailChange}
          defaultValue=""
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="mx-auto text-center w-80 col-span-1">
        <h1 className="text-center text-2xl mt-20 mb-8">Name</h1>
        <TextField
          id="name"
          label="Enter your name..."
          type="text"
          multiline
          onChange={handleNameChange}
          defaultValue=""
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="mx-auto text-center w-80 col-span-1">
        <h1 className="text-center text-2xl mt-20 mb-8">Hostel ID</h1>
        <TextField
          id="hostelid"
          label="Enter your hostel..."
          type="text"
          multiline
          onChange={handleHostelChange}
          defaultValue=""
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="mx-auto text-center w-80 col-span-1">
        <h1 className="text-center text-2xl mt-20 mb-8">Phone</h1>
        <TextField
          id="phone"
          label="Enter your phone..."
          type="text"
          multiline
          onChange={handlePhoneChange}
          defaultValue=""
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="mx-auto text-center w-80 col-span-1">
        <h1 className="text-center text-2xl mt-20 mb-8">Password</h1>
        <TextField
          id="password"
          label="Enter your password..."
          type="text"
          multiline
          onChange={handlePasswordChange}
          defaultValue=""
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="mx-auto text-center w-80 col-span-1">
        <h1 className="text-center text-2xl mt-20 mb-8">Warden ID</h1>
        <TextField
          id="warden"
          label="Enter your warden..."
          type="text"
          multiline
          onChange={handleWardenChange}
          defaultValue=""
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="mx-auto text-center w-80 col-span-1">
        <h1 className="text-center text-2xl mt-20 mb-8">Upload Photo</h1>
        
        <input id="file-image" onChange={selectFile} type="file" name="avatar"></input>

        {percentage > 0 && 
        <div className="w-full bg-gray-200 rounded-full">
          <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style="width: 25%"> 25%</div>
        </div>
        }
        
      </div>
      </div>

      <div className="mx-auto text-center mt-20">
        <button
          className="text-white bg-black px-4 py-2 rounded-3xl"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreateWarden;