# Java-devstack #

[![Build Status](https://travis-ci.org/Angular-cz/java-devstack.svg?branch=master)](https://travis-ci.org/Angular-cz/java-devstack)


[Czech version of readme](README_CZ.md)
#Why Java-devstack#

I have learnt that in Java based companies Java developers doesn't like javascript programming too much and ussualy don't want to work like Javascript programmers.
But they still have to cooperate with each other. Its like tale about two kind of programmers - Java / Javascript

Javascript programmer wants to use modern tools, which Java develper doesn't even know.
Java developer expect application build will be smooth with just java and maven without any additional tools.

Both of them should be satisfied during their development.

That is why this proof of concept show simple integration of gulp devstack into maven project.

##How does it work##

Javascript SPA is incorporated into maven built process as independent module *java-devstack-frontend*

For building frontend application older version of devsteck created @MilanLempera(I hope it will be opensourced soon) is utilized. You can use any kind of devstack your javascript developers are used to.
During maven build process, nodejs and npm are downloaded, gulp build is processed including the tests.

After that recently created static assets are put into created war archive which can be deployed on server or run independently thenks to embeded jetty.
By using optional build profile is also possiblet to run end to end tests.

##Java developer##

Java developer doesn't want to know about javascript application, so application is packed into the *java-devstack-frontend* and developer doesn't need to care about it, built static assets will appear in target/classes/static.
He doesn't needo to install anything except maven. Only thing to do is:


```
mvn clean install
```

Or running with end to end tests:


```
mvn clean install -Pintegration-test
```

Result of *java-devstack-webapp* module build is war, which can be run using:

```
mvn jetty:run-war
```

Or with embedded jetty.

```
java -jar target/java-devstack-webapp-<version>.war
```

Surely java application can be run using start class *cz.angular.Application*

##Javascript developer##

From Javascript developer point of view there is ordinary gulp devstack in directory *src/main/frontend* of module *java-devstack-frontend*.

*Usage:*

```
npm install

gulp devel
```
Application is then running at: http://localhost:8282/src/

*Running tests*

```
npm test
npm run protractor
```

###Communication with backendem###

Its possible to use fake api in src/api or connect dirrectly to the running backend application.
It can be configured in *config.js* in part *proxy*

Turning off proxy:

```
proxy: false
```

Connecting proxy to the localhost:8080/api

```
proxy: {
 routePath: '/src/api',
 destinationUrl: 'http://localhost:8080/api'
}
```

Thanks to this proxy it is possible to have same path to endpoints for development and built application - */api/*

```
$resource('api/user/:id', {id: '@id'});
```

###Running java application###

Application can be run locally same as java developer do by running maven task in root directory.



```
mvn clean install
mvn jetty:run-war
```


It is also possible to use uilt war and run it with java command.


```
java -jar java-devstack-webapp-<version>.war
```


##Tools used in this proof of concept##
 - spring-boot
 - maven
 - gulp
 - frontend-maven-plugin
 - proxy-middleware

##Talk in czech##
11.11.2014 - Java and javascript consistency na BrnoJS (materials: http://www.angular.cz/brnojs/)

##Licence##
This project and know-how can be used everywhere including comercial projects. Only thing we want from you is let us know and use you as reference.
