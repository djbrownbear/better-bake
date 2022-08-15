import { connect } from "react-redux";
import { useState } from "react";
import { handleAddPoll } from "../actions/polls";

const NewPoll = ({ dispatch }) => {
  const [optionOneNew, setOptionOneNew] = useState(""); 
  const [optionTwoNew, setOptionTwoNew] = useState(""); 

  const handleChange = (e) => {
    console.log(e.target.value)
    if (e.target.id === "optionOneNew") {
      const optionOneNew = e.target.value;
      setOptionOneNew(optionOneNew);
    } else if (e.target.id === "optionTwoNew") {
      const optionTwoNew = e.target.value;
      setOptionTwoNew(optionTwoNew);
    };
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddPoll(optionOneNew, optionTwoNew));
    setOptionOneNew("");
    setOptionTwoNew("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>New Poll</h1>
        <label htmlFor="optionOneNew"></label>
        <input type="text" id="optionOneNew" name="optionOneNew" placeholder="Enter Option 1" onChange={handleChange}></input>
        
        <label htmlFor="optionTwoNew"></label>
        <input type="text" id="optionTwoNew" name="optionTwoNew" placeholder="Enter Option 2" onChange={handleChange}></input>
        
        <button className="btn btn-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default connect()(NewPoll);