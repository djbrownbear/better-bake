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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await dispatch(handleAddPoll({ optionOneText: optionOneNew, optionTwoText: optionTwoNew, optionOneImage, optionTwoImage }));
      setOptionOneNew("");
      setOptionTwoNew("");
      setOptionOneImage("");
      setOptionTwoImage("");
      setShowSuccess(true);

      // Navigate after showing success message
      setTimeout(() => {
        setShowSuccess(false);
        setIsSubmitting(false);
        if (!authedUser) {
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1500);
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error creating poll:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 py-12 shadow-lg relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-700/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-3">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-2">
              ✨ Create Content
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              Create New Poll
            </h1>
            <p className="text-amber-100 text-lg max-w-2xl mx-auto">
              Design your own "Who Baked It Better" matchup and let the community vote!
            </p>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div 
            role="alert" 
            aria-live="polite" 
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl shadow-2xl max-w-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-lg">Poll Created!</p>
                <p className="text-sm text-green-50">Redirecting to dashboard...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12">
        <form name="new-poll" className="max-w-6xl mx-auto" onSubmit={handleSubmit}>
          {/* Author Info */}
          <div className="mb-8">
            <PollHeader 
              avatar={avatar}
              name={name}
              timestamp={Date.now()}
            />
          </div>

          {/* Poll Options Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Baker Matchup</h2>
            <p className="text-gray-600">Select two bakes to pit against each other in an epic showdown</p>
          </div>
        
          {/* Poll Options Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Option One Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-amber-300 transition-all hover:shadow-xl">
              <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-6 border-b border-amber-200">
                <label htmlFor="optionOneNew" className="flex items-center justify-center gap-2 text-xl font-bold text-gray-900">
                  <span className="text-2xl">🥇</span>
                  Option One
                </label>
              </div>
              
              {/* Image Container */}
              <div className="p-6">
                <div className="relative aspect-square mb-6 bg-gray-50 rounded-xl overflow-hidden group">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    src={optionOneImage} 
                    alt={`${optionOneNew}`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                {/* Select Dropdown */}
                <div className="relative">
                  <select 
                    name="optionOneNew" 
                    id="optionOneNew" 
                    className="w-full p-4 pr-10 text-base font-medium border-2 border-gray-300 rounded-xl bg-white focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 appearance-none cursor-pointer hover:border-amber-400 transition-all" 
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-label="Select first poll option"
                  >
                    {allOptions && 
                      allOptions.map((curOption, idx) => (<option key={idx} data-imgurl={curOption.bakeURL} value={curOption.text}>{curOption.text}</option>))
                    }
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Option Two Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-amber-300 transition-all hover:shadow-xl">
              <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-6 border-b border-amber-200">
                <label htmlFor="optionTwoNew" className="flex items-center justify-center gap-2 text-xl font-bold text-gray-900">
                  <span className="text-2xl">🥈</span>
                  Option Two
                </label>
              </div>
              
              {/* Image Container */}
              <div className="p-6">
                <div className="relative aspect-square mb-6 bg-gray-50 rounded-xl overflow-hidden group">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    src={optionTwoImage} 
                    alt={`${optionTwoNew}`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                {/* Select Dropdown */}
                <div className="relative">
                  <select 
                    name="optionTwoNew" 
                    id="optionTwoNew" 
                    className="w-full p-4 pr-10 text-base font-medium border-2 border-gray-300 rounded-xl bg-white focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 appearance-none cursor-pointer hover:border-amber-400 transition-all" 
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-label="Select second poll option"
                  >
                    {allOptions && 
                      allOptions.map((curOption, idx) => (<option key={idx} data-imgurl={curOption.bakeURL} value={curOption.text}>{curOption.text}</option>))
                    }
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button Section */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <button 
              className="relative group w-full max-w-md py-4 px-8 border-none bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:via-amber-600 hover:to-amber-700 disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-offset-2 active:scale-95 disabled:active:scale-100 overflow-hidden" 
              type="submit" 
              disabled={optionOneNew === "" || optionTwoNew === "" || isSubmitting}
              aria-label="Create poll"
            >
              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Poll...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Poll
                  </>
                )}
              </span>
            </button>
            
            <p className="text-sm text-gray-500 text-center">
              Your poll will be visible to all users immediately after creation
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPoll;