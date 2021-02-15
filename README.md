## Transifex Assignment

Transifex Assignment is a simple crud web app search for movies and add to checkout cart using React.
## Build With

* [React](https://reactjs.org/)
* [Material UI](https://material-ui.com/)
* [Create-react-app with Typescript template](https://create-react-app.dev/docs/adding-typescript/)
* [React hot toast](https://github.com/timolins/react-hot-toast)
* [Typescript](https://www.typescriptlang.org/docs/handbook/react.html)
* [Axios](https://github.com/axios/axios)
* [Axios mock adapter](https://github.com/ctimmerm/axios-mock-adapter#readme)

### How to run 

After installing and run the G-Loot server follow the commands below to start the project in development.

Firstly we need to pass our env vars in our app.
```
git clone transifex-assignment
cd transifex-assignment
Create on the root folder a .env file and put inside our env var which will use (REACT_APP_API_ENDPOINT="https://api.themoviedb.org/")
```

After the first step continue with our main set up.
```
npm install
npm run start
The app wiil probably ask to run in different port as the 3000 is used from the Express server. Type "y"
```

### Features implemented
* Search field with on change search action (Debounce used here)
* Delete players from list easily with one click
* Create player on the fly
* Added pagination with next and back buttons
* Calculate and delete on the fly in any page or edit
* Debounce function created for search input
* Max page number set to 10 per page but can be changed via dropdown.

### Testing build with

* [Jest for React](https://jestjs.io/)
* [Enzyme for jest](https://enzymejs.github.io/enzyme/)

### Testing

For testing i have used jest framework together with enzyme to render components.
To run the test type:

```
npm test
```

To run test with coverage run:

```
npm test -- --coverage
```

