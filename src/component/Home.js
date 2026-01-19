import { useState } from "react";
import "../component/Home.css";
import "./Apply"
import Apply from "./Apply";
const Home = ()=>{
    

    const[Jobs,SetJob] =useState([]);
    
    const Savedata=(event)=>{
        event.preventDefault();
let newtitle= event.target.name.value;
let newsalary = event.target.salary.value;
let newdiscription = event.target.discription.value;
let newimage = event.target.image.files[0];
let newjobtype = event.target.jobtype.value;
let newlocation = event.target.location.value;
 
const reader = new FileReader();
  reader.onload = () => {
let newjob ={newtitle, newsalary,newdiscription, 
    newimage:reader.result , newjobtype , newlocation};
SetJob([...Jobs,newjob]);

  }


reader.readAsDataURL(newimage); 
event.target.reset();

    }
    return (
        <>
        <h1 className="fw-bold text-center" id="heading"> Post your job</h1>
        <div  className="card p-3 mb-4 shadow-sm" id="box">
            <h3 id="post-now">Post now</h3>
            <hr></hr>
            <form onSubmit={Savedata}>
            <span>Titile:</span>
            <input type="text" placeholder="Title" name="name" required></input>
            <br></br>
            <hr></hr>
            <span>Salary:</span>
            <input type="text" placeholder="Salary$" name="salary" required></input>
            <br></br>
            <hr></hr>
            <span style={{position:"relative", bottom:'90px'}} >Discription:</span>
            <input type="text" placeholder="enter job discription" id="discription" name="discription" row="5" required></input>
            <br></br>
            <hr></hr>
            <span>Job-type:</span>
            <input type="text" placeholder="job-type"  name="jobtype" row="5" required></input>
             <br></br>
            <hr></hr>
            <hr></hr>
            <span>📍location:</span>
            <input type="text" placeholder="location"  name="location"  required></input>
             <br></br>
            <hr></hr>
            <input type="file" name="image" ></input>
            <br></br>
            <hr></hr>
            <button className="btn btn-primary" style={{position:"absolute", right:"30px"
            }}>Post</button>

            </form>
        </div>


        
<h1 style={{position:"relative", top:"1000px"}} id="heading">Your feed</h1>
        <div id="list-div">
           {Jobs.map((job,index)=>(
            <DataItem key={index} job={job} indexNumber={index}  Jobs={Jobs} SetJob ={SetJob}></DataItem>
           ))}
        </div>
        
        </>
    )
};

export default Home;



const DataItem =({job,Jobs,indexNumber,SetJob })=>{

const [NewApply, setapply] = useState(false);
    
     const Applyhandel =()=>{
            setapply(true);
     }
  
    const deleterow = ()=>{
         let finaldata = Jobs.filter((v, i) => i != indexNumber);
         if(confirm("are you sure to delete this")){
             console.log("user click yes");
             SetJob(finaldata);
             
             alert("Delete successfull")
             
            }
            else{
                console.log("user click cancel");
            }
        
    }


 
    return(

        <>
       <div className="card p-3 mb-4 shadow-sm"  id="box1" style={{position:"relative", top:"1000px" , backgroundColor:'red'}}>
        
<h1 style={{position:"relative", left:"150px" , fontWeight:"bold"}}>Job    <span onClick={deleterow} style={{fontSize:'3vh' , position:'relative', left:"110px", bottom:"20px"}}> 🗑️</span></h1>
        <img src={job.newimage} style={{  maxHeight:"250px", maxWidth:'370px' , position:"relative", left:"0px"}}></img>
        <h3>Titile:{job.newtitle}</h3>
        <h3>salary:{job.newsalary}</h3>
        <h3>discription:{job.newdiscription}</h3>
        <h3>Job-Type:{job.newjobtype}</h3>
        <h3>📍Location:{job.newlocation}</h3>
        <button className="btn btn-primary" onSubmit={Applyhandel}>  Apply</button>
          
       </div>
      
        </>
        

        
    );
};
