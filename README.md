# Javascript Project

This project is built for tracking user expenses and income. Based on the information the user entered, the application is able to provide some useful insight as well as it can visualize user data. Users can enter their data into a database by utilizing two forms: income and expenses. Also, users can save the data into a database through these forms. <br /> 
This application's backend is powered by Rails. It uses SQLite for its database. In order to effectively manage user data, databases are divided into three tables: user, expense, income. 
 
## Install

### Clone the repository

```shell
https://github.com/batsaikhan84/js-project-frontend.git
cd js-proejct-frontend
```

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Install dependencies

Using NPM

```shell
npm install
```

In order to avoid conflict with the frontend app that opens at http://localhost:3000 in the development mode  , choose backend application port at 3001:

```shell
rails s -p 3001
```

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### please refer to backend application

https://github.com/batsaikhan84/react-project-backend.git

## License
[MIT](https://choosealicense.com/licenses/mit/)

