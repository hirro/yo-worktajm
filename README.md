[![Build Status](https://travis-ci.org/hirro/yo-worktajm.png?branch=master)](https://travis-ci.org/hirro/yo-worktajm)
[![Code Climate](https://codeclimate.com/github/hirro/yo-worktajm.png)](https://codeclimate.com/github/hirro/yo-worktajm)
[![Coverage Status](https://coveralls.io/repos/hirro/yo-worktajm/badge.png?branch=master)](https://coveralls.io/r/hirro/yo-worktajm?branch=master)
[ ![Codeship Status for hirro/yo-worktajm](https://www.codeship.io/projects/295e56d0-3115-0131-77a2-4ab24c68f59c/status?branch=master)](https://www.codeship.io/projects/9576)
[![Dependency Status](https://gemnasium.com/hirro/yo-worktajm.png)](https://gemnasium.com/hirro/yo-worktajm)

# WorkTajm front end

***

## Purpose
This is the front end for my hobby time reporting application.

It is not functional yet.

Status is kept on Pivotal.

## Stack
	
### Backend - Spring 
* Tomcat 7.42+
* [Spring](www.spring.org)  Spring Data
* [Spring](www.spring.org)  Spring  Security

### Front end:
* [Yeoman 1.0](http://yeoman.io/)
* [AngularJS 1.2.1](http://www.angularjs.org/) 
* [Bootstrap 3](http://getbootstrap.com/)
* [Restangular](https://github.com/mgonto/restangular)
* [toastr](https://github.com/CodeSeven/toastr)

## Build

* powered by [Grunt.js](http://gruntjs.com/)
* test written using [Jasmine](http://pivotal.github.com/jasmine/) syntax
* test are executed by [Karma Test Runner](http://karma-runner.github.io/0.8/index.html) (integrated with the Grunt.js build)
* build supporting JS, CSS and AngularJS templates minification
* [Twitter's bootstrap](http://twitter.github.com/bootstrap/) with LESS templates processing integrated into the build

### Continious Integration

* [Travis-CI](https://travis-ci.org/) integration
