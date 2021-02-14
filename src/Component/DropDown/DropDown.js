import React, { useState, useEffect } from 'react';
import './DropDown.css';

const DropDown = (props) => {
  const { options, selected, setSelected, multiselect, searchable = true } = props; 
  const [checkedAll, setCheckedAll]=useState(multiselect);
  const [searchText, setSearchText]=useState('');
  const [searchstate, setSearchState]=useState(searchable)

  const selectAll=(e)=>{
    setCheckedAll(e.target.checked);
     if(e.target.checked){
        let innerdata=[];
        innerdata = options.filter(item => 
                    (item.hasOwnProperty('label') ? 
                        item.label.toLowerCase() 
                        : item.toLowerCase()).includes(searchText.toLowerCase())).map((item) => 
                          item.label 
                            ? item.label : item 
                    )
                    setSelected(innerdata);
     }
     else{
        setSelected([]);
     }
  }

  useEffect(()=>{
    if(selected.length === options.filter(item => (item.hasOwnProperty('label') ? item.label.toLowerCase() 
            : item.toLowerCase()).includes(searchText.toLowerCase())).length
        )
    {
        if(selected.length) {
            setCheckedAll(true);
        }
        
    } else {
        setCheckedAll(false);
    }
  }, [selected]);


  const onSubmit=()=>{
    setSearchState(false);
  }
    
  const onClear=()=>{
    setSelected([]);
  }

  const DataObject = () => {
    let filter = options.filter(item => (item.hasOwnProperty('label') ? 
                    item.label.toLowerCase() : item.toLowerCase()).includes(searchText.toLowerCase()));
    return filter;
  }
      

  const checkOption=(data, title)=>{
    let searchedarray = data.filter(item=> item === title);
    if(searchedarray && searchedarray.length)
    {
      return true;
    } else {
      return false;
    }
  }

  const selectMultiple=(e, value)=>{
    if(e.target.checked){
      setSelected(prev=>[...prev, value]);
    }else{
      const data = selected.filter(item => item !== value)
      setSelected(data);
    }}

  return (
    <>
    <div style={{textAlign: "initial"}}>
        <h5 className="drop_down">Dropdown</h5>
        <input className='search_box' type='text' onChange={(e )=> setSearchText(e.target.value)} autoFocus placeholder='Search'/>
        <div className="selectBox">
            <div>
                {(DataObject() && DataObject().length>0) &&
                  <label className="container">
                    <input type="checkbox" checked={checkedAll} onChange={selectAll} />
                    <span className="checkBox_line"></span>
                  </label>
                }

            </div>
            <div className='select_body'>
                {DataObject().map((item, index)=>{
                    return(
                        <label 
                            className= {`container 
                                        ${checkOption(selected, (item.hasOwnProperty('label') ? 
                                            item.label 
                                            : item)) ? 
                                            'selected_text' : 
                                            ''}`
                                        } 
                                        key={index}
                        >
                        {item.hasOwnProperty('label') ? item.label : item}
                          <input type="checkbox" 
                            checked={checkOption(selected, (item.hasOwnProperty('label')
                                ? item.label 
                                : item))
                            } 
                            onChange={(e)=> selectMultiple(e, (item.hasOwnProperty('label') 
                                ? item.label 
                                : item))
                            }
                          />
                          <span className="checkMark"></span>
                        </label>
                    )}
                    )
                  }
                  </div>
            <div className='check_submit'>
                 <div className='submit_clear' onClick={onClear}>Clear</div>
                 <div className='submit_button' onClick={onSubmit}>Submit</div>
                </div>
            </div>
      </div>
    </>
  );
};

export default DropDown;
