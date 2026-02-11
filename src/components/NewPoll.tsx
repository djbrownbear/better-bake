import { useState, useEffect } from "react";
import React from 'react';
import { handleAddPoll } from "../actions/polls";
import { useNavigate } from "react-router-dom";
import PollHeader from "./PollHeader";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectNewPollData } from "../selectors/polls";

const NewPoll: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name, avatar, allBakers } = useAppSelector(selectNewPollData);
  
  // Form state
  const [optionOneText, setOptionOneText] = useState(""); 
  const [optionOneBaker, setOptionOneBaker] = useState("");
  const [optionOneSeason, setOptionOneSeason] = useState("");
  const [optionOneEpisode, setOptionOneEpisode] = useState("");
  
  const [optionTwoText, setOptionTwoText] = useState(""); 
  const [optionTwoBaker, setOptionTwoBaker] = useState("");
  const [optionTwoSeason, setOptionTwoSeason] = useState("");
  const [optionTwoEpisode, setOptionTwoEpisode] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize default baker and season values
  useEffect(() => {
    if (allBakers.length > 0) {
      setOptionOneBaker(allBakers[0].id);
      setOptionTwoBaker(allBakers[Math.min(1, allBakers.length - 1)].id);
      setOptionOneSeason("1");
      setOptionOneEpisode("1");
      setOptionTwoSeason("1");
      setOptionTwoEpisode("1");
    }
  }, [allBakers]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await dispatch(handleAddPoll({ 
        optionOneText, 
        optionOneBaker,
        optionOneSeason,
        optionOneEpisode,
        optionTwoText, 
        optionTwoBaker,
        optionTwoSeason,
        optionTwoEpisode,
      }));
      
      // Reset form
      setOptionOneText("");
      setOptionTwoText("");
      setShowSuccess(true);

      // Navigate after showing success message
      setTimeout(() => {
        setShowSuccess(false);
        setIsSubmitting(false);
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error creating poll:', error);
    }
  };

  const isFormValid = optionOneText.trim() !== "" && 
                      optionTwoText.trim() !== "" && 
                      optionOneBaker !== "" && 
                      optionTwoBaker !== "" &&
                      optionOneSeason.trim() !== "" &&
                      optionOneEpisode.trim() !== "" &&
                      optionTwoSeason.trim() !== "" &&
                      optionTwoEpisode.trim() !== "";

  return (
    <div className="min-h-screen bg-linear-to-b from-primary-50 via-white to-gray-50">
      {/* Page Header */}
      <div className="bg-linear-to-r from-primary-600 via-primary-500 to-primary-600 py-12 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 mask-[linear-gradient(0deg,transparent,black)]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-300/30 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-3">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-2">
              ✨ Create Content
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              Create New Poll
            </h1>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">
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
            className="bg-linear-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl shadow-2xl max-w-md"
          >
            <div className="flex items-center gap-3">
              <div className="shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
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
            <p className="text-gray-600">Create two options for users to vote on</p>
          </div>
        
          {/* Poll Options Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Option One Card */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
                <div className="bg-linear-to-br from-primary-100 to-primary-50 p-6 border-b border-primary-200">
                  <h3 className="flex items-center justify-center gap-2 text-xl font-bold text-gray-900">
                    <span className="text-2xl">🥇</span>
                    Option One
                  </h3>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Description */}
                  <div>
                    <label htmlFor="optionOneText" className="block text-sm font-semibold text-gray-700 mb-2">
                      Bake Description *
                    </label>
                    <input
                      type="text"
                      id="optionOneText"
                      value={optionOneText}
                      onChange={(e) => setOptionOneText(e.target.value)}
                      placeholder="e.g., Chocolate Cake with Raspberry Filling"
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  {/* Baker Selection */}
                  <div>
                    <label htmlFor="optionOneBaker" className="block text-sm font-semibold text-gray-700 mb-2">
                      Baker *
                    </label>
                    <select
                      id="optionOneBaker"
                      value={optionOneBaker}
                      onChange={(e) => setOptionOneBaker(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      disabled={isSubmitting}
                      required
                    >
                      <option value="">Select a baker</option>
                      {allBakers.map((baker) => (
                        <option key={baker.id} value={baker.id}>
                          {baker.name} (Series {baker.series})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Season & Episode */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="optionOneSeason" className="block text-sm font-semibold text-gray-700 mb-2">
                        Season
                      </label>
                      <input
                        type="text"
                        id="optionOneSeason"
                        value={optionOneSeason}
                        onChange={(e) => setOptionOneSeason(e.target.value)}
                        placeholder="1"
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="optionOneEpisode" className="block text-sm font-semibold text-gray-700 mb-2">
                        Episode
                      </label>
                      <input
                        type="text"
                        id="optionOneEpisode"
                        value={optionOneEpisode}
                        onChange={(e) => setOptionOneEpisode(e.target.value)}
                        placeholder="1"
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Option Two Card */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
                <div className="bg-linear-to-br from-primary-100 to-primary-50 p-6 border-b border-primary-200">
                  <h3 className="flex items-center justify-center gap-2 text-xl font-bold text-gray-900">
                    <span className="text-2xl">🥈</span>
                    Option Two
                  </h3>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Description */}
                  <div>
                    <label htmlFor="optionTwoText" className="block text-sm font-semibold text-gray-700 mb-2">
                      Bake Description *
                    </label>
                    <input
                      type="text"
                      id="optionTwoText"
                      value={optionTwoText}
                      onChange={(e) => setOptionTwoText(e.target.value)}
                      placeholder="e.g., Victoria Sponge with Buttercream"
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  {/* Baker Selection */}
                  <div>
                    <label htmlFor="optionTwoBaker" className="block text-sm font-semibold text-gray-700 mb-2">
                      Baker *
                    </label>
                    <select
                      id="optionTwoBaker"
                      value={optionTwoBaker}
                      onChange={(e) => setOptionTwoBaker(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      disabled={isSubmitting}
                      required
                    >
                      <option value="">Select a baker</option>
                      {allBakers.map((baker) => (
                        <option key={baker.id} value={baker.id}>
                          {baker.name} (Series {baker.series})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Season & Episode */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="optionTwoSeason" className="block text-sm font-semibold text-gray-700 mb-2">
                        Season
                      </label>
                      <input
                        type="text"
                        id="optionTwoSeason"
                        value={optionTwoSeason}
                        onChange={(e) => setOptionTwoSeason(e.target.value)}
                        placeholder="1"
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="optionTwoEpisode" className="block text-sm font-semibold text-gray-700 mb-2">
                        Episode
                      </label>
                      <input
                        type="text"
                        id="optionTwoEpisode"
                        value={optionTwoEpisode}
                        onChange={(e) => setOptionTwoEpisode(e.target.value)}
                        placeholder="1"
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Submit Button Section */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <button 
              className="relative group w-full max-w-md py-4 px-8 border-none bg-linear-to-r from-primary-600 via-primary-500 to-primary-600 hover:from-primary hover:via-primary-600 hover:to-primary disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-offset-2 active:scale-95 disabled:active:scale-100 overflow-hidden" 
              type="submit" 
              disabled={!isFormValid || isSubmitting}
              aria-label="Create poll"
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary to-primary-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
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