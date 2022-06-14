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


// Source code TIDAK DIPAKAI

//Desain Login 2

    // <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    //     <div className="max-w-md w-full space-y-8">
          
    //       <div> 
    //           <h2 className="mt-6 text-center text-3xl Yfont-extrabold text-gray-900">LOGIN</h2>
    //       </div>

    //       <form className="mt-8 space-y-6" action="#" method="POST">
    //         <input type="hidden" name="remember" defaultValue="true" />
    //         <div className="rounded-md shadow-sm -space-y-px">
              
    //           <div>
    //               <label htmlFor="email-address" className="sr-only">
    //                 Email address
    //               </label>
                  
    //               <input
    //                 id="email-address"
    //                 name="email"
    //                 type="email"
    //                 autoComplete="email"
    //                 required
    //                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //                 placeholder="Email address"
    //               />
    //           </div>

    //           <div>
    //               <label htmlFor="password" className="sr-only">
    //                 Password
    //               </label>
                
    //               <input
    //                 id="password"
    //                 name="password"
    //                 type="password"
    //                 autoComplete="current-password"
    //                 required
    //                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //                 placeholder="Password"
    //               />
    //           </div>
              
    //         </div>

    //         <div className="flex items-center justify-between">
              
    //           <div className="flex items-center">
                  
    //             <input
    //               id="remember-me"
    //               name="remember-me"
    //               type="checkbox"
    //               className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    //             />

    //             <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
    //               Remember me
    //             </label>

    //           </div>

    //           <div className="text-sm">
    //               <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
    //                 Forgot your password?
    //               </a>
    //           </div>

    //         </div>

    //         <div>
    //           <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                
    //             <span className="absolute left-0 inset-y-0 flex items-center pl-3">
    //               {/* <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" /> */}
    //             </span>

    //             Sign in
    //           </button>

    //         </div>

    //         <div className='flex justify-between py-8'>
                
    //             <p className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center'><FcGoogle className='mr-2' /> Google</p>
    //         </div>
    //       </form>
    //     </div>
    // </div>  


  

 

// desain Login 1  

    // <div className ="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      
    //   <div className ="hidden sm:block">
    //       <img className="w-full h-full object-cover" src={ImgLogin} alt="" />
    //   </div>
    //   <div className ="bg-green-200 flex flex-col justify-center">
    //         <form className="max-w-[400px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg">
    //             <h2 className="text-4xl dark:text-white font-bold text-center"> LOGIN </h2>
                
    //             <div className="flex flex-col text-gray-400 py-2">
    //               <label>Username</label>
    //               <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="Text" />
    //             </div>

    //             <div className="flex flex-col text-gray-400 py-2">
    //               <label>Password</label>
    //               <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="Password" />
    //             </div>

    //             <div>
    //               <p><input type="checkbox" /> Remember Me</p>
    //               <p>Forgot Password</p>
    //             </div>

    //             <button>Masuk</button>

    //         </form>
    //   </div>
    // </div>
