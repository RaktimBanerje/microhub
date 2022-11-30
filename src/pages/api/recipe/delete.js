import pool from "../../../config/db"

export default async function handler(req, res) {
    
    pool.query(
        "DELETE FROM recipes WHERE id = ?",
        [req.query.id],
        function(err, results, fields) {
            if(err) {
                res.status(500).send()
            }else {
                res.status(200).send()
            }
    })

}