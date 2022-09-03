import { connect } from "react-redux";

const LandingPage = ({ dispatch }) => {

  return (
    <div>
      <section>
        <div className="container no-gutter center-v color-main">
          <div className="column">
            <h1>Settle who had the better bake.</h1>
            <p>
              Together, we can decide the better bake from contestants on <a href="https://thegreatbritishbakeoff.co.uk/" alt="The Great British Bake Off site">
              The Great British Bake Off.
              </a>
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container no-gutter center-v color-accent">
          <div className="column">
            <h1>More to come...</h1>
            <p>Great, can't wait.</p>
          </div>
        </div>
      </section>

      <section>
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