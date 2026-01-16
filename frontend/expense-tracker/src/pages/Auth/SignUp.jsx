import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/Input'; 
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { UserContext } from '../../context/UserContext'; 

import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/apiClient';
import { API_PATHS } from '../../utils/apiPaths';

function SignUp() {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password."); 
      return;
    }

    setError("");

    try {
      let profileImageUrl = "";

      // --- STEP 1: Upload Image ---
      if (profilePic) {
        const formData = new FormData();
        formData.append("image", profilePic); 

        
        const uploadResponse = await axiosInstance.post(
            API_PATHS.IMAGE.UPLOAD_IMAGE, 
            formData, 
            {
                headers: {
                    "Content-Type": undefined, 
                },
            }
        );
        
        profileImageUrl = uploadResponse.data.imageUrl;
      }

      // --- STEP 2: Register User ---
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl, 
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Signup Error:", error); 
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input 
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />

            <Input 
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="John@example.com"
              type="text"
            />

            <Input 
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
            />
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5 mt-2'>{error}</p>}

          <button type='submit' className='btn-primary mt-4'>
            SIGN UP
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account? {" "}
            <Link className="font-medium text-violet-500 underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default SignUp;