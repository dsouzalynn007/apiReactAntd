import React, { useEffect, useState } from "react";
import { Image, Pagination, Popover, Select } from "antd";
import Search from "antd/es/input/Search";
import axios from "axios";
import '../../display/Display.css'
import DisplayCard from "../../display/Display";
import { useLocation, useNavigate } from "react-router-dom";

const CountryApi=()=>{

    const navigate=useNavigate()
    const location=useLocation()
    const [InitialData, setInitialData]=useState([])
    const [Data, setData]=useState(InitialData)
    const [SearchValue, setSearchValue]=useState(undefined)
    const [SelectValue, setSelectValue]=useState(undefined)
    const [PageSize, setPageSize]=useState(30)
    const [DataLength, setDataLength]=useState(0)
  
    const SelectOptions = [
      {
        value: 'alphabetic',
        label: 'Alphabetically',
      },
      {
        value: 'areaWise',
        label: 'Area wise',
      },
      {
        value: 'asian',
        label: 'Asian countries',
      },
      {
        value: 'euroCurrency',
        label: 'Euro Currency',
      },
    ]
  
    const fetchFunc=async()=>{
      const response=await axios('https://restcountries.com/v3.1/all')
      const data=response.data
      setInitialData(data)
      setData(data)
      setDataLength(data?.length)
    }
    
    const onSelectFunc=(e)=>{
        setSelectValue(e)
        setSearchValue(undefined)
        switch(e){
            case SelectOptions[0].value : {
                let filterData=InitialData?.sort((a,b)=>a?.name?.common?.localeCompare(b?.name?.common))
                setData([...filterData])
                setDataLength(filterData?.length)
                break
            } case SelectOptions[1].value : {
                let filterData=InitialData?.sort((a,b)=>a?.area-b?.area)
                setData([...filterData])
                setDataLength(filterData?.length)
                break
            } case SelectOptions[2].value : {
                let filterData=InitialData?.filter((ele)=>ele?.continents[0]==='Asia')
                setData([...filterData])
                setDataLength(filterData?.length)
                break
            } case SelectOptions[3].value : {
                let filterData=InitialData?.filter((ele)=>ele?.currencies?.EUR?.name==='Euro')
                setData([...filterData])
                setDataLength(filterData?.length)
                break
            } default : setData(Data) 
        }
    }
  
    const onSearchFunc=(e)=>{
        setSearchValue(e.target.value)
        setSelectValue(undefined)
      let filterData=InitialData?.filter((ele)=>{
        let searchVal=e.target.value.toLowerCase()
        let filterVal=ele?.name?.common?.toLowerCase()
        return filterVal.includes(searchVal);
      })
      setData(filterData)
      setDataLength(filterData?.length)
    }
  
    const PaginationFunc=(page,size)=>{
        setPageSize(size)
        setData(InitialData.slice((page-1)*size,page*size))
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
  
    const onClickPop=(val)=>{
        InitialData.map(ele=>{
            if(val===ele?.ccn3){
                navigate('/result',{state:{objData:ele,prePath:location.pathname}})
            }
        })
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
          value={SelectValue}
      />
          <Search
            className="searchTag"
            onChange={onSearchFunc}
            placeholder="Search here"
            value={SearchValue}
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
          Data.slice(0,PageSize).map((ele,ind)=>{
            return(
                <div
                className="allDisplayMain"
                onClick={()=>onClickPop(ele?.ccn3)}
                >
                <Popover
                // title="Complete details"
                // content={PopOverComp(ele)}
                placement="right"
                >
                    <><DisplayCard
                        title={ele?.name?.common?.toUpperCase()}
                        description={ele?.area}
                        src={ele?.flags?.png}
                        alt={ele?.name?.common}
                        index={ind}
                    /></>
              </Popover>
                </div>
              
            )
          })
        }
      </div>
    { !(DataLength<PageSize) &&
        <Pagination
            className="paginationTag"
            onChange={PaginationFunc}
            total={DataLength}
            defaultPageSize={PageSize}
            showTotal={(total,range) => `${range[0]}-${range[1]}/${total}`}
        />
    }
      </>
  
    );
}

export default CountryApi