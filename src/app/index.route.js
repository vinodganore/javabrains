(function() {
  'use strict';

  angular
    .module('javabrains')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        onEnter: function(ParseData){
          ParseData.sendAnalytics();
        }
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'dashboard',
        resolve: {
          'currentUser': ['ParseAuth', function (ParseAuth) {
            return ParseAuth.requireAuth();
          }],
          'userCourses': ['UserData', function(UserData) {
            return UserData.getStartedCourses();
          }]
        },
        onEnter: function(ParseData){
          ParseData.sendAnalytics();
        }
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profile',
        resolve: {
          'currentUser': ['ParseAuth', function (ParseAuth) {
            return ParseAuth.requireAuth();
          }]
        },
        onEnter: function(ParseData){
          ParseData.sendAnalytics();
        }
      })
      .state('topics', {
        url: '/topics',
        templateUrl: 'app/topics/topics.html',
        controller: 'TopicsController',
        controllerAs: 'topics',
        onEnter: function(ParseData){
          ParseData.sendAnalytics();
        }
      })
      .state('courses', {
        url: '/courses?topic',
        templateUrl: '/app/courses/courses.html',
        controller: 'CoursesController',
        controllerAs: 'courses',
        onEnter: function(ParseData){
          ParseData.sendAnalytics();
        }
      })
      .state('course', {
        url: '/courses/:courseName',
        resolve: {
          courseData:  function(REST_ROOT_URL, $http, $stateParams){
            return $http.get('/assets/data/courses/' + $stateParams.courseName + '.json',
            {
                cache: true
            })
            ;
         },
         lessonsViewed: function($stateParams, UserData) {
           return UserData.getAndMarkLessonsViewed($stateParams.courseName, null);
         }
        },
        templateUrl: '/app/coursedetail/coursedetail.html',
        controller: 'CourseDetailController',
        controllerAs: 'course',
        onEnter: function(ParseData){
          ParseData.sendAnalytics();
        }
      })
      .state('lesson', {
        url: '/courses/:courseName/lessons/:lessonName',
        resolve: {
          lessonData:  function(REST_ROOT_URL, $http, $stateParams){
            return $http.get('/assets/data/courses/' + $stateParams.courseName + '/lessons/' + $stateParams.lessonName + '.json',
              {
                cache: true
              }
            );
         },
         lessonsViewed: function($stateParams, UserData) {
           return UserData.getAndMarkLessonsViewed($stateParams.courseName, $stateParams.lessonName);
         }
        },
        templateUrl: '/app/lessons/lessons.html',
        controller: 'LessonController',
        controllerAs: 'lesson',
        onEnter: function(ParseData){
          ParseData.sendAnalytics();
        }
      })
      ;

    $urlRouterProvider.otherwise('/');
  }

})();
