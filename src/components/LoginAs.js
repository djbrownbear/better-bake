import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate, useLocation } from "react-router-dom";

const LoginAs = ({ dispatch, authedUser,usersList}) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(e.currentTarget.id));
    navigate((state?.path || "/"));
  }

  return (
    <div>
      <div className="title">
        <h1>Switch User</h1>
      </div>
      <div className="page-wrapper inner">
        <div className="userlist">
          {usersList.map((user) => (  
            <button key={user.id} id={user.id} type="button" className="btn btn-userlist" onClick={handleClick}>
              <img 
                src={user.avatarURL}
                alt={`Avatar of ${user.name}`} 
                focusable="false"
              />
              <span focusable="false">{user.name}</span>
              <span focusable="false">{user.id}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ users, authedUser }) => {
  return {
    authedUser,
    usersList: Object.values(users).sort((a,b) => b.id - a.id),
  };
}

export default connect(mapStateToProps)(LoginAs);