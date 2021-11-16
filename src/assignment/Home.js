import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import { SearchBar } from './SearchBar'

export const Home = () => {
        const [mainData,setMainData]=useState([])
        const [filterData,setFilterData]=useState([])
        const [search,setSearch]=useState("")
        useEffect(async ()=>{
                const data=await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json")
                .then((resp)=>{
                        console.log(resp)
                        return resp.json()
                })
                console.log(data)
                setMainData(data)
                setFilterData(data)
                let reject =localStorage.getItem("rejected")
                let shortlist=localStorage.getItem("shortlisted")
                const value=JSON.stringify([]);
                console.log("rejected",reject)
                if(!reject)
                {

                        localStorage.setItem("rejected",value)
                }
                if(!shortlist)
                {
                        localStorage.setItem("shortlisted",value) 
                }
        },[])
        useEffect(()=>{
                const keyword=search.toLowerCase();
                const newData=mainData.filter((item)=>{
                        if(item.id.toLowerCase().includes(keyword)||item.name.toLowerCase().includes(keyword))
                        {
                                return item
                        }
                })
                setFilterData(newData)
        },[search])

        const setData=(item)=>{
                console.log(item)
                localStorage.setItem("currentUser",JSON.stringify(item)) 
        }
        return (
                < >
                <div>Home</div>
                        {/* <input  value={search} onChange={(e)=>{setSearch(e.target.value)}}/> */}
                        <SearchBar data={mainData} setData={setFilterData} />
                        <a href="/shortlisted"><button style={{float:"right"}}  >SHORTLISTED</button></a>
                       <a href="/rejected"> <button style={{float:"right"}}>REJETCED</button></a>
                        <div style={{display:'flex' ,flexWrap:"wrap",justifyContent:"center"}}>
                        { filterData?.length ? filterData.map(item=>(
                               
                                        <Link to={{pathname:`/${item.id}`,
                                                data:"Hello"}} onClick={()=>{setData(item)}} key={item.id}>
                                                <div style={{margin:"10px"}} >
                                                <img src={item.Image} width="200px" height="200px" />
                                                <div>Id : {item.id}</div>
                                                <div>Name : {item.name}</div>
                                        </div>
                                        </Link>

                                
                        )
                        ):
                        <div>No User Found</div>}
                        
                        </div>

                        
                </>
        )
}
