import { connect } from "react-redux";

const LandingPage = ({ dispatch }) => {

  return (
    <div>
      <section id="one">
        <div className="container no-gutter center-v color-main">
          <div className="column">
            <h1>Settle who had the better bake.</h1>
            <p>
              Together, we can decide the better bake from contestants on <a href="https://thegreatbritishbakeoff.co.uk/" alt="The Great British Bake Off site">
              The Great British Bake Off.
              </a>
            </p>
            {/* <div className="avatar-wrapper center-h row">
              <img 
                src="https://images.squarespace-cdn.com/content/v1/53db930be4b04ee7c4020290/1559899792825-I5EQCC3M1FMCW8ILW7R6/Benjamina%27s-Floral-Tea-Cake-Series-7.jpg?format=400w"
                alt="Benjamina's Floral Tea Cake" 
              />
              <img 
                src="https://images.squarespace-cdn.com/content/v1/53db930be4b04ee7c4020290/1559899883718-Z3LHPYK96M5GZH882LS8/Kim-Joy-Lavender-%26-Lemon-Fox-Cake.jpg?format=400w"
                alt="Kim-Joy's Lavender and Lemon Fox Cake"
              />
            </div> */}
          </div>
        </div>
      </section>

      <section id="two">
        <div className="container no-gutter center-v color-accent">
          <div className="column">
            <h1>More to come...</h1>
            <p>Great, can't wait.</p>
          </div>
        </div>
      </section>

      <section id="three">
        <div className="container no-gutter center-v color-main">
          <div className="column">
            <h1>Thank You For Visiting.</h1>
          </div>
        </div>
      </section>
    </div>
  );
};  

const mapStateToProps = () => {
  return{};
}

export default connect(mapStateToProps)(LandingPage);