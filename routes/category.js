const express = require('express');
var router = express.Router();
const connection = require('./connection');//导入mysq配置文件


connection.connect(function (err) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('[connection connect] succeed!'); //如果连接成功 控制台输出 success 了
});


router.get('/all', function (req, res) {
    var res = res;
    var req = req; //执行SQL语句,这里是一条简单的MySQL查询语句
    var sql = "select * from category";
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        res.send(rows) //这里在页面上输出数据
    });
})


module.exports = router