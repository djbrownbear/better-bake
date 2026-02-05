import React from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFolder } from "@fortawesome/free-regular-svg-icons";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigate('/login');
  } 

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-amber-50 to-white">
      {/* Hero Section */}
      <section id="one" aria-labelledby="hero-heading" className="relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="text-center md:text-left order-2 md:order-1">
                <div className="inline-block mb-4 px-4 py-2 bg-white rounded-full shadow-sm">
                  <span className="text-sm font-semibold text-amber-700">🍰 Baking Competition Voting</span>
                </div>
                
                <h1 id="hero-heading" className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Settle who had the <span className="text-amber-700 relative inline-block">
                    better bake
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10C43.5 3.5 156.5 -2 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                  </span>.
                </h1>
                
                <p className="text-xl md:text-2xl mb-4 text-gray-700 leading-relaxed">
                  Join the community to decide the best bakes from{' '}
                  <a 
                    href="https://thegreatbritishbakeoff.co.uk/" 
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-700 hover:text-amber-800 font-semibold underline decoration-2 underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
                  >
                    The Great British Bake Off
                  </a>
                  .
                </p>
                
                <p className="text-lg md:text-xl text-gray-600 mb-8 font-medium">
                  On your marks, get set, vote! 🎯
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button 
                    className="group relative bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-offset-2 overflow-hidden" 
                    type="button" 
                    onClick={handleClick}
                    aria-label="Try the demo"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Try Demo
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                  
                  <a
                    href="#two"
                    className="inline-flex items-center justify-center gap-2 bg-white text-amber-700 font-bold py-4 px-8 rounded-xl shadow hover:shadow-lg border-2 border-amber-700 hover:bg-amber-50 transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-offset-2 no-underline"
                  >
                    Learn More
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>

                {/* Stats/Trust Indicators */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-6 text-center md:text-left">
                    <div>
                      <div className="text-3xl font-bold text-amber-700">100+</div>
                      <div className="text-sm text-gray-600">Polls Created</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-amber-700">500+</div>
                      <div className="text-sm text-gray-600">Votes Cast</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-amber-700">50+</div>
                      <div className="text-sm text-gray-600">Bakers Featured</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Images */}
              <div className="order-1 md:order-2 relative" aria-hidden="true">
                <div className="relative w-full max-w-lg mx-auto h-96 md:h-[500px]">
                  {/* Decorative circles */}
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="w-80 h-80 rounded-full bg-gradient-to-br from-secondary/40 to-amber-300/40 blur-2xl animate-pulse"></div>
                  </div>
                  
                  {/* Main cake images */}
                  <div className="relative z-10">
                    <div className="absolute right-0 top-12 w-56 h-56 md:w-72 md:h-72 transform hover:scale-105 transition-transform duration-300">
                      <img                 
                        src="https://images.squarespace-cdn.com/content/v1/53db930be4b04ee7c4020290/1559899792825-I5EQCC3M1FMCW8ILW7R6/Benjamina%27s-Floral-Tea-Cake-Series-7.jpg?format=600w"
                        alt=""
                        className="w-full h-full object-cover rounded-3xl shadow-2xl ring-4 ring-white"
                      />
                      <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                        <span className="text-2xl">🌸</span>
                      </div>
                    </div>
                    
                    <div className="absolute left-0 top-32 w-56 h-56 md:w-72 md:h-72 transform hover:scale-105 transition-transform duration-300">
                      <img 
                        src="https://images.squarespace-cdn.com/content/v1/53db930be4b04ee7c4020290/1559899883718-Z3LHPYK96M5GZH882LS8/Kim-Joy-Lavender-%26-Lemon-Fox-Cake.jpg?format=600w"
                        alt=""
                        className="w-full h-full object-cover rounded-3xl shadow-2xl ring-4 ring-white"
                      />
                      <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg">
                        <span className="text-2xl">🦊</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute bottom-8 right-12 z-20 bg-white rounded-2xl shadow-xl p-4 border-2 border-amber-200 animate-bounce">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-xl">🏆</span>
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-gray-600">Vote Now</div>
                        <div className="text-sm font-bold text-gray-900">Join the Fun!</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="two" aria-labelledby="vote-heading" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
                  🗳️ Democratic Voting
                </div>
                <h2 id="vote-heading" className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Vote on Amazing <span className="text-amber-700">Bakes</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Cast your vote on the best bakes from user-created polls. Your opinion matters in deciding who baked it better!
                </p>
                
                {/* Feature list */}
                <ul className="space-y-4 mt-8">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-lg font-semibold text-gray-900">Browse answered & unanswered polls</span>
                      <p className="text-gray-600 text-sm mt-1">Easy filtering to find polls you haven't voted on yet</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-lg font-semibold text-gray-900">See real-time results</span>
                      <p className="text-gray-600 text-sm mt-1">Watch the vote counts update as you participate</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-lg font-semibold text-gray-900">Track your voting history</span>
                      <p className="text-gray-600 text-sm mt-1">Keep a record of all the polls you've participated in</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Screenshot */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 to-amber-400/30 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-2 border border-gray-200">
                  <img 
                    src="https://i.imgur.com/wXxGfuV.png" 
                    alt="Screenshot showing poll voting interface" 
                    className="w-full rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="three" aria-labelledby="leaderboard-heading" className="py-20 bg-gradient-to-br from-secondary via-amber-100 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/40 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Screenshot first on desktop */}
              <div className="relative order-2 md:order-1">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-amber-600/30 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-2 border border-gray-200">
                  <img 
                    src="https://i.imgur.com/Ftq4FdE.png" 
                    alt="Screenshot showing leaderboard table" 
                    className="w-full rounded-xl" 
                  />
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border-2 border-amber-300">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🏆</div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">Top Ranked</div>
                      <div className="text-xs text-gray-600">User Rankings</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 order-1 md:order-2">
                <div className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
                  📊 Rankings
                </div>
                <h2 id="leaderboard-heading" className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Climb the <span className="text-amber-700">Leaderboard</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  View user rankings based on polls answered and created. Compete with friends to reach the top!
                </p>
                
                {/* Stats cards */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <div className="text-3xl font-bold text-amber-700">📝</div>
                    <div className="mt-2 text-sm text-gray-600">Polls Created</div>
                    <div className="mt-1 text-2xl font-bold text-gray-900">Tracked</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <div className="text-3xl font-bold text-amber-700">✅</div>
                    <div className="mt-2 text-sm text-gray-600">Polls Answered</div>
                    <div className="mt-1 text-2xl font-bold text-gray-900">Counted</div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <p className="text-gray-600">
                    <strong className="text-gray-900">Score = </strong> 
                    Polls Created + Polls Answered
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="four" aria-labelledby="create-heading" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
                  ✨ Create Content
                </div>
                <h2 id="create-heading" className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Create Your Own <span className="text-amber-700">Polls</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Missing the matchup you've been waiting for? Create the poll now and let others vote on your favorite baker showdowns!
                </p>
                
                {/* Feature highlights */}
                <div className="space-y-4 mt-8">
                  <div className="flex items-start gap-4 bg-amber-50 rounded-xl p-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🎨</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Easy Poll Builder</h3>
                      <p className="text-gray-600 text-sm mt-1">Simple form to create engaging "Who Baked It Better" polls</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 bg-amber-50 rounded-xl p-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🧁</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Baker Matchups</h3>
                      <p className="text-gray-600 text-sm mt-1">Choose from Great British Bake Off contestants</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 bg-amber-50 rounded-xl p-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center">
                      <span className="text-xl">📢</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Instant Sharing</h3>
                      <p className="text-gray-600 text-sm mt-1">Your poll goes live immediately for the community to vote</p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleClick}
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-amber-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:bg-amber-800 transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Start Creating
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Screenshot */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 to-amber-400/30 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-2 border border-gray-200">
                  <img 
                    src="https://i.imgur.com/efqscCF.png" 
                    alt="Screenshot showing poll creation form" 
                    className="w-full rounded-xl" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer role="contentinfo" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              {/* Brand section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🥐</span>
                  <h3 className="text-2xl font-bold">Better Bake</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Vote on the best bakes from the Great British Bake Off. Create polls, cast votes, and climb the leaderboard!
                </p>
              </div>
              
              {/* Photo Credits */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-amber-300">Photo Credits</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Netflix
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <a 
                      href="http://www.tomhovey.co.uk/" 
                      title="Tom Hovey" 
                      className="text-amber-400 hover:text-amber-300 underline decoration-amber-400/50 hover:decoration-amber-300 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
                    >
                      Tom Hovey
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Social */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-amber-300">Connect</h3>
                <ul className="flex gap-4">
                  <li>
                    <a 
                      href="https://github.com/djbrownbear" 
                      target="_blank" 
                      rel="noreferrer" 
                      title="GitHub" 
                      className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-amber-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900" 
                      aria-label="Visit GitHub profile"
                    >
                      <FontAwesomeIcon icon={faGithub} size="lg" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.linkedin.com/in/aarontimothybrown/" 
                      target="_blank" 
                      rel="noreferrer" 
                      title="LinkedIn" 
                      className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-amber-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900" 
                      aria-label="Visit LinkedIn profile"
                    >
                      <FontAwesomeIcon icon={faLinkedin} size="lg"/>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://aaron.aaronandanita.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      title="Portfolio" 
                      className="flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-amber-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900" 
                      aria-label="Visit portfolio website"
                    >
                      <FontAwesomeIcon icon={faFolder} size="lg" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Bottom bar */}
            <div className="pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Better Bake. Built with ❤️ for baking enthusiasts.</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};  

export default LandingPage;