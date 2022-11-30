import pool from "../../config/db"

export default async function handler (req, res) {

    const keyword = req.body.keyword

    if(req.method == "POST") {
        pool.query(
            `SELECT * FROM keywords`,
            function(err, results, fields) {
               // results contains rows returned by server
               let flag = false
               results.forEach(data => {
                if(data.keyword == keyword) {
                    flag = true
                }
               })
               
               if(!flag) {
                pool.query(
                    `INSERT INTO keywords (keyword) VALUES (?)`, [keyword],
                    function(err, results, fields) {
                      res.status(200).send() // fields contains extra meta data about results, if available
                    }
                );
               }
               res.status(200).send(results) // fields contains extra meta data about results, if available
            }
        );
    }
    else {
        pool.query(
            `SELECT * FROM keywords`,
            function(err, results, fields) {
               // results contains rows returned by server
              res.status(200).send(results) // fields contains extra meta data about results, if available
            }
          );
    }
}