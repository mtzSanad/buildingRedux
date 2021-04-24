# Introduction
Any application is just UI & State, and we want to make the state management of an application more predictable

Application data is stored outside of the app and is just referenced by the app.

If application have 2 places with same data handling data in both location is tricky.

## State Tree

One of the key points of Redux is that all of the data is stored in a single object called the state tree

`{
  recipes: [
    { … },
    { … },
    { … }
  ],
  ingredients: [
    { … },
    { … },
    { … },
    { … },
    { … },
    { … }
  ],
  products: [
    { … },
    { … },
    { … },
    { … }
  ]
}`

## Interacting with state tree.

1. we need a way to get state.
2. we need a way to listen to changes.
3. we need a way to update the state.

The above mentioned points are wrapped in a single concept called STORE

Rule # 1 Only event can change the state of store.

Event is just object with type property and other data and we Call it ACTIONS
{
    type: "ADD_TODO",
    todo:{
        id : 1,
        name: "ajskdfjkdsj"
    }
}

All actions must contain a type property, and now application is just a collection of actions that is responsible of changing the app state, and if state changed we will know from listeners.

Note : it is better to pass as little data as possible in each action.

The Action creator is a function that create/return action objects
const addItem = item => {
    type: ADD_ITEM,
    item
}

## Updating the state

Now we have the state tree and actions, now we need a way to tigh them together to update the state.

we can do this by making a fucntion that takes the current state and action, and based on this action this function will be responsible of updating state, but this function must be predictable as possible, which means we need to know what is the output of the function based on the input values, This is PURE funciton

Rule # 2 The function that returns the state must be a PURE fucntion

Pure function is 

1. Returns the same result if the same arguments are passed in
2. Depends solely on the arguments passed in to them, they dont access any out of scope varibale.
3. dosen't produce side effects "No interactions with outside world" which is making network request(API and I/O opetations) or mutating state.

Must success the 3 steps to be pure funcitons.

example const square = x => x*x; this is pure funciton

Whats greate in pure function is predectability

## Dispatch funciton in store
Reducers are functions that takes state and action to modify state "return state value" without mutating the state it self. It must be pure function

In store dispatch method is responsible on updateing the state, it will take action to tell what event happend in the application.

We also need to loop through our listeners and call their callback

Finally, when user createStore it should pass to it reducer so that dispatch method can call it when it is out of its scope.

HINT when modifying array of objects , map function creates a new array populated with result of each action on object, but object is reference so we cannot change it directly we need to change in mutating way by ... or Object.assign

## Adding more functionalities, reducers
To add more reducers our createStore funciton takes 1 reducer so we need somthing like rootReducer to handle other reducers

This is app reducer

## Better practice
convert actions strings as const variable
add action creator


# Adding UI to state management
You will need a function to hook to ui buttons
