[![Build Status](https://travis-ci.org/hirro/yo-worktajm.png?branch=master)](https://travis-ci.org/hirro/yo-worktajm)
[![Code Climate](https://codeclimate.com/github/hirro/yo-worktajm.png)](https://codeclimate.com/github/hirro/yo-worktajm)
[![Coverage Status](https://coveralls.io/repos/hirro/yo-worktajm/badge.png?branch=master)](https://coveralls.io/r/hirro/yo-worktajm?branch=master)
[![Dependency Status](https://gemnasium.com/hirro/yo-worktajm.png)](https://gemnasium.com/hirro/yo-worktajm)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/hirro/yo-worktajm/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[ ![Codeship Status for hirro/yo-worktajm](https://www.codeship.io/projects/295e56d0-3115-0131-77a2-4ab24c68f59c/status?branch=master)](https://www.codeship.io/projects/9576)

# WorkTajm
Hosted at: http://www.worktajm.com

***

## Work in progress
Version 1.0 is not yet scheduled.

## Description
Worktajm is a simple time reporting tool that helps you keep track of your work time.

The application is ideal for small contractors with features as automatic invoice generation.

The application is free of charge with the exception of the iPhone and Android clients.
If you like it send some money to charity.


## Description

This application is divided into two git projects, a backend and a frontend.

The backend server is written in Java and distributed as a war file.

The front end is a AngularJS single page application.

	
## Backend
Git: [be-worktajm](https://github.com/hirro/be-worktajm)

The backend is written mainly in Java using the bleeding edge components.

### System requirements
* Tomcat 7.42+, may be moved to 8 soon.
* JRE 7
* Mysql/MariaDB

### Stack
* Java 7/8
* Maven 3
* Jackson for the REST API ( [API version 1](https://github.com/hirro/be-worktajm/blob/master/api.md) )
* Spring Framework 3 (soon 4)
 * [Spring](www.spring.org)  Spring Data (JPA)
 * [Spring](www.spring.org)  Spring Security
* Liquibase for database change management.
* Lombok (no longer used)

## Front end
Git: [yo-worktajm](https://github.com/hirro/yo-worktajm)

### System requirements

### Stack
* [Yeoman 1.0](http://yeoman.io/)
 * [Grunt.js](http://gruntjs.com/)
 * bower
 * angular generators
* [AngularJS 1.2.7](http://www.angularjs.org/) as foundation.
* [Bootstrap 3](http://getbootstrap.com/) as default stylesheet.
* [Restangular](https://github.com/mgonto/restangular) for communicating with backend using REST.
* [toastr](https://github.com/CodeSeven/toastr) to send the user notifications in Growl like fashion.
* [Jasmine](http://pivotal.github.com/jasmine/) for wrting unit tests
* [Karma Test Runner](http://karma-runner.github.io/0.8/index.html) (integrated with the Grunt.js build)

### Continious Integration

* [Travis-CI](https://travis-ci.org/) 




