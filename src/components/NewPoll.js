import { connect } from "react-redux";
import { useState } from "react";
import { handleAddPoll } from "../actions/polls";
import { useNavigate } from "react-router-dom";
import PollHeader from "./PollHeader";

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
    <div className="page-wrapper inner">
      <form name="new-poll" onSubmit={handleSubmit}>
        <h1>New Poll</h1>
        <PollHeader 
          avatar={avatar}
          name={name}
          timestamp={new Date()}
        />
      
        <div className="new-poll-option">
          <label htmlFor="optionOneNew">Option One</label>
          <input type="text" id="optionOneNew" name="optionOneNew" placeholder="Enter Option 1" onChange={handleChange}></input>
        </div>

        <div className="new-poll-option">
          <label htmlFor="optionTwoNew">Option Two</label>
          <input type="text" id="optionTwoNew" name="optionTwoNew" placeholder="Enter Option 2" onChange={handleChange}></input>
        </div>

        <button className="btn btn-submit" type="submit" disabled={(optionOneNew === "" || optionTwoNew === "")}>
          Submit
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = ({ dispatch, authedUser, users }) => {
  const user = users[authedUser];
  const name = user.name;
  const avatar = user.avatarURL;

  return{
    dispatch,
    authedUser,
    name,
    avatar,
  };
}

export default connect(mapStateToProps)(NewPoll);