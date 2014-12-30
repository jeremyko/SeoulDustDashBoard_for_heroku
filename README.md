##Displaying current density of particulate matter(PM10) in seoul using AngularJS, Express.js for Heroku deployment


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

##### 3. npm start

##### Done!

