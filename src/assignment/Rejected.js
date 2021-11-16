import React, { useEffect,useState } from 'react'
import { SearchBar } from './SearchBar'

export const Rejected = () => {
        const [mainData,setMainData]=useState([])
        const [filterData,setFilterData]=useState([])

        useEffect(async ()=>{
                const data=await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json")
                .then((resp)=>{
                        console.log(resp)
                        return resp.json()
                })
                let rejectlist = JSON.parse(localStorage.getItem("rejected"));
                const rejectedUser=data.filter(item=>{
                        return rejectlist.includes(item.id)
                })
                console.log("Main data",data)
                console.log("Rejeced User",rejectedUser)
                setMainData(rejectedUser)
                setFilterData(rejectedUser)
                
        },[])
        const clearList=()=>{
                const value=JSON.stringify([]);
                localStorage.setItem("rejected",value)
                setMainData([])
                setFilterData([])
        }
        return (
        <>
         <div>Rejected Candidates</div>
         <SearchBar data={mainData} setData={setFilterData} />
         <div style={{textAlign:"end"}}><button onClick={clearList}>Clear Reject List</button></div>
                <div style={{display:'flex' ,flexWrap:"wrap",justifyContent:"center"}}>
                       { filterData?.length ? filterData.map(item=>(
                               
                               
                                       <div style={{margin:"10px"}} key={item.id}>
                                       <img src={item.Image} width="200px" height="200px" />
                                       <div>Id : {item.id}</div>
                                       <div>Name : {item.name}</div>
                               </div>

                       
               )
               ):
               <div>No User Found</div>}
                </div>
                </>
        )
}
