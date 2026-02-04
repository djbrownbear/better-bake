import { connect } from "react-redux";
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
    <div className="page-wrapper">
      <section id="one">
        <div className="container no-gutter center-v color-main">
          <div className="column content">
            <div className="img-wrapper">
              <img                 
                src="https://images.squarespace-cdn.com/content/v1/53db930be4b04ee7c4020290/1559899792825-I5EQCC3M1FMCW8ILW7R6/Benjamina%27s-Floral-Tea-Cake-Series-7.jpg?format=600w"
                alt="Benjamina's Floral Tea Cake"  
                className="img-right"
              />
              <img 
                src="https://images.squarespace-cdn.com/content/v1/53db930be4b04ee7c4020290/1559899883718-Z3LHPYK96M5GZH882LS8/Kim-Joy-Lavender-%26-Lemon-Fox-Cake.jpg?format=600w"
                alt="Kim-Joy's Lavender and Lemon Fox Cake"
                className="img-left"
              />
              <div className="circle"></div>
            </div>
            <div className="textBlock">
              <h1>Settle who had the <span>better bake</span>.</h1>
              <p>
                Together, we can decide the better bake between contestants from <br/><a href="https://thegreatbritishbakeoff.co.uk/" title="The Great British Bake Off site">
                <span>The Great British Bake Off</span>.
                </a>
              </p>
              <p>On your marks, get set, vote!</p>
              <div className="center-h">
                <button className="btn" type="button" onClick={handleClick}>Demo</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="two">
        <div className="container no-gutter">
          <div className="column f-start mw">
            <div className="textBlock">
              <h1>Vote</h1>
              <p>Cast your vote on the best bakes from user-created polls, including your own polls.</p>
            </div>
            <div className="img-wrapper col-2">
              <img src="https://i.imgur.com/wXxGfuV.png" alt="vote for best bake" className="img-screenshot"/>
            </div>
          </div>
        </div>
      </section>

      <section id="three">
        <div className="container no-gutter color-accent">
          <div className="column f-start mw">
            <div className="textBlock">
              <h1>Leaderboard</h1>
              <p>View user rankings by the number of polls answered and created.</p>
            </div>
            <div className="img-wrapper col-2">
              <img src="https://i.imgur.com/Ftq4FdE.png" alt="vote for best bake" className="img-screenshot" />
            </div>
          </div>
        </div>
      </section>
      
      <section id="four">
        <div className="container no-gutter">
          <div className="column f-start mw">
            <div className="textBlock">
              <h1>Create New Polls</h1>
              <p>Missing the match up you have been waiting for? Well, wait no longer. Create the poll now for others to vote.</p>
            </div>
            <div className="img-wrapper col-2">
              <img src="https://i.imgur.com/efqscCF.png" alt="vote for best bake" className="img-screenshot" />
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container no-gutter">
          <div className="textBlock color-main">
            <h3>Photo Credits</h3>
            <ul>
              <li>Netflix</li>
              <li><a href="http://www.tomhovey.co.uk/" title="Tom Hovey"><span>Tom Hovey</span></a></li>
            </ul>
          </div>
          <div className="textBlock color-main">
            <h3>Social</h3>
            <ul className="menu-social">
              <li>
                <a href="https://github.com/djbrownbear" target="_blank" rel="noreferrer" title="link to github">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/aarontimothybrown/" target="_blank" rel="noreferrer" title="link to linkedin">
                  <FontAwesomeIcon icon={faLinkedin} size="lg"/>
                </a>
              </li>
              <li>
                <a href="https://aaron.aaronandanita.com" target="_blank" rel="noreferrer" title="link to portfolio">
                  <FontAwesomeIcon icon={faFolder} size="lg" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

    </div>
  );
};  

const mapStateToProps = () => {
  return{};
}

export default connect(mapStateToProps)(LandingPage);