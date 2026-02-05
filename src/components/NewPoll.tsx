import { useState, useEffect } from "react";
import React from 'react';
import { handleAddPoll } from "../actions/polls";
import { useNavigate } from "react-router-dom";
import PollHeader from "./PollHeader";
import { useAppSelector, useAppDispatch } from "../store/hooks";

interface BakeOption {
  text: string;
  bakeURL: string;
}

const NewPoll: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authedUser = useAppSelector(state => state.authedUser);
  const { name, avatar, allOptions } = useAppSelector(state => {
    const user = state.users[state.authedUser || ''];
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

    const allOptions = findAllByProp(state.bakers,'bakeURL');

    return { name, avatar, allOptions };
  });
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

    dispatch(handleAddPoll({ optionOneText: optionOneNew, optionTwoText: optionTwoNew, optionOneImage, optionTwoImage }));
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
      <div className="bg-secondary py-8">
        <h1 className="text-4xl font-bold text-center">New Poll</h1>
      </div>
      <div className="max-w-[65em] mx-auto mb-40 px-4 py-8">
        <form name="new-poll" className="flex flex-col justify-center items-center max-w-4xl mx-auto" onSubmit={handleSubmit}>
          <PollHeader 
            avatar={avatar}
            name={name}
            timestamp={Date.now()}
          />
        
          <div className="flex flex-row justify-between w-full gap-8 my-8">
            <div className="flex-1">
              <label htmlFor="optionOneNew" className="block text-xl font-semibold text-center mb-4">Option One</label>
              <div className="flex justify-center mb-4">
                <div className="w-full max-w-md">
                  <div className="flex justify-center">
                    <img className="w-full h-auto max-h-96 object-contain" src={ optionOneImage } alt={`${optionOneNew}`} />
                  </div>
                </div>
              </div>
              <select name="optionOneNew" id="optionOneNew" className="w-full p-3 text-lg border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none" onChange={handleChange}>
                {allOptions && 
                  allOptions.map((curOption, idx) => (<option key={idx} data-imgurl={curOption.bakeURL} value={curOption.text}>{curOption.text}</option>))
                }
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="optionTwoNew" className="block text-xl font-semibold text-center mb-4">Option Two</label>
              <div className="flex justify-center mb-4">
                <div className="w-full max-w-md">
                  <div className="flex justify-center">
                    <img className="w-full h-auto max-h-96 object-contain" src={ optionTwoImage } alt={`${optionTwoNew}`} />
                  </div>
                </div>
              </div>
              <select name="optionTwoNew" id="optionTwoNew" className="w-full p-3 text-lg border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none" onChange={handleChange}>
                {allOptions && 
                  allOptions.map((curOption, idx) => (<option key={idx} data-imgurl={curOption.bakeURL} value={curOption.text}>{curOption.text}</option>))
                }
              </select>
            </div>
          </div>
          <button className="w-64 py-3 px-6 mt-6 border-none bg-secondary hover:bg-amber-200 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-semibold text-lg rounded-lg transition-all cursor-pointer" type="submit" disabled={(optionOneNew === "" || optionTwoNew === "")}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPoll;