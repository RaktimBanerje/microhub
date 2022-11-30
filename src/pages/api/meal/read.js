import axios from "axios"
import pool from "../../../config/db"

export default async function handler(req, res) {
    
    pool.query(
        "SELECT * FROM meals",
        function(err, results, fields) {
            if(err) {
                res.status(500).send()
            }else {
                res.status(200).send(results)
            }
    })

}