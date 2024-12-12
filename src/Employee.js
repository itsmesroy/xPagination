
import React from 'react'
import './App.css';
import {useState, useEffect}  from 'react' ;

const EmployeeData=()=>{
  const [data, setData]= useState([]);
  const [loading, setLoading]=useEffect(true);
  const [currentPage, setCurrentPage]=useState(1);
  const[error, setError]= useState(false);

const rowPerPage= 10;
useEffect(()=>{
    const fetchData=async()=>{
        try{
            const response= await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
            if(!response.ok)throw new Error("Error fetching data")
            const res= await response.json()
            setData(res);
            setLoading(false);
        }catch(error){
            setError(true);
            setLoading(false);
            alert("Fail")
        }
    };
    fetchData();
},[]);
const handlePrevious=()=>{
    if(currentPage>1){
        setCurrentPage(currentPage-1);
    };
}
     const   handleNext=()=>{
          if(currentPage<totalPages){
              setCurrentPage(currentPage+1);
        
          }
        }
    if(loading){
        return<div>Loading..</div>
    }
if(error){
    return <div>Error fetching data</div>
}
const totalPages= Math.ceil(data.length/rowPerPage); //pagination logic
const currentData= data.slice((currentPage-1)*rowPerPage,currentPage*rowPerPage);
  return (
    <div className="App">
      <div>
        <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                 </tr>                
            </thead>
            <tbody>
                {
                    currentData.map((employee,index)=>(
                <tr key={index}>
                    <th>{employee.id}</th>
                    <th>{employee.name}</th>
                    <th>{employee.email}</th>
                    <th>{employee.role}</th>
                </tr>

                    ))}
            </tbody>
        </table>
        <div>
            <button onClick={handlePrevious} disabled={currentPage===1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNext} disabled={currentPage===totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeData;
