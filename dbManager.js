/**
 * Created by kojunghyun on 14. 12. 16..
 */
"use strict";


function dbManager() {
    //this is singleton
    //console.log("dbManager invoked!!"); //debug

    //var mysql   = require('mysql');
    var pg = require('pg');
    var instance;
    var connection ;

    dbManager = function dbManager() {
        //console.log("*** dbManager / singleton!!! "); //debug
        return instance;
    };

    //console.log("dbManager : dbManager.prototype = this; "); //debug

    dbManager.prototype = this;

    instance = new dbManager();

    instance.constructor = dbManager;

    instance.bDisconnected= false;
    //methods
    //-----------------------------------------------------
    instance.connectDB = function() {
        console.log("1. dbManager / connectDB invoked!!"); //debug

        console.log("process.env.DATABASE_URL =", process.env.DATABASE_URL ); //debug
        pg.connect(process.env.DATABASE_URL, function(err, client) {
            if(!err){
                connection = client;
            }
        });

    };


    //----------------------------------------------------- multiple area
    instance.selectDustDataByAreaArrayAndDateRange= function( dustAreaArray, dustDateFrom, dustDateTo, onError,onSuccess ) {

        var rows = [];
        //console.log("selectDustDataByAreaArrayAndDateRange invoked=",dustAreaArray.length);
        var areaCondition ='in (';
        for(var i = 0; i<dustAreaArray.length;i++){
            areaCondition += "'"+dustAreaArray[i].area+"'";
            if(i+1!=dustAreaArray.length){
                areaCondition +=','
            }
        }
        areaCondition +=')';

        var queryStr = "select date, area, pm10, pm25, level, detMat, detMatIndex from dust_data where date between '"
            + dustDateFrom + "' and '"
            + dustDateTo + "' and area "+areaCondition
            + " order by date";

        //console.log("queryStr=",queryStr);

        /*
        var query = connection.query(queryStr,function(err, result) {
            if(err){
                console.log("Query Error!!! : ", error);
                onSuccess(error);
            }

            //console.log("result.rows=",result.rows);
            onSuccess(result.rows);
        });
        */


        var query = connection.query(queryStr);

        query.on('row', function(row) {
            rows.push(row);
        });

        query.on('error', function(error) {
            console.log("Query Error!!! : ", error);
            onError(error);
        });

        query.on('end', function(result) {
            //console.log(result.rowCount + ' rows were received');
            //console.log(rows.length + ' rows were received');
            onSuccess(rows);
        });

    };

    //-----------------------------------------------------
    instance.insertDB = function( dustData ){

        var queryStr = "select count(1) as count from dust_data where date='"+dustData.date+"' and area='"+ dustData.area+"'" ;
        //console.log(queryStr);

        connection.query(queryStr, function(err, result) {

            if(err){
                console.log(err);
                throw err;
            }

            if(result.rows[0] != undefined && result.rows[0].count == 1){
                //console.log('already exists!');
                return ;
            }

            //console.log("dbManager / insertDB !!"); //debug

            queryStr = "INSERT INTO dust_data(date,area,pm10,pm25,level,detMat,detMatIndex) values('"+
                dustData.date+"','" +
                dustData.area+"','" +
                dustData.pm10 +"','" +
                dustData.pm25 +"','" +
                dustData.level +"','" +
                dustData.detMat +"','" +
                dustData.detMatIndex +"')";

            //console.log("queryStr==>",queryStr); //debug
            connection.query(queryStr, function(err, result) {
                if (err) {
                    console.log(err);
                    throw err;
                }
            });

        });
    };

    instance.removeOldData = function () {
        var queryStr = "delete from dust_data where date < to_char(current_date-15, 'yyyymmdd')";
        console.log("delete old data ==>",queryStr); //debug

        connection.query(queryStr, function(err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
        });
    };

    //-----------------------------------------------------
    instance.disConnectDB = function() {
        console.log("dbManager / disConnectDB  invoked!!"); //debug
        if(false==instance.bDisconnected){
            console.log("dbManager / connection.end()"); //debug
            //connection.end();
            pg.end();
            instance.bDisconnected= true;
        }else{
            console.log("dbManager / already disconnected!!"); //debug
        }
    };


    //-----------------------------------------------------
    //connect!
    instance.connectDB();
    return instance;
}

module.exports = new dbManager();


