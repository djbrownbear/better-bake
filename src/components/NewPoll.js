import { connect } from "react-redux";
import { useState } from "react";
import { handleAddPoll } from "../actions/polls";
import { useNavigate } from "react-router-dom";
import PollHeader from "./PollHeader";

const NewPoll = ({ dispatch, id, avatar, name, allOptions }) => {
  const navigate = useNavigate();
  const [optionOneNew, setOptionOneNew] = useState(""); 
  const [optionTwoNew, setOptionTwoNew] = useState(""); 

  const handleChange = (e) => {
    // console.log(e.target.value);
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
      
        <div>
          <label htmlFor="optionOneNew">Option One</label>
          <select name="optionOneNew" id="optionOneNew" className="new-poll-option" onChange={handleChange}>
            {allOptions && 
              allOptions.map((curOption) => (<option value={curOption}>{curOption}</option>))
            }
          </select>
        </div>
        
        <div>
          <label htmlFor="optionTwoNew">Option Two</label>
          <select name="optionTwoNew" id="optionTwoNew" className="new-poll-option" onChange={handleChange}>
            {allOptions && 
              allOptions.map((curOption) => (<option value={curOption}>{curOption}</option>))
            }
          </select>
        </div>

        <button className="btn btn-submit" type="submit" disabled={(optionOneNew === "" || optionTwoNew === "")}>
          Submit
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = ({ dispatch, authedUser, users, bakers }) => {
  const user = users[authedUser];
  const name = user.name;
  const avatar = user.avatarURL;

  // https://stackoverflow.com/questions/54857222/find-all-values-by-specific-key-in-a-deep-nested-object
  function findAllByKey(obj, keyToFind) {
    return Object.entries(obj)
      .reduce((acc, [key, value]) => (key === keyToFind)
        ? acc.concat(value)
        : (typeof value === 'object')
        ? acc.concat(findAllByKey(value, keyToFind))
        : acc
      , [])
  }

  const allOptions = findAllByKey(bakers,'text');

  return{
    dispatch,
    authedUser,
    name,
    avatar,
    bakers,
    allOptions,
  };
}

export default connect(mapStateToProps)(NewPoll);