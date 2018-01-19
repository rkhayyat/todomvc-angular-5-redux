import { IAppState } from './store';
import {Component} from '@angular/core';
import {Todo} from './todo';
import {NgRedux, select} from 'ng2-redux';
import { ADD_TODO, DELETE_TODO_ID, TOGGLE_TODO_COMPLETE } from './actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    newTodo: Todo = new Todo();
   @select() todos;
  
  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  addTodoRedux() {
    this.ngRedux.dispatch({type: ADD_TODO, newTodo: this.newTodo});
    this.newTodo = new Todo();
  }

  toggleTodoCompleteRedux(todo) {
    this.ngRedux.dispatch({type: TOGGLE_TODO_COMPLETE, todo: todo});
  }

  removeTodoRedux(todo) {
    this.ngRedux.dispatch({type: DELETE_TODO_ID, id: todo.id});
  }
}