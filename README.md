# SW TEST TASK


## STACK
### REACT
### ZUSTAND
### TANSTACK QUERY
### TAILWIND
### AXIOS
### REACT FLOW

## Description
App fetches data from external APIs and displays data about characters. Also it draws graph with related to character nodes -> his films and common to film and character spaceships.  

--Zustand help keeping data in the state, so when user is trying to see graph next time, we are just giving him data, stored in store. 
Also I`m using session storage as a cache for some data, to avoid fetching data each time when user interacts with component that is keeping info inside.

--For styling I`m using Tailwind CSS. Easy to use and powerful CSS framework for creating styles and simple animations.

--Axios was used to create instance. Just in case I`ll need to work with it.

--TanstackQuery was used to create custom hooks and to implement some additional things. In my own projects I`m using axios, or $fetch and useAsyncData from Nuxt, for example.

--React Flow was used for displaying the data. Quite new thing for me, but easy to use for simple tasks. 

I was trying to implement KISS and DRY principles, where it possible. For logics I've used functional programming without OOP. Could do some classes for dependency injections (for TanStackQuery for example). But I saw no reason for that. Also I have wrote few custom hooks. It was possible to do one ultimate hook for fetching data, but some times it was needed to convert data somehow inside.
Maybe I'll fix that later.
 


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
