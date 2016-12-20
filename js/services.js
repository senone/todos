( function(angular){

  var services = angular.module('app.services',[]);

  services.service('MainService', ['$window',function($window){
    var storage = $window.localStorage;//获取到本地存储
    var todos = storage['todo_lists'] ? JSON.parse(storage['todo_lists']):[];

    function save(){
      storage['todo_lists'] = JSON.stringify(todos);
    }

    this.add =  function(text){
      todos.push({
        id:Math.random(),
        text:text,
        complete:false
      });
      save();
    };

    this.get =  function(){
      return todos;
    };//暴露参数todos

    //清除所有已经完成的项目
    this.clearAll =  function(){
      var arr=[]
      for (var i = 0; i < todos.length; i++) {
          if(!todos[i].complete){
            arr.push(todos[i]);
          }
      };
      todos = arr;
     save();
      return todos;
    }

    //全选
    var now = true;
   this.checkedAll =  function(){
    for (var i = 0; i < todos.length; i++) {
          todos[i].complete = now;
      };
      now = !now;
     save();
    };

    //单选保存状态
    this.toggle = save;  //save 函数不可以暴露？？？

    this.remove = function(id) {
      for (var i = 0; i < todos.length; i++) {
        if(todos[i].id === id) {
          todos.splice(i,1);
          break;
        }
      }
       save();
    };

  }])
})(angular)


/*(function(angular) {
  'use strict';

  var services = angular.module('app.services', []);

  services.service('MainService', ['$window', function($window) {
    var storage = $window.localStorage;

    var todos = storage['todo_list'] ? JSON.parse(storage['todo_list']) : [];

    function save() {
      storage['todo_list'] = JSON.stringify(todos);
    }

    function getId() {
      var id = Math.random(); // 1 2
      if (todos) {
        for (var i = 0; i < todos.length; i++) {
          if (todos[i].id === id) {
            id = getId();
            break;
          }
        }
      }
      return id;
    }

    this.getTodos = function() {
      return todos;
    };

    this.add = function(text) {
      todos.push({
        // 自动增长？
        id: getId(),
        // 由于$scope.text是双向绑定的，add同时肯定可以同他拿到界面上的输入
        text: text,
        completed: false
      });
      save();
    };

    this.remove = function(id) {
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
          todos.splice(i, 1);
          break;
        }
      }
      save();
    };

    this.clear = function() {
      var result = [];
      for (var i = 0; i < todos.length; i++) {
        if (!todos[i].completed) {
          result.push(todos[i]);
        }
      }
      todos = result;
      save();
      return todos;
    };

    this.existCompleted = function() {
      // 该函数一定要有返回值
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].completed) {
          return true;
        }
      }
      return false;
    };

    this.toggle = save;

    var now = true;
    this.toggleAll = function() {
      for (var i = 0; i < todos.length; i++) {
        todos[i].completed = now;
      }
      now = !now;
      save();
    }

  }]);

})(angular);*/
