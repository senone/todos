(function(angular){
  var controllers = angular.module('app.controllers',['app.services']);
  controllers.controller('mycontroller', [
    '$scope',
    'MainService',
    '$route',
    '$routeParams',
    function($scope, MainService,$route,$routeParams){
    $scope.text = '';
    $scope.todos = MainService.get();

    $scope.add =  function(){
      if($scope.text){
       MainService.add($scope.text);
      }
      $scope.text = '';
    };
//删除某一条数据
    $scope.remove=MainService.remove;


//单选完成数据储存
    $scope.toggle = MainService.toggle;


    //編輯 edit
    $scope.currentId = -1;
    $scope.editing =  function(id){
      $scope.currentId = id;
    };
    $scope.update =  function(){
      $scope.currentId = -1;
    };

    //清除所有已经完成的项目
    $scope.clearAll =  function(){
      var newTodos = MainService.clearAll();
      $scope.todos = newTodos;
    };

    //全选
    $scope.checkedAll = MainService.checkedAll;

    //filter 根据锚点筛选
      $scope.select = {};
      var status = $routeParams.status;
      switch(status){
        case 'active':
        $scope.select = {complete:false};
        break;
        case 'completed':
        $scope.select = {complete:true};
        break;
        default:
        $route.updateParams({status:''});
        $scope.select = {};
        break;
      }

    //自定义匹配 因为filter是模糊匹配
    $scope.equalCompare =  function(source,target){
      return source === target;
    }
  }])

})(angular)

/*
(function(angular) {
  'use strict';

  var controllers = angular.module('app.controllers', ['ngRoute']);

  // 注册一个主要的控制器
  controllers.controller('MainController', ['$scope', '$location', 'MainService', '$routeParams', function($scope, $location, MainService, $routeParams) {
    // [1,2,3,4,5]


    // 文本框需要一个模型
    $scope.text = '';

    // 任务列表也需要一个
    // 每一个任务的结构 { id: 1, text: '学习', completed: true }
    $scope.todos = MainService.getTodos();

    // 添加todo
    $scope.add = function() {
      if (!$scope.text) {
        return;
      }
      MainService.add($scope.text);
      // 清空文本框
      $scope.text = '';
    };


    // 处理删除
    $scope.remove = MainService.remove;

    // 清空已完成
    $scope.clear = function() {
      $scope.todos = MainService.clear();
    };

    // 是否有已经完成的
    $scope.existCompleted = MainService.existCompleted;

    // 当前编辑哪个元素
    $scope.currentEditingId = -1;
    $scope.editing = function(id) {
      $scope.currentEditingId = id;
    };
    $scope.save = function() {
      $scope.currentEditingId = -1;
    };

    $scope.toggle = MainService.toggle;

    $scope.toggleAll = MainService.toggleAll;

    switch ($routeParams.status) {
      case 'active':
        $scope.filter = { completed: false };
        break;
      case 'completed':
        $scope.filter = { completed: true };
        break;
      default:
        $scope.filter = {};
        break;
    }

    $scope.equalCompare = function(source, target) {
      return angular.equals(source, target);
    };

  }]);
})(angular);
*/
