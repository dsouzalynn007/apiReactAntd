import React, { useEffect, useState } from "react";
import { Card, Image, Popover, Select } from "antd";
import Search from "antd/es/input/Search";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import '../../display/Display.css'

const CountryApi=()=>{
    
    const [InitialData, setInitialData]=useState([])
    const [Data, setData]=useState(InitialData)
  console.log(Data)
  
    const SelectOptions = [
      {
        value: 'alphabetic',
        label: 'Alphabetically',
      },
      {
        value: 'decendingid',
        label: 'LoginID Decending',
      },
      {
        value: 'user',
        label: 'All Users',
      },
      {
        value: 'organization',
        label: 'Organization',
      },
    ]
  
    const fetchFunc=async()=>{
      const response=await axios('https://restcountries.com/v3.1/all')
      const data=response.data
      setInitialData(data)
      setData(data)
    }
    
    const onSelectFunc=(e)=>{
        switch(e){
            case SelectOptions[0].value : {
                let filterData=InitialData?.sort((a,b)=>a.login.localeCompare(b.login))
                setData([...filterData])
                break
            } case SelectOptions[1].value : {
                let filterData=InitialData?.sort((a,b)=>b.id-a.id)
                setData([...filterData])
                break
            } case SelectOptions[2].value : {
                let filterData=InitialData?.filter((ele)=>ele.type==='User')
                setData([...filterData])
                break
            } case SelectOptions[3].value : {
                let filterData=InitialData?.filter((ele)=>ele.type==='Organization')
                setData([...filterData])
                break
            } default : setData(Data) 
        }
    }
  
    const onSearchFunc=(e)=>{
      let filterData=InitialData?.filter((ele)=>{
        let searchVal=e.target.value.toLowerCase()
        let filterVal=ele?.login.toLowerCase()
        return filterVal.includes(searchVal);
      })
      setData(filterData)
    }
  
    useEffect(()=>{
      fetchFunc()
    },[])
  
    const PopOverComp=(ele)=>{
      return(
        <div>
          {
            // Object.entries(ele).map(([keys,values])=>{
            //   return(  
            //   <div key={keys} className="popoverMainDiv">
            //     <table>
            //       {values &&
            //       <tbody>
            //       <tr>
            //         <th>
            //           {keys} :
            //         </th>
            //         <td>
            //           {values}
            //         </td>
            //       </tr>
            //       </tbody>
            //       }
            //     </table>
            //   </div>
            //   )
            // })
          }
        </div>
      )
    }
  
    return (
      <>
        <h2>Countries</h2>
        <div className="searchTagParent">
        <Select
          className="selectTag"
          placeholder='Filter here'
          options={SelectOptions}
          onChange={onSelectFunc}
          allowClear
          onClear={fetchFunc}
      />
          <Search
            className="searchTag"
            onChange={onSearchFunc}
            placeholder="Search here"
          />
        </div>
        <div id="mainDivTag">
        { Data.length===0 ? 
            <Image
              height={500}
              src='https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png'
              preview={false}
            /> 
            : 
          Data.map((ele,ind)=>{
            return(
              <Popover
                // title="Complete details"
                content={PopOverComp(ele)}
                placement="right"
                >
              <Card
                className="antdCard"
                key={ind}
                hoverable
              >
                <Meta 
                  className="metaTag"
                  title={ele?.name?.common?.toUpperCase()}
                  description={ele?.area}
                />
                <Image
                  height={100}
                  src={ele?.flags?.png}
                  alt={ele?.name?.common}
                  preview={false}
                />
              </Card>
              </Popover>
            )
          })
        }
      </div>
      </>
  
    );
}

export default CountryApi