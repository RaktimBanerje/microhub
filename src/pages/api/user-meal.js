import pool from "../../config/db"

export default async function handler(req, res) {
    
    const data = req.body.data

    pool.query(
        "INSERT INTO user_meals (id, user, meals) VALUES (?, ?, ?)",
        [null, data.user, JSON.stringify(data.meals)],
        function (err, results, fields) {
            err? res.status(500).send() : res.status(200).send(results)
        }       
    )

}


