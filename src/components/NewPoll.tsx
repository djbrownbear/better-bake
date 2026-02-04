import { connect, ConnectedProps } from "react-redux";
import { useState, useEffect } from "react";
import React from 'react';
import { handleAddPoll } from "../actions/polls";
import { useNavigate } from "react-router-dom";
import PollHeader from "./PollHeader";
import { RootState } from "../reducers";

interface BakeOption {
  text: string;
  bakeURL: string;
}

const mapStateToProps = ({ authedUser, users, bakers }: RootState) => {
  const user = users[authedUser || ''];
  const name = user?.name || '';
  const avatar = user?.avatarURL || '';

  // modified based on function from the following source:
  // https://stackoverflow.com/questions/54857222/find-all-values-by-specific-key-in-a-deep-nested-object
  function findAllByProp(obj: any, keyToFind: string): BakeOption[] {
    return Object.entries(obj)
      .reduce((acc: BakeOption[], [key, value]) => (key === keyToFind)
        ? acc.concat(obj as BakeOption)
        : (typeof value === 'object' && value !== null)
        ? acc.concat(findAllByProp(value, keyToFind))
        : acc
      , [])
  }

  const allOptions = findAllByProp(bakers,'bakeURL');

  return{
    authedUser,
    name,
    avatar,
    allOptions,
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const NewPoll: React.FC<PropsFromRedux> = ({ dispatch, authedUser, avatar, name, allOptions }) => {
  const navigate = useNavigate();
  const [optionOneNew, setOptionOneNew] = useState(""); 
  const [optionTwoNew, setOptionTwoNew] = useState(""); 
  const [optionOneImage, setOptionOneImage] = useState("");
  const [optionTwoImage, setOptionTwoImage] = useState("");

  useEffect(() => {
    if (allOptions.length >= 2) {
      setOptionOneNew(allOptions[0].text);
      setOptionTwoNew(allOptions[1].text);
      setOptionOneImage(allOptions[0].bakeURL);
      setOptionTwoImage(allOptions[1].bakeURL);
      const el = document.querySelector('#optionTwoNew') as HTMLSelectElement;
      if (el) el.value = allOptions[1].text;
    }
  }, [allOptions]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let idx = e.target.options.selectedIndex;
    let imgURL = e.target.options[idx].dataset.imgurl || '';

    if (e.target.id === "optionOneNew") {
      const optionOneNew = e.target.value;
      setOptionOneNew(optionOneNew);
      setOptionOneImage(imgURL);
    } else if (e.target.id === "optionTwoNew") {
      const optionTwoNew = e.target.value;
      setOptionTwoNew(optionTwoNew);
      setOptionTwoImage(imgURL);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(handleAddPoll(optionOneNew, optionTwoNew, optionOneImage, optionTwoImage) as any);
    setOptionOneNew("");
    setOptionTwoNew("");
    setOptionOneImage("");
    setOptionTwoImage("");

    if (!authedUser) {
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <div className="title">
        <h1>New Poll</h1>
      </div>
      <div className="page-wrapper inner">
        <form name="new-poll" className="poll-info wrapper" onSubmit={handleSubmit}>
          <PollHeader 
            avatar={avatar}
            name={name}
            timestamp={new Date()}
          />
        
          <div className="poll-info">
            <div>
              <label htmlFor="optionOneNew" className="center-h">Option One</label>
              <div className="poll-info">
                <div className="poll-option create-poll">
                  <div className="poll-option-wrapper-inner">
                    <img className="poll-option-img" src={ optionOneImage } alt={`${optionOneNew}`} />
                  </div>
                </div>
              </div>
              <select name="optionOneNew" id="optionOneNew" className="new-poll-option" onChange={handleChange}>
                {allOptions && 
                  allOptions.map((curOption, idx) => (<option key={idx} data-imgurl={curOption.bakeURL} value={curOption.text}>{curOption.text}</option>))
                }
              </select>
            </div>

            <div>
              <label htmlFor="optionTwoNew" className="center-h">Option Two</label>
              <div className="poll-info">
                <div className="poll-option create-poll">
                  <div className="poll-option-wrapper-inner">
                    <img className="poll-option-img" src={ optionTwoImage } alt={`${optionTwoNew}`} />
                  </div>
                </div>
              </div>
              <select name="optionTwoNew" id="optionTwoNew" className="new-poll-option" onChange={handleChange}>
                {allOptions && 
                  allOptions.map((curOption, idx) => (<option key={idx} data-imgurl={curOption.bakeURL} value={curOption.text}>{curOption.text}</option>))
                }
              </select>
            </div>
          </div>
          <button className="btn btn-submit" type="submit" disabled={(optionOneNew === "" || optionTwoNew === "")}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default connector(NewPoll);