let users = {
  aaronb: {
    id: 'aaronb',
    password:'password123',
    name: 'Aaron B',
    avatarURL: 'https://github.com/djbrownbear/employee-polls/blob/main/src/assets/images/avatars/sarah.png?raw=true',
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionOne',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  anitab: {
    id: 'anitab',
    password:'abc321',
    name: 'Anita B',
    avatarURL: "https://github.com/djbrownbear/employee-polls/blob/main/src/assets/images/avatars/tyler.png?raw=true",
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  lennym: {
    id: 'lennym',
    password:'xyz123',
    name: 'Lenny M',
    avatarURL: "https://github.com/djbrownbear/employee-polls/blob/main/src/assets/images/avatars/mike.png?raw=true",
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionOne'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  },
  maddiem: {
    id: 'maddiem',
    password:'pass246',
    name: 'Maddie M',
    avatarURL: 'https://github.com/djbrownbear/employee-polls/blob/main/src/assets/images/avatars/zenobia.png?raw=true',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
    },
    questions: [],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'aaronb',
    timestamp: 1649386830421,
    optionOne: {
      votes: ['aaronb'],
      text: 'Flo\'s Davy Jones\' Locker Bread Sculpture',
    },
    optionTwo: {
      votes: [],
      text: 'Sophie\'s Picnic Basket Bread Sculpture'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'lennym',
    timestamp: 1645928870305,
    optionOne: {
      votes: [],
      text: 'Stacey\'s Ascot Hat Bread Sculpture',
    },
    optionTwo: {
      votes: ['lennym', 'aaronb'],
      text: 'Steven\'s The Bag I Knead Bread Sculpture'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'aaronb',
    timestamp: 1648435423015,
    optionOne: {
      votes: [],
      text: 'Liam\'s Kneadapolitan Bread Sculpture',
    },
    optionTwo: {
      votes: ['aaronb'],
      text: 'Kate\'s Kraken Bread Sculpture'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'anitab',
    timestamp: 1641046114171,
    optionOne: {
      votes: [],
      text: 'Yan\'s Chequerboard Pie',
    },
    optionTwo: {
      votes: ['aaronb'],
      text: 'Kate\'s Potato Curry Pie with Mango & Chilli Glaze'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'anitab',
    timestamp: 1654892182619,
    optionOne: {
      votes: ['anitab'],
      text: 'Rahul\'s Butterfly Pie',
    },
    optionTwo: {
      votes: ['lennym'],
      text: 'Briony\'s "Down the Rabbit Hole" Banquet Pie'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'lennym',
    timestamp: 1655317692670,
    optionOne: {
      votes: ['lennym', 'maddiem'],
      text: 'Jon\'s Welsh Dragon Pie',
    },
    optionTwo: {
      votes: ['anitab'],
      text: 'Kim-Joy\'s Silke the Vegetarian Mermaid'
    }
  },
}

let bakers = {
  "08": {
    id: '08',
    baker: {
      "Flo": {
        id: 'Flo', 
        imageURL: {
          "0803": 
            {id: '0803', URL:"https://imgur.com/J0t0VEC"}, 
        }
      }, 
      "James": {
        id: 'James', 
        imageURL: {
          "0803": 
            {id: '0803', URL:"https://imgur.com/sdA4k1m"}, 
        }
      },  
      "Julia": {
        id: 'Julia', 
        imageURL: {
          "0803": 
            {id: '0803', URL:"https://imgur.com/SYdRtGH"}, 
          "0806": 
            {id: '0806', URL:"https://imgur.com/1vpJjLS"}
        }
      },  
      "Kate": {
        id: 'Kate', 
        imageURL: {
          "0803": 
            {id: '0803', URL:"https://imgur.com/GSqOalb"}, 
          "0806": 
            {id: '0806', URL:"https://imgur.com/cSvbkV4"}
        }
      },  
      "Liam": {
        id: 'Liam', 
        imageURL: {
          "0803": 
            {id: '0803', URL:"https://imgur.com/PBtPyax"}, 
          "0806": 
            {id: '0806', URL:"https://imgur.com/1dyOdk8"}
        }
      },  
      "Sophie": {
        id: 'Sophie', 
        imageURL: {
          "0803": 
            {id: '0803', URL:"https://imgur.com/L38ueiN"}, 
          "0806": 
            {id: '0806', URL:"https://imgur.com/EfPNsco"}
        }
      },  
      "Stacey": {
        id: 'Stacey', 
        imageURL: {
          "0803": 
            {id: '0803', URL:"https://imgur.com/JEyxvlP"}, 
          "0806": 
            {id: '0806', URL:"https://imgur.com/wNlfzTC"}
        }
      }, 
      "Steven": {
        id: 'Steven', 
        imageURL: {
          "0803": 
            {id: '0803', URL:"https://imgur.com/yyJpbJC"}, 
          "0806": 
            {id: '0806', URL:"https://imgur.com/NNdLoYP"}
        }
      },  
      "Tom": {
        id: 'Tom', 
        imageURL: {
          "0803": 
            {id: '0803', URL:"https://imgur.com/4fmdOTt"}, 
        }
      },
      "Yan": {
        id: 'Yan', 
        imageURL: {
          "0803": 
            {id: '0803', URL:"https://imgur.com/C6TZwf5"}, 
          "0806": 
            {id: '0806', URL:"https://imgur.com/PD2pMgD"}
        }
      }, 
    }
  },
  "09": {
    id: '09',
    baker: {
      "Briony": {
        id: 'Briony', 
        imageURL: {
          "0906": 
            {id: "0906", URL:"https://imgur.com/79fLjn9"}, 
        }
      }, 
      "Dan": {
        id: 'Dan', 
        imageURL: {
          "0906": 
            {id: '0906', URL:"https://imgur.com/cqTobCf"}, 
        }
      },  
      "Jon": {
        id: 'Jon', 
        imageURL: {
          "0906": 
            {id: '0906', URL:"https://imgur.com/MB1FtlZ"}
        }
      },  
      "Kim-Joy": {
        id: 'Kim-Joy', 
        imageURL: {
          "0806": 
            {id: '0806', URL:"https://imgur.com/84Y8n0G"}
        }
      },  
      "Manon": {
        id: 'Manon', 
        imageURL: {
          "0806": 
            {id: '0806', URL:"https://imgur.com/FowkCpl"}
        }
      },  
      "Rahul": {
        id: 'Rahul', 
        imageURL: {
          "0806": 
            {id: '0806', URL:"https://imgur.com/OfKpkVr"}
        }
      },  
      "Ruby": {
        id: 'Ruby', 
        imageURL: {
          "0806": 
            {id: '0806', URL:"https://imgur.com/aBYze1Z"}
        }
      }, 
    }, 
  }
} 

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((resolve) => {
    setTimeout(() => resolve({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((resolve) => {
    setTimeout(() => resolve({...questions}), 1000)
  })
}

export function _getBakers () {
  return new Promise((resolve) => {
    setTimeout(() => resolve({...bakers}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function _saveQuestion (question) {
  return new Promise((resolve, reject) => {
    if (!question.optionOneText || !question.optionTwoText || !question.author) {
      reject("Please provide optionOneText, optionTwoText, and author");
    }

    const formattedQuestion = formatQuestion(question)
    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      resolve(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((resolve, reject) => {
    if (!authedUser || !qid || !answer) {
      reject("Please provide authedUser, qid, and answer");
    }

    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      resolve(true)
    }, 500)
  })
}
