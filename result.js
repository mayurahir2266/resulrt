var  mysql = require('mysql');

var express = require('express');

var app = express();

var connection  = mysql.createConnection({
     host     : 'localhost',
     user     : 'root',
     password : '',
     database : 'student_result'
})

connection.connect()

app.get('/result/:name/:sub_1/:sub_2/:sub_3/:sub_4/:sub_5', function(req, res){
     var name = req.params.name;
     var sub_1 = parseInt(req.params.sub_1);
     var sub_2 = parseInt(req.params.sub_2);
     var sub_3 = parseInt(req.params.sub_3);
     var sub_4 = parseInt(req.params.sub_4);
     var sub_5 = parseInt(req.params.sub_5);
     var total = parseInt(sub_1) + parseInt(sub_2) + parseInt(sub_3) + parseInt(sub_4) + parseInt(sub_5);
     var average = total / 5;
     var cnt = 0;
     var result = "";

     if(sub_1 < 35){
          cnt++;
     }
     if(sub_2 < 35){
          cnt++;
     }
     if(sub_3 < 35){
          cnt++;
     }
     if(sub_4 < 35){
          cnt++;
     }
     if(sub_5 < 35){
          cnt++;
     }
     if(cnt ==  0){
          result = "pass";
     }
     else if(cnt < 3){
          result = "atkt";
     }
     else{
          result = "fail";
     }
     
     var insert_query = "INSERT INTO result (name,sub_1,sub_2,sub_3,sub_4,sub_5, total , avarage,result) VALUES ('" + name + "','" + sub_1 + "','" + sub_2 + "','" + sub_3 + "','" + sub_4 + "','" + sub_5 + "', '"+total+"', '"+average+"', '"+result+"')";

     connection.query(insert_query, function(err, result, fields) {
          if (err) throw err;
          res.redirect('/result')
     })
});

app.get('/result', function(req, res){
     // var select_query = "SELECT name,sub_1,sub_2,sub_3,sub_4,sub_5, (sub_1+sub_2+sub_3+sub_4+sub_5) as total_mark, (sub_1+sub_2+sub_3+sub_4+sub_5)/5 as average, CASE WHEN sub_1 > 30 AND sub_2 > 30 AND sub_3 > 30 AND sub_4 > 30 AND sub_5 > 30 THEN 'pass' WHEN sub_1 < 30 AND sub_2 < 30 AND sub_3 < 30 AND sub_4 < 30 AND sub_5 < 30 THEN 'fail' ELSE 'atkt' END AS result  FROM result";

     var select_query = "SELECT * FROM `result`";
     
     connection.query(select_query, function(err, result, fields) {
          if (err) throw err;
          res.send(result)
     })
});

app.get("/RESULT/:id", function(req, res){
     var id = req.params.id;
     
     var select_one = " SELECT * FROM `result` WHERE id = " +id ;
     connection.query(select_one, function(err, result, fields){
          if (err) throw err;
          res.send(result);
     })
});

app.get("/result/result/:result", function(req, res){
     var result = req.params.result;

     var search_result = " SELECT * FROM `result` WHERE `result` =  ('"+result+"')" ;

     connection.query(search_result, function(err, result, fields){
          if (err) throw err;
          res.send(result);
     })
})

app.get("/result/top/top3", function(req, res){

     var search_top3 = "SELECT * FROM `result` ORDER BY `total` DESC LIMIT 3";

     connection.query(search_top3, function(err, result, fields){
          if (err) throw err;
          res.send(result);
     })
})

app.get("/result/update/:id/:name/:sub_1/:sub_2/:sub_3/:sub_4/:sub_5", function(req, res){

     var id = req.params.id;
     var sub_1 = parseInt(req.params.sub_1);
     var sub_2 = parseInt(req.params.sub_2);
     var sub_3 = parseInt(req.params.sub_3);
     var sub_4 = parseInt(req.params.sub_4);
     var sub_5 = parseInt(req.params.sub_5);
     var total = parseInt(sub_1) + parseInt(sub_2) + parseInt(sub_3) + parseInt(sub_4) + parseInt(sub_5);
     var average = total / 5;
     var cnt = 0;
     var result="";

     if(sub_1 < 35){
          cnt++;
     }
     if(sub_2 < 35){
          cnt++;
     }
     if(sub_3 < 35){
          cnt++;
     }
     if(sub_4 < 35){
          cnt++;
     }
     if(sub_5 < 35){
          cnt++;
     }
     if(cnt ==  0){
          result = "pass";
     }
     else if(cnt < 3){
          result = "atkt";
     }
     else{
          result = "fail";
     }
     
     var update_query = "UPDATE `result` SET `sub_1` = '" + sub_1 + "', `sub_2` = '" + sub_2 + "', `sub_3` = '" + sub_3 + "', `sub_4` = '" + sub_4 + "', `sub_5` = '" + sub_5 + "', `total` = '" + total + "', `avarage` = '" + average + "', `result` = '" + result + "' WHERE `id` = '"+ id + "'";  

     connection.query(update_query, function(err, result, fields) {
          if (err) throw err;
          res.redirect('/result')
     })
})

app.listen(8000);