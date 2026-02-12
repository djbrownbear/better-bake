import React from 'react';
import { User } from "../types";
import { useAppSelector } from "../store/hooks";
import { selectSortedUsers } from "../selectors/polls";

const Leaderboard: React.FC = () => {
  const usersList = useAppSelector(selectSortedUsers);
  const defaultAvatar = "https://img.icons8.com/external-others-inmotus-design/67/000000/external-Avatar-round-icons-others-inmotus-design-5.png";

  const getTotalScore = (user: User) => user.questions.length + Object.keys(user.answers).length;

  return (
    <div>
      <div className="bg-linear-to-r from-primary-600 via-primary-500 to-primary-600 py-8">
        <h1 className="text-4xl font-bold text-white text-center">Leaderboard</h1>
      </div>
      <div className="max-w-5xl mx-auto mb-40 px-4 py-8">
        {/* Leaderboard Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-primary-600 via-primary-500 to-primary-600 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Top Contributors</h2>
            <div className="text-gray-400 text-sm">
              {usersList.length} {usersList.length === 1 ? 'User' : 'Users'}
            </div>
          </div>

          {/* Leaderboard List */}
          <div className="divide-y divide-gray-200">
            {usersList.map((user, index) => {
              const isTopThree = index < 3;
              const totalScore = getTotalScore(user);
              
              return (
                <div 
                  key={user.id} 
                  className={`
                    flex items-center gap-4 p-4 transition-colors
                    ${isTopThree ? 'bg-linear-to-r from-primary-50 to-transparent' : 'hover:bg-gray-50'}
                  `}
                >
                  {/* Rank */}
                  <div className="shrink-0 w-12 text-center">
                    {index === 0 ? (
                      <div className="text-3xl">🥇</div>
                    ) : index === 1 ? (
                      <div className="text-3xl">🥈</div>
                    ) : index === 2 ? (
                      <div className="text-3xl">🥉</div>
                    ) : (
                      <div className="text-2xl font-bold text-gray-400">
                        {index + 1}
                      </div>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="shrink-0">
                    <img 
                      className={`
                        w-16 h-16 rounded-full object-cover
                        ${isTopThree ? 'ring-4 ring-primary-300 shadow-lg' : 'ring-2 ring-gray-200'}
                      `}
                      src={user.avatarURL || defaultAvatar}
                      alt="" 
                      aria-hidden="true"
                    />
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {user.name}
                      </h3>
                      {index === 0 && (
                        <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary-100 text-primary-hover text-xs font-bold rounded-full">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Top
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">@{user.id}</p>
                  </div>

                  {/* Stats */}
                  <div className="hidden sm:flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-1">Created</div>
                      <div className="text-lg font-bold text-gray-900">
                        {user.questions.length}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-1">Answered</div>
                      <div className="text-lg font-bold text-gray-900">
                        {Object.keys(user.answers).length}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-1">Total</div>
                      <div className="text-xl font-bold text-primary">
                        {totalScore}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Stats */}
                  <div className="sm:hidden flex flex-col items-end gap-1">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-500">📝 {user.questions.length}</span>
                      <span className="text-gray-500">✅ {Object.keys(user.answers).length}</span>
                    </div>
                    <div className="text-lg font-bold text-primary">
                      Total: {totalScore}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 text-center">
            <p className="text-sm text-gray-600">
              Rankings based on polls created + polls answered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;