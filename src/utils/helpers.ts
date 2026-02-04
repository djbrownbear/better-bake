export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatPoll (poll, author, authedUser) {
  const { id, optionOne, optionTwo, timestamp} = poll
  const { name, avatarURL } = author
  
  const optionOneVotes = optionOne.votes;
  const optionTwoVotes = optionTwo.votes;
  // const optionOneText = optionOne.text
  // const optionTwoText = optionTwo.text
  const allVotes = optionOneVotes.concat(optionTwoVotes);
  const hasVoted = allVotes.includes(authedUser);

  return {
    name,
    id,
    timestamp,
    avatar: avatarURL,
    optionOne,
    optionTwo,
    authedUser,
    hasVoted,
    // optionOneVotes,
    // optionTwoVotes,
    // optionOneText,
    // optionTwoText,
    // hasVoted: votes.length,
  };
}

export function formatPercent(val) {
  // source: https://stackoverflow.com/questions/45163256/how-to-format-numbers-as-percentage-values-in-javascript
  // author: wrlee
    return val.toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});
  };