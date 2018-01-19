import { Todo } from './todo';
import { ADD_TODO, DELETE_TODO_ID, TOGGLE_TODO_COMPLETE } from './actions';
import {tassign} from 'tassign';
export interface IAppState {
    todos: Todo[];
}

export const INITIAL_STATE: IAppState = {
    todos: []
}

function addTodo(state, action) {
    const todosLen = state.todos.length;
    let lastId = (todosLen > 0) ?  state.todos[todosLen - 1].id : -1;
    action.newTodo.id = ++lastId;
  return tassign(state, {
    todos: state.todos.concat(action.newTodo) 
  });
}

function deleteTodo(state, action) {
    let todos = state.todos
      .filter(todo => todo.id !== action.id);
  return tassign(state, {
    todos: todos 
  });
}

function toggleTodo(state, action) {
    let todo = state.todos
                    .filter(todo => todo.id === action.todo.id)
                    .pop();
    Object.assign(todo, {complete: !action.todo.complete});

  return tassign(state, {
    todos: state.todos 
  });
}


export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case ADD_TODO: return addTodo(state, action);
        case DELETE_TODO_ID: return deleteTodo(state, action);
        case TOGGLE_TODO_COMPLETE: return toggleTodo(state, action);
    }
    return state;
}
