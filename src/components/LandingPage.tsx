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
    <div className="min-h-screen">
      <section id="one">
        <div className="container mx-auto px-4 py-16 bg-primary">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md h-64 mb-8">
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-64 h-64 rounded-full bg-secondary/30"></div>
              </div>
              <img                 
                src="https://images.squarespace-cdn.com/content/v1/53db930be4b04ee7c4020290/1559899792825-I5EQCC3M1FMCW8ILW7R6/Benjamina%27s-Floral-Tea-Cake-Series-7.jpg?format=600w"
                alt="Benjamina's Floral Tea Cake"  
                className="absolute right-0 top-8 w-48 h-48 object-cover rounded-full shadow-lg z-10"
              />
              <img 
                src="https://images.squarespace-cdn.com/content/v1/53db930be4b04ee7c4020290/1559899883718-Z3LHPYK96M5GZH882LS8/Kim-Joy-Lavender-%26-Lemon-Fox-Cake.jpg?format=600w"
                alt="Kim-Joy's Lavender and Lemon Fox Cake"
                className="absolute left-0 top-16 w-48 h-48 object-cover rounded-full shadow-lg"
              />
            </div>
            <div className="text-center mt-8">
              <h1 className="text-5xl font-bold mb-6">Settle who had the <span className="text-amber-700">better bake</span>.</h1>
              <p className="text-xl mb-4">
                Together, we can decide the better bake between contestants from <br/><a href="https://thegreatbritishbakeoff.co.uk/" title="The Great British Bake Off site" className="text-amber-700 hover:text-amber-800 underline">
                <span>The Great British Bake Off</span>.
                </a>
              </p>
              <p className="text-xl mb-8">On your marks, get set, vote!</p>
              <div className="flex justify-center">
                <button className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors" type="button" onClick={handleClick}>Demo</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="two">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-start max-w-6xl mx-auto gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">Vote</h1>
              <p className="text-lg">Cast your vote on the best bakes from user-created polls, including your own polls.</p>
            </div>
            <div className="flex-1">
              <img src="https://i.imgur.com/wXxGfuV.png" alt="vote for best bake" className="w-full rounded-lg shadow-lg"/>
            </div>
          </div>
        </div>
      </section>

      <section id="three">
        <div className="container mx-auto px-4 py-16 bg-secondary">
          <div className="flex flex-col md:flex-row items-start max-w-6xl mx-auto gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
              <p className="text-lg">View user rankings by the number of polls answered and created.</p>
            </div>
            <div className="flex-1">
              <img src="https://i.imgur.com/Ftq4FdE.png" alt="vote for best bake" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>
      
      <section id="four">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-start max-w-6xl mx-auto gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">Create New Polls</h1>
              <p className="text-lg">Missing the match up you have been waiting for? Well, wait no longer. Create the poll now for others to vote.</p>
            </div>
            <div className="flex-1">
              <img src="https://i.imgur.com/efqscCF.png" alt="vote for best bake" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container mx-auto px-4 py-12 bg-primary">
          <div className="flex flex-col md:flex-row justify-around items-start max-w-4xl mx-auto">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">Photo Credits</h3>
              <ul className="space-y-2">
                <li>Netflix</li>
                <li><a href="http://www.tomhovey.co.uk/" title="Tom Hovey" className="text-amber-700 hover:text-amber-800 underline"><span>Tom Hovey</span></a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Social</h3>
              <ul className="flex gap-6">
                <li>
                  <a href="https://github.com/djbrownbear" target="_blank" rel="noreferrer" title="link to github" className="text-gray-700 hover:text-gray-900">
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/aarontimothybrown/" target="_blank" rel="noreferrer" title="link to linkedin" className="text-gray-700 hover:text-gray-900">
                    <FontAwesomeIcon icon={faLinkedin} size="lg"/>
                  </a>
                </li>
                <li>
                  <a href="https://aaron.aaronandanita.com" target="_blank" rel="noreferrer" title="link to portfolio" className="text-gray-700 hover:text-gray-900">
                    <FontAwesomeIcon icon={faFolder} size="lg" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};  

export default LandingPage;