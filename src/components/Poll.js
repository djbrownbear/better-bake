import { connect } from "react-redux";

const Poll = (props) => {
  return (
    <div>
      <h3>Poll</h3>
      <h2>Would you rather...</h2>
    </div>
  )
};

const mapStateToProps = ({ authedUser, users, polls }, {id}) => {
  const poll = polls[id];

  return {
    authedUser,
    poll, 
  }

}

export default connect(mapStateToProps)(Poll);