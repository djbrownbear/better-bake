import React from 'react';
import { setAuthedUser } from "../reducers/authedUser";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";

const LoginAs: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { path?: string } };
  const usersList = useAppSelector(state => 
    Object.values(state.users).sort((a, b) => a.id.localeCompare(b.id))
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setAuthedUser(e.currentTarget.id));
    navigate((state?.path || "/dashboard"));
  }

  return (
    <div>
      <div className="bg-linear-to-r from-primary-600 via-primary-500 to-primary-600 py-8">
        <h1 className="text-4xl font-bold text-center">Switch User</h1>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {usersList.map((user) => (  
            <button key={user.id} id={user.id} type="button" className="flex items-center gap-4 p-4 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-primary-500 rounded-lg shadow-md transition-all" onClick={handleClick}>
              <img 
                src={user.avatarURL}
                alt={`Avatar of ${user.name}`} 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex flex-col items-start">
                <span className="font-bold text-lg">{user.name}</span>
                <span className="text-sm text-gray-600">{user.id}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoginAs;