[![Build Status](https://travis-ci.org/hirro/yo-worktajm.png?branch=master)](https://travis-ci.org/hirro/yo-worktajm)
[![Code Climate](https://codeclimate.com/github/hirro/yo-worktajm.png)](https://codeclimate.com/github/hirro/yo-worktajm)

# WorkTajm front end

***

## Purpose
	This is the front end for my hobby time reporting application.

	This is just for fun coding. Feel free to host this wherever you want as soon as it is functional. 

	Release plan TBD.

	Backend needs to be released to Github next time I do a major change in it.

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
