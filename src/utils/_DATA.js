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
      text: "Flo's Davy Jones Locker Bread Sculpture",
      season: '08', 
      episode: '0803',
      baker: 'Flo'
    },
    optionTwo: {
      votes: [],
      text: "Sophie's Picnic Basket Bread Sculpture",
      season: '08', 
      episode: '0803',
      baker: 'Sophie'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'lennym',
    timestamp: 1645928870305,
    optionOne: {
      votes: [],
      text: "Stacey's Ascot Hat Bread Sculpture",
      season: '08', 
      episode: '0803',
      baker: 'Stacey'
    },
    optionTwo: {
      votes: ['lennym', 'aaronb'],
      text: "Steven's The Bag I Knead Bread Sculpture",
      season: '08', 
      episode: '0803',
      baker: 'Steven'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'aaronb',
    timestamp: 1648435423015,
    optionOne: {
      votes: [],
      text: "Liam's Kneadapolitan Bread Sculpture",
      season: '08', 
      episode: '0803',
      baker: 'Liam'
    },
    optionTwo: {
      votes: ['aaronb'],
      text: "Kate's Kraken Bread Sculpture",
      season: '08', 
      episode: '0803',
      baker: 'Kate'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'anitab',
    timestamp: 1641046114171,
    optionOne: {
      votes: [],
      text: "Yan's Chequerboard Pie",
      season: '08', 
      episode: '0806', 
      baker: 'Yan'
    },
    optionTwo: {
      votes: ['aaronb'],
      text: "Kate's Potato Curry Pie with Mango & Chilli Glaze",
      season: '08', 
      episode: '0806', 
      baker: 'Kate'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'anitab',
    timestamp: 1654892182619,
    optionOne: {
      votes: ['anitab'],
      text: "Rahul's Butterfly Pie",
      season: '09', 
      episode: '0906', 
      baker: 'Rahul'
    },
    optionTwo: {
      votes: ['lennym'],
      text: "Briony's 'Down the Rabbit Hole' Banquet Pie",
      season: '09', 
      episode: '0906', 
      baker: 'Briony'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'lennym',
    timestamp: 1655317692670,
    optionOne: {
      votes: ['lennym', 'maddiem'],
      text: "Jon's Welsh Dragon Pie",
      season: '09', 
      episode: '0906', 
      baker: 'Jon'
    },
    optionTwo: {
      votes: ['anitab'],
      text: "Kim-Joy's Silke the Vegetarian Mermaid",
      season: '09', 
      episode: '0906', 
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
        episodes: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/J0t0VEC.png", text: "Flo's Davy Jones Locker Bread Sculpture"}, 
        }
      }, 
      "James": {
        id: 'James', 
        episodes: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/sdA4k1m.png", text: "James' Owl in the Woods Bread Sculpture"}, 
        }
      },  
      "Julia": {
        id: 'Julia', 
        episodes: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/SYdRtGH.png", text: "Julia's The Snail Under a Mushroom Bread Sculpture"}, 
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/1vpJjLS.png", text: "Julia's Special Occasion Pie"}
        }
      },  
      "Kate": {
        id: 'Kate', 
        episodes: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/GSqOalb.png", text: "Kate's Kraken Bread Sculpture"}, 
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/cSvbkV4.png"}, text: "Kate's Potato Curry Pie with Mango & Chilli Glaze"
        }
      },  
      "Liam": {
        id: 'Liam', 
        episodes: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/PBtPyax.png", text: "Liam's Kneadapolitan Bread Sculpture"}, 
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/1dyOdk8.png", text: "Liam's Nan's Sunday Dinner Pie"}
        }
      },  
      "Sophie": {
        id: 'Sophie', 
        episodes: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/L38ueiN.png", text: "Sophie's Picnic Basket Bread Sculpture"}, 
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/EfPNsco.png", text: "Sophie's Game Pie with Glazed Forest Fruits"}
        }
      },  
      "Stacey": {
        id: 'Stacey', 
        episodes: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/JEyxvlP.png", text: "Stacey's Ascot Hat Bread Sculpture"}, 
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/wNlfzTC.png", text: "Stacey's Indian Hand Raised Pie with Mango"}
        }
      }, 
      "Steven": {
        id: 'Steven', 
        episodes: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/yyJpbJC.png", text: "Steven The Bag I Knead Bread Sculpture"}, 
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/NNdLoYP.png", text: "Steven Christmas Pie"}
        }
      },  
      "Tom": {
        id: 'Tom', 
        episodes: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/4fmdOTt.png", text: "Pink & Yellow Rose Centrepiece' Bread Sculpture"}, 
        }
      },
      "Yan": {
        id: 'Yan', 
        episodes: {
          "0803": 
            {id: '0803', bakeURL:"https://i.imgur.com/C6TZwf5.png", text: "Yan's Basil the Vegetarian Dragon with his Pumpkin Hoard Bread Sculpture"}, 
          "0806": 
            {id: '0806', bakeURL:"https://i.imgur.com/PD2pMgD.png", text: "Yan's Chequerboard Pie"}
        }
      }, 
    }
  },
  "09": {
    id: '09',
    baker: {
      "Briony": {
        id: 'Briony', 
        episodes: {
          "0906": 
            {id: '0906', bakeURL:"https://i.imgur.com/79fLjn9.png", text: "Briony's 'Down the Rabbit Hole' Banquet Pie"}, 
        }
      }, 
      "Dan": {
        id: 'Dan', 
        episodes: {
          "0906": 
            {id: '0906', bakeURL:"https://i.imgur.com/cqTobCf.png", text: "Dan's Salmon Coulibiac"}, 
        }
      },  
      "Jon": {
        id: 'Jon', 
        episodes: {
          "0906": 
            {id: '0906', bakeURL:"https://i.imgur.com/MB1FtlZ.png", text: "Jon's Welsh Dragon Pie"}
        }
      },  
      "Kim-Joy": {
        id: 'Kim-Joy', 
        episodes: {
          "0906": 
            {id: '0906', bakeURL:"https://i.imgur.com/84Y8n0G.png", text: "Kim-Joy's Silke the Vegetarian Mermaid"}
        }
      },  
      "Manon": {
        id: 'Manon', 
        episodes: {
          "0906": 
            {id: '0906', bakeURL:"https://i.imgur.com/FowkCpl.png", text: "Manon's 'What Has Poppy Eaten?'"}
        }
      },  
      "Rahul": {
        id: 'Rahul', 
        episodes: {
          "0906": 
            {id: '0906', bakeURL:"https://i.imgur.com/OfKpkVr.png", text: "Rahul's Butterfly Pie"}
        }
      },  
      "Ruby": {
        id: 'Ruby', 
        episodes: {
          "0906": 
            {id: '0906', bakeURL:"https://i.imgur.com/aBYze1Z.png", text: "Ruby's Kohinoor Crown"}
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
