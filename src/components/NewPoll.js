import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { handleAddPoll } from "../actions/polls";
import { useNavigate } from "react-router-dom";
import PollHeader from "./PollHeader";

const NewPoll = ({ dispatch, id, avatar, name, allOptions }) => {
  const navigate = useNavigate();
  const [optionOneNew, setOptionOneNew] = useState(""); 
  const [optionTwoNew, setOptionTwoNew] = useState(""); 
  const [optionOneImage, setOptionOneImage] = useState("");
  const [optionTwoImage, setOptionTwoImage] = useState("");

  useEffect(() => {
    setOptionOneNew(allOptions[0].text);
    setOptionTwoNew(allOptions[1].text);
    setOptionOneImage(allOptions[0].bakeURL);
    setOptionTwoImage(allOptions[1].bakeURL);
    const el = document.querySelector('#optionTwoNew');
    el.value = allOptions[1].text;
  }, []);

  const handleChange = (e) => {
    console.log("choices: ", allOptions[0].bakeURL);
    let idx = e.target.options.selectedIndex;
    let imgURL = e.target.options[idx].dataset.imgurl;

    if (e.target.id === "optionOneNew") {
      const optionOneNew = e.target.value;
      setOptionOneNew(optionOneNew);
      setOptionOneImage(imgURL);
    } else if (e.target.id === "optionTwoNew") {
      const optionTwoNew = e.target.value;
      setOptionTwoNew(optionTwoNew);
      setOptionTwoImage(imgURL);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddPoll(optionOneNew, optionTwoNew, optionOneImage, optionTwoImage));
    setOptionOneNew("");
    setOptionTwoNew("");
    setOptionOneImage("");
    setOptionTwoImage("");

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
          <div className="poll-info">
            <div className="poll-option create-poll">
              <div className="poll-option-wrapper-inner">
                <img className="poll-option-img" src={ optionOneImage } alt={`${optionOneNew}`} />
              </div>
            </div>
          </div>
          <select name="optionOneNew" id="optionOneNew" className="new-poll-option" onChange={handleChange}>
            {allOptions && 
              allOptions.map((curOption) => (<option data-imgurl={curOption.bakeURL} value={curOption.text}>{curOption.text}</option>))
            }
          </select>
        </div>
        
        <div>
          <label htmlFor="optionTwoNew">Option Two</label>
          <div className="poll-info">
            <div className="poll-option create-poll">
              <div className="poll-option-wrapper-inner">
                <img className="poll-option-img" src={ optionTwoImage } alt={`${optionTwoNew}`} />
              </div>
            </div>
          </div>
          <select name="optionTwoNew" id="optionTwoNew" className="new-poll-option" onChange={handleChange}>
            {allOptions && 
              allOptions.map((curOption) => (<option data-imgurl={curOption.bakeURL} value={curOption.text}>{curOption.text}</option>))
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

  // modified based on function from the following source:
  // https://stackoverflow.com/questions/54857222/find-all-values-by-specific-key-in-a-deep-nested-object
  function findAllByProp(obj, keyToFind) {
    return Object.entries(obj)
      .reduce((acc, [key, value]) => (key === keyToFind)
        ? acc.concat(obj)
        : (typeof value === 'object')
        ? acc.concat(findAllByProp(value, keyToFind))
        : acc
      , [])
  }

  const allOptions = findAllByProp(bakers,'bakeURL');

  return{
    dispatch,
    authedUser,
    name,
    avatar,
    allOptions,
  };
}

export default connect(mapStateToProps)(NewPoll);