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
      season: {"08": {episode: '0803'}}, 
      baker: 'Flo'
    },
    optionTwo: {
      votes: [],
      text: 'Sophie\'s Picnic Basket Bread Sculpture',
      season: {"08": {episode: '0803'}}, 
      baker: 'Sophie'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'lennym',
    timestamp: 1645928870305,
    optionOne: {
      votes: [],
      text: 'Stacey\'s Ascot Hat Bread Sculpture',
      season: {"08": {episode: '0803'}}, 
      baker: 'Stacey'
    },
    optionTwo: {
      votes: ['lennym', 'aaronb'],
      text: 'Steven\'s The Bag I Knead Bread Sculpture',
      season: {"08": {episode: '0803'}}, 
      baker: 'Steven'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'aaronb',
    timestamp: 1648435423015,
    optionOne: {
      votes: [],
      text: 'Liam\'s Kneadapolitan Bread Sculpture',
      season: {"08": {episode: '0803'}}, 
      baker: 'Liam'
    },
    optionTwo: {
      votes: ['aaronb'],
      text: 'Kate\'s Kraken Bread Sculpture',
      season: {"08": {episode: '0803'}}, 
      baker: 'Kate'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'anitab',
    timestamp: 1641046114171,
    optionOne: {
      votes: [],
      text: 'Yan\'s Chequerboard Pie',
      season: {"08": {episode: '0806'}}, 
      baker: 'Yan'
    },
    optionTwo: {
      votes: ['aaronb'],
      text: 'Kate\'s Potato Curry Pie with Mango & Chilli Glaze',
      season: {"08": {episode: '0806'}}, 
      baker: 'Kate'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'anitab',
    timestamp: 1654892182619,
    optionOne: {
      votes: ['anitab'],
      text: 'Rahul\'s Butterfly Pie',
      season: {"09": {episode: '0906'}}, 
      baker: 'Rahul'
    },
    optionTwo: {
      votes: ['lennym'],
      text: 'Briony\'s "Down the Rabbit Hole" Banquet Pie',
      season: {"09": {episode: '0906'}},
      baker: 'Briony'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'lennym',
    timestamp: 1655317692670,
    optionOne: {
      votes: ['lennym', 'maddiem'],
      text: 'Jon\'s Welsh Dragon Pie',
      season: {"09": {episode: '0906'}},
      baker: 'Jon'
    },
    optionTwo: {
      votes: ['anitab'],
      text: 'Kim-Joy\'s Silke the Vegetarian Mermaid',
      season: {"09": {episode: '0906'}},
      baker: 'Kim-Joy'
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
            {id: '0803', bakeURL:"https://i.imgur.com/J0t0VEC.png"}, 
        }
      }, 
      "James": {
        id: 'James', 
        imageURL: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/sdA4k1m.png"}, 
        }
      },  
      "Julia": {
        id: 'Julia', 
        imageURL: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/SYdRtGH.png"}, 
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/1vpJjLS.png"}
        }
      },  
      "Kate": {
        id: 'Kate', 
        imageURL: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/GSqOalb.png"}, 
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/cSvbkV4.png"}
        }
      },  
      "Liam": {
        id: 'Liam', 
        imageURL: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/PBtPyax.png"}, 
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/1dyOdk8.png"}
        }
      },  
      "Sophie": {
        id: 'Sophie', 
        imageURL: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/L38ueiN.png"}, 
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/EfPNsco.png"}
        }
      },  
      "Stacey": {
        id: 'Stacey', 
        imageURL: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/JEyxvlP.png"}, 
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/wNlfzTC.png"}
        }
      }, 
      "Steven": {
        id: 'Steven', 
        imageURL: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/yyJpbJC.png"}, 
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/NNdLoYP.png"}
        }
      },  
      "Tom": {
        id: 'Tom', 
        imageURL: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/4fmdOTt.png"}, 
        }
      },
      "Yan": {
        id: 'Yan', 
        imageURL: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/C6TZwf5.png"}, 
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/PD2pMgD.png"}
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
            {id: "0906", bakeURL:"https://i.imgur.com/79fLjn9.png"}, 
        }
      }, 
      "Dan": {
        id: 'Dan', 
        imageURL: {
          "0906": 
            {id: '0906', bakeURL:"https://i.imgur.com/cqTobCf.png"}, 
        }
      },  
      "Jon": {
        id: 'Jon', 
        imageURL: {
          "0906": 
            {id: '0906', bakeURL:"https://i.imgur.com/MB1FtlZ.png"}
        }
      },  
      "Kim-Joy": {
        id: 'Kim-Joy', 
        imageURL: {
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/84Y8n0G.png"}
        }
      },  
      "Manon": {
        id: 'Manon', 
        imageURL: {
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/FowkCpl.png"}
        }
      },  
      "Rahul": {
        id: 'Rahul', 
        imageURL: {
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/OfKpkVr.png"}
        }
      },  
      "Ruby": {
        id: 'Ruby', 
        imageURL: {
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/aBYze1Z.png"}
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
