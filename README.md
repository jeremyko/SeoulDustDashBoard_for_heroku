##Displaying current density of particulate matter(PM10) in seoul using AngularJS, Express.js

![image](https://github.com/jeremyko/SeoulDustDashBoard/blob/master/scrCap1.png)

![image](https://github.com/jeremyko/SeoulDustDashBoard/blob/master/scrCap2.png)

###HowTo
  
##### 1. Need to create below table on your Postgres 
    CREATE TABLE dust_data
    (
      date character(10) NOT NULL,
      area character(20) NOT NULL,
      pm10 integer,
      pm25 integer,
      level character(20),
      detMat character(20),
      detMatIndex integer,
      CONSTRAINT pk_dust_data PRIMARY KEY (date, area)
    )
        
##### 2. npm install
if you find below message, just select 2.<br> 
This is caused by angular-bootstrap which only supports 1.2.x AngularJS.<br>
Note that this app only works under AngularJS 1.3.0 or above.

    Unable to find a suitable version for angular, please choose one:
    1) angular#>=1 <1.3.0 which resolved to 1.2.28 and is required by angular-bootstrap#0.12.0 
    2) angular#>=1.3.0 which resolved to 1.3.8 and is required by SeoulDustDashBoard 
    3) angular#~1.x which resolved to 1.3.8 and is required by tc-angular-chartjs#1.0.9 
    4) angular#1.3.8 which resolved to 1.3.8 and is required by angular-route#1.3.8Prefix the choice with ! to persist it to bower.json
    
    ? Answer:: 2

##### 3. npm start

##### Done!

