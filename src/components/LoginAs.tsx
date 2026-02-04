import { connect, ConnectedProps } from "react-redux";
import React from 'react';
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../reducers";
import { User } from "../types";

const mapStateToProps = ({ users, authedUser }: RootState) => {
  return {
    authedUser,
    usersList: Object.values(users).sort((a,b) => a.id.localeCompare(b.id)),
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const LoginAs: React.FC<PropsFromRedux> = ({ dispatch, authedUser, usersList }) => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { path?: string } };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setAuthedUser(e.currentTarget.id));
    navigate((state?.path || "/dashboard"));
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
              />
              <span>{user.name}</span>
              <span>{user.id}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default connector(LoginAs);