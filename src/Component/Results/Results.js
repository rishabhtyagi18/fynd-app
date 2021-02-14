import React, { useState, useEffect } from 'react';
import './Results.css';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';

const Results = ({type, selected}) => {

  const [input, setInput] = useState("");

  useEffect(() => {
    let str = type + ' -';
    if(selected) {
        str = str + selected.join(', ');
    } 
    setInput(str);
  }, [selected, type]);

  useEffect(() => {
    console.log(input);
  }, [input]);

  const handleChange = (e) => {};

  return (
    <>
    <div className="result_container">
      <h5 className="results">Result</h5>
      <FormControl variant="outlined" className="form_control">
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={input}
          style={{ backgroundColor: "white", height: "40px", }}
          onChange={handleChange}
        >
            <MenuItem key={input} value={input}>
               {input}
            </MenuItem>
        </Select>
      </FormControl>
    </div>
    </>
  );
};

export default Results;
