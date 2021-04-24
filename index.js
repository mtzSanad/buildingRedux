//Library code
//Step 1 creating store factory
function createStore(reducer) {
    //Holding the state of our application
    let state;
    let listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter(e => e !== listener)
        }
    }

    //Step 3 creating dispatch
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}


//APP code

//Actions
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGEL_TODO = 'TOGGEL_TODO';

const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

//ACTION Creator
function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo: todo
    }
}


//Step2 pure fucntion to update state
//To update the state we need to invoke this function and pass parameters
//This function is called Reducer and it must be pure function
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            // return state.concat([action.todo]);
            return [...state, action.todo];
        case REMOVE_TODO:
            return state.filter(todo => todo.id != action.id);
        case TOGGEL_TODO:
            return state.map(todo => todo.id === action.id ?
                { ...todo, complete: !todo.complete } : todo)
        // return state.map(todo => todo.id === action.id ?
        //     Object.assign({}, todo, { complete: !todo.complete }) : todo)
        default:
            return state;
    }
}

function goals(state = [], action) {
    switch (action.type) {
        case ADD_GOAL:
            return [...state, action.goal];
        case REMOVE_GOAL:
            return state.filter(goal => goal.id != action.id);
        default:
            return state;
    }
}

function app(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}


// const store = createStore(todos);
const store = createStore(app);

store.subscribe(() => {
    console.log('The new state is ', store.getState())
});

const unsubscribe = store.subscribe(() => {
    console.log('The store changed ')
})


store.dispatch(addTodoAction(
    {
        id: 1,
        name: 'Learn Redux',
        complete: false
    }
))

unsubscribe();

store.dispatch({
    type: "ADD_TODO",
    todo: {
        id: 2,
        name: 'Learn Redux 2',
        complete: false
    }
})

store.dispatch({
    type: "REMOVE_TODO",
    id: 2
})

store.dispatch({
    type: "TOGGEL_TODO",
    id: 1
})

store.dispatch({
    type: ADD_GOAL,
    goal: {
        id: 1,
        name: "Goal 1"
    }
})

store.dispatch({
    type: ADD_GOAL,
    goal: {
        id: 2,
        name: "Goal 2"
    }
})

store.dispatch({
    type: ADD_GOAL,
    goal: {
        id: 3,
        name: "Goal 3"
    }
})

store.dispatch({
    type: REMOVE_GOAL,
    id: 1
})