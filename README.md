# README #

#Proč java-devstack#

Java programátoři berou javascript většinou trochu jinak než javascript programátoři. Přesto musí často spolupracovat.
Javascript programátor je zvyklý používat nástroje, o kterých běžný java proghramátor ani neví že existují. 
Java programátor zase očekává, že k sestavení aplikace pro nasazení mu stačí java a maven.

Oba by si měli přijít na své. Tento počin proto pojednává o začlenění gulp devstacku do maven projektu.

##Jak to funguje##

Javascriptová SPA aplikace je do maven buildu začleněna jako samostatný modul *java-devstack-frontend*

Devstack použitý zde je postaven na projektu od @MilanLempera(zveřejněn bude brzy) z důvodu dobré práce se zdrojovými soubory, šablonami a podporou proxy-middleware. Samozřejmě je možné použít jakýkoli vlastní.

Vrámci buildování java aplikace je pak stažen nodejs a npm, spuštěn gulp build, který spustí unit testy a aplikaci sbuilduje.

Poté jsou vytvořené assety začleněny do vzniklého war archivu, které může být nasazeno na samostatný server, případně spuštěno samo o sobě.

Vrámci volitelného profilu se mohou spustit také integrační testy. 

##Java programátor##

Z pohledu java programátora je javascript začleněn jako samostatný modul *java-devstack-frontend* a nemusí se o něj starat, sbuildované assety se objeví v target/classes/static.

Nemusí mít nainstalováno nic jiného než maven. Jediné co stačí udělat je:


```
mvn clean install
```

případně pro spuštění s integračními testy:


```
mvn clean install -Pintegration-test
```

Výsledkem buildu modulu *java-devstack-webapp* je war, které může být jak nasazeno, tak spuštěno pomocí

```
mvn jetty:run-war
```

Případně samostatně 

```
java -jar target/java-devstack-webapp-<verze>.war
```

Aplikace může být spuštěna také pomocí start class *cz.angular.Application*

##Javascript programátor##

Z pohledu javascript vývojáře se v modulu *java-devstack-frontend* src/main/frontend nachází běžný gulp devstack.

```
npm install

gulp devel

npm test
npm run protractor
```

###Komunikace s backendem###
Je možné použít fiktivní json api v src/api, případně se připojovat rovnou ke spuštěné backend aplikaci.
Toto je možné nastavit v *config.js* 
 
```
proxy: false
```

```
proxy: {
 routePath: '/src/api',
 destinationUrl: 'http://localhost:8080/api'
}
```

V kódu aplikace se pak stačí odkazovat jen na api
 
```
$resource('api/user/:id', {id: '@id'});
```

###Spuštění java aplikace###

Aplikaci je možné spustit lokálně stejně jako v případě java programátora, spuštěním maven buildu v kořenovém adresáří. 

```
mvn clean install
mvn jetty:run-war
```


Je zde ale také možnost použít zbuildované war, které spustí jen pomocí javy

```
java -jar java-devstack-webapp-<version>.war
```


##Použité nástroje bez kterých by to nešlo##
 - spring-boot
 - maven
 - gulp
 - frontend-maven-plugin
 - proxy-middleware


##Prezentace##
11.11.2014 - Java and javascript consistency na BrnoJS (materiály: http://www.angular.cz/brnojs/)

##Licence##
Tento projekt nebo know-how můžete používat kdekoli, včetně komerčních projektů. 
Jediné co po Vás za to budeme chtít, abyste nám o tom dali vědět, ať víme, komu jsme pomohli.
