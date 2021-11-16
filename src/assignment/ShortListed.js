import React, { useEffect,useState } from 'react'
import { SearchBar } from './SearchBar'

export const ShortListed = () => {
        const [mainData,setMainData]=useState([])
        const [filterData,setFilterData]=useState([])

        useEffect(async ()=>{
                const data=await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json")
                .then((resp)=>{
                        console.log(resp)
                        return resp.json()
                })
                let shortlist = JSON.parse(localStorage.getItem("shortlisted"));
                const shortlistUser=data.filter(item=>{
                        return shortlist.includes(item.id)
                })
                console.log("Main data",data)
                console.log("Rejeced User",shortlistUser)
                setMainData(shortlistUser)
                setFilterData(shortlistUser)
                
        },[])
        const clearList=()=>{
                const value=JSON.stringify([]);
                localStorage.setItem("shortlisted",value)
                setMainData([])
                setFilterData([])
        }
        return (
        <>
        <div>Shortlisted Candidates</div>
        <SearchBar data={mainData} setData={setFilterData} />
       <div style={{textAlign:"end"}}> <button onClick={clearList} >Clear Short List</button></div>
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
