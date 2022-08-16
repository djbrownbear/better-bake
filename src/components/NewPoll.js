import { connect } from "react-redux";
import { useState } from "react";
import { handleAddPoll } from "../actions/polls";
import { useNavigate } from "react-router-dom";
import PollHeader from "./PollHeader";
import { formatDate } from "../utils/helpers";

const NewPoll = ({ dispatch, id, avatar, name }) => {
  const navigate = useNavigate();
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddPoll(optionOneNew, optionTwoNew));
    setOptionOneNew("");
    setOptionTwoNew("");

    if (!id) {
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>New Poll</h1>
        <PollHeader 
          avatar={avatar}
          name={name}
          timestamp={new Date()}
        />
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

const mapStateToProps = ({ dispatch, authedUser, users }) => {
  const user = users[authedUser];
  const name = user.name;
  const avatar = user[users.avatarURL];

  return{
    dispatch,
    authedUser,
    name,
    avatar,
  };
}

export default connect(mapStateToProps)(NewPoll);