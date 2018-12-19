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

router.get('/detail', function (req, res) {
    var sql = "select * from news where id=" + req.query.id;
    connection.query(sql, function (err, rows, fields) {
        console.log(arguments)
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        res.send(JSON.stringify({
            code: '0',
            data: rows
        }))
    });
})
router.get('/list', function (req, res) {
    var res = res;
    var query = req.query; //执行SQL语句,这里是一条简单的MySQL查询语句
    var sql = "select count(*) as total from news; select * from news order by id desc limit " + query.pageSize*(query.currPage - 1) + ',' + query.pageSize + ';';

    connection.query(sql, function (err, results, fields) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        res.send(JSON.stringify({
            code: '0',
            data: results[1],
            pageInfo: {
                pageCount: Math.ceil(results[0][0]['total']/query.pageSize)
            }
        }))
    });
})


module.exports = router