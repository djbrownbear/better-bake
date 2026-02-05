import React from 'react';
import { User } from "../types";
import { useAppSelector } from "../store/hooks";

const Leaderboard: React.FC = () => {
  const usersList = useAppSelector(state => {
    const countAskedAnswered = (x: User) => {
      const asked = x.questions.length;
      const answered = Object.keys(x.answers).length;
      return asked + answered;
    }

    return Object.values(state.users).sort((a, b) => countAskedAnswered(b) - countAskedAnswered(a));
  });
  const defaultAvatar = "https://img.icons8.com/external-others-inmotus-design/67/000000/external-Avatar-round-icons-others-inmotus-design-5.png";

  return (
    <div>
      <div className="bg-secondary py-8">
        <h1 className="text-4xl font-bold text-center">Leaderboard</h1>
      </div>
      <div className="max-w-[65em] mx-auto mb-40 px-4 py-8">
        <table className="table-fixed mx-auto w-4/5 border-collapse border-2 border-gray-900 text-center">
          <thead className="bg-secondary text-gray-900">
            <tr className="border-b-2 border-gray-900">
              <th className="w-2/5 p-2.5 text-2xl">User</th>
              <th className="w-[30%] p-2.5 text-2xl">Created</th>
              <th className="w-[30%] p-2.5 text-2xl">Answered</th>
            </tr>
          </thead>
          <tbody>
            { 
              usersList.map((user) => (
                <tr key={user.id} className="border-b-2 border-gray-900">
                  <td className="p-2.5">
                    <div className="inline-flex flex-row justify-start w-full items-center">
                      <img 
                        className="h-[100px]"
                        src={user.avatarURL ? user.avatarURL : defaultAvatar }
                        alt={`Avatar of ${user.name}`} 
                      />
                      <div className="flex flex-col px-1.5 text-left">
                        <span className="text-xl font-semibold">{user.name}</span>
                        <span className="text-xs uppercase">{user.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-2.5 text-xl font-semibold">{user.questions.length}</td>
                  <td className="p-2.5 text-xl font-semibold">{Object.keys(user.answers).length}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;