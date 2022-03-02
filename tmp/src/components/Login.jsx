import React ,{useState} from 'react'
import API from '../Api';
export default function Login() {
  const [users, setUsers] = useState({});
function handleInput(e) {
    e.preventDefault(); 
 
   setUsers({...users, [e.target.name]:e.target.value});
  };
  function handleSubmit(e){
    e.preventDefault();
    API.post(`api/auth/signin`,users).then(res => {
      console.log(res);
      console.log(res.data);
    })
  }

  return (
    <div className="container ">
    <div className="col-lg-8 mx-auto " >
       <div className="card-body bg-light card-header mt-5 pb-4">
         <h1 className="text-center">login</h1>
         <hr />
            <form  method="post" className="text-start" onSubmit={handleSubmit}>
        
               <div className="form-group">
                  <label>Email :</label>
                  <input type="text" onChange={handleInput} className="form-control mt-2" name="email" placeholder="Enter email address" />
               </div>
               <div className="form-group mt-2">
                  <label>Password :</label>
                  <input type="password" onChange={handleInput} className="form-control mt-2" name="password" placeholder="Enter password"/>
                  <span className="text-danger"></span>
               </div>
               <button type="submit" className="btn btn-block btn-info form-control mt-3">Sign In</button>
            </form>
       </div>
    </div>
 </div>
  )
}
