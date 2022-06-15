import React from "react";
import {FcGoogle} from 'react-icons/fc';
import ImgLogin from "../assets/ImgLogin.jpg";
import logo from "../assets/logo.png";


const Login = () => {
  return (

      <div className ="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
          <div className ="hidden sm:block">
            <img className="w-full h-full object-cover" src={ImgLogin} alt="" />
          </div>
 
          <div className ="bg-green-200 flex flex-col justify-center">
              <form className="max-w-[400px] w-full mx-auto bg-gray-50 p-8 px-8 rounded-lg">        
                
                <img className ="max-w-[250px] w-full mx-auto p-5 px-10" src={logo} alt=""/>
                
                <p className ="text-xl font-normal text-center mb-5">
                  Silahkan untuk melakukan Login
                </p>
               
                <div className='flex justify-center py-100'>
                  <button className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center'><FcGoogle className='mr-2' /> Google</button>
                </div>

              </form>
          </div>
      </div>
    
  );
};

export default Login;
