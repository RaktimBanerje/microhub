import pool from "../../../config/db"

export default async function handler(req, res) {
    
    pool.query(
        "SELECT * FROM recipes",
        function(err, results, fields) {
            if(err) {
                res.status(500).send()
            }else {
                res.status(200).send(results)
            }
    })

}