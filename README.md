# Visit the Live Project

Open [Better Bake App](https://aaron.aaronandanita.com/better-bake) to view in your browser.

# Better Bake Polls Project

This is inspired by the final assessment from Udacity's React & Redux course. It is a "Who Baked It Better" polling app to vote between two options. Here are a few of the key features:

    1. Login - allows user to login. 
    2. Dashboard - toggle between answered and unanswered polls.
    3. Leaderboard - to see number of votes and polls answered.
    4. New Poll - create new "Who Baked It Better" polls.

## TL;DR

To get started developing right away:

- install all project dependencies with `npm install`
- start the development server with `npm start`

## What You're Getting

```bash
├── README.md # this file.
├── package.json # npm package manager file.
├── package-lock.json # depedency lock file.
├── public
│   ├── favicon.ico # React Icon
│   ├── robots.txt # Instructions to web robots
│   └── index.html # DO NOT MODIFY
└── src
    └── actions # Redux actions
    │   ├── authedUser.js   
    │   ├── polls.js  
    │   ├── shared.js
    │   └── users.js
    └── assets    
    │   └──  css
    │   │   ├── App.css # Styles for your app.
    │   │   └── index.css # Global styles.
    │   └── images    
    │   │   └── avatars # Holding spot for user icons. Not for production use.
    │   │   │   ├── icons8-avatar-67.png
    │   │   │   ├── mike.png
    │   │   │   ├── sarah.png    
    │   │   │   ├── tyler.png
    │   │   │   └── zenobia.png    
    │   │   └── logo.svg    
    └── components
    │   ├── App.js # root of the app.  
    │   ├── Custom404.js # custom error page.
    │   ├── Dashboard.js # display both answered and unanswered polls. redirect to poll details.
    │   ├── Leaderboard.js # display user rank by number of polls asked and answered.
    │   ├── LoginAs.js # feature to login as another user.
    │   ├── LoginPage.js # provides user ability to login.
    │   ├── Nav.js # let user navigate to other pages and logout.
    │   ├── NewPoll.js # provides user ability to create a poll.
    │   ├── Poll.js # display basic poll info.
    │   ├── PollHeader.js # displays avatar details.
    │   └── PollPage.js # displays poll details including vote results.
    └── middleware # redux middleware
    │   ├── index.js
    │   └── logger.js
    └── reducers # redux reducers
    │   ├── authedUser.js 
    │   ├── polls.js  
    │   ├── shared.js         
    │   └── users.css
    └── tests # jest tests  
    │   └── __snapshots__ # test snapshots
    │   │   └──Custom404.test.js.snap      
    │   ├── Custom404.test.js
    │   ├── Data.test.js
    │   └── LoginPage.test.js  
    └──utils
    │   ├── _DATA.js # fake database and methods to access the data.
    │   ├── api.js # acts as api to initialize data, get and update polls.
    │   ├── helpers.js # helper functions.         
    │   └── test-utils.js # helper to test with store and Provider.
    ├── index.js # This is the root of the app.      
    ├── reportWebVitals.js
    └── setupTests.js # do not modify this file
```

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| password   | String           | The user’s password in order to log in the application |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database. If one of the parameters are missing, an error is thrown.
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database. If one of the parameters are missing, an error is thrown.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|


# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
