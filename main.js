

angular.module('todoApp', ['ui.bootstrap','ui.layout'])
  .controller('TodoListController', function () {
      var todoList = this;
      todoList.todos = [
        { text: 'learn angular', done: true },
        { text: 'build an angular app', done: false }];

      todoList.addTodo = function () {
          todoList.todos.push({ text: todoList.todoText, done: false });
          todoList.todoText = '';
      };

      todoList.remaining = function () {
          var count = 0;
          angular.forEach(todoList.todos, function (todo) {
              count += todo.done ? 0 : 1;
          });
          return count;
      };

      todoList.archive = function () {
          var oldTodos = todoList.todos;
          todoList.todos = [];
          angular.forEach(oldTodos, function (todo) {
              if (!todo.done) todoList.todos.push(todo);
          });
      };
  }).controller('TabsDemoCtrl', function ($scope, $window) {
      $scope.tabs = [
        { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
        { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
      ];

      $scope.alertMe = function () {
          setTimeout(function () {
              $window.alert('You\'ve selected the alert tab!');
          });
      };

      $scope.model = {
          name: 'Tabs'
      };
  });

