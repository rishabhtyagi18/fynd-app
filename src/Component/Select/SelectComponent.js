import React, { useState, useEffect } from 'react';
import './SelectComponent.css';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import DropDown from '../DropDown/DropDown';
import Result from '../Results/Results';
  
const SelectComponent = (props) => {
  const Colors = ['red', 'yellow', 'green', 'blue'];
  const components = [
    { 'title' : 'Button', 'path': 'demo-button' },
    { 'title' : 'Selection Control', 'path': 'demo-selection-control' },
    { 'title' : 'Input', 'path': 'demo-input' },
    { 'title' : 'Snackbar', 'path': 'demo-snack-bar' },
    { 'title' : 'Chips', 'path': 'demo-chips' },
    { 'title' : 'Progress Tabs', 'path': 'demo-vertical-tabs' },
    { 'title' : 'Typography', 'path': 'demo-wip' },
    { 'title' : 'Card', 'path': 'demo-wip' },
    { 'title' : 'Pagination', 'path': 'demo-wip' },
    { 'title' : 'Progress Tabs', 'path': 'demo-wip' }
  ];

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [type, setType] = useState("Colours");

  const handleChange = (e) => {
    setType(e.target.value);
    setSelected([]);
  };

  useEffect(() => {
    if (type === "Colours") {
      let object1 = Colors
      .reduce((elm, val) => {
        let obj = {};
        obj.value = val;
        obj.label = val;
        elm = [...elm, obj];
        return elm;
      }, []);
      setData(object1);
    } else {
      let object2 = components.reduce((elm, val) => {
        let obj = {};
        obj.value = val.path;
        obj.label = val.title;
        elm = [...elm, obj];
        return elm;
      }, []);
    //   console.log(object1);
      setData(object2);
    };
  }, [type]);

  return (
    <>
    <div className="main_container">
      <div>
        <h3 style={{textAlign: "initial"}}>Dropdown with search</h3>
        <div style={{textAlign: "initial"}}>
            <h5 className="default">Default</h5>
            <FormControl variant="outlined" className="form_control">
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={type}
                    style={{ backgroundColor: "white", height: "40px" }}
                    onChange={handleChange}
                >
                    <MenuItem value={"Colours"}>Colours</MenuItem>
                    <MenuItem value={"Components"}>Components</MenuItem>
                </Select>
            </FormControl>
        </div>
        <div>
          <DropDown
            options={data}
            selected={selected}
            setSelected={setSelected}
            onChangeCallback={(response) => console.log(response)}
            multiselect={false}
            searchable={true}
          />
        </div>
        
        <div>
          <Result type={type} selected={selected} />
        </div>
      </div>
    </div>
    </>
  );
}

export default SelectComponent;
