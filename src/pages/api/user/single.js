import connection from "../../../config/connection"
import pool from "../../../config/db"

export default async function handler(req, res) {
    if(req.method == "GET"){
        // try {
        //     const [rows, fields] = await connection.execute("SELECT * FROM users JOIN user_meals ON users.id = user_meals.user WHERE users.id = ?", [req.query.id])
        //     res.status(200).send(rows)
        // }
        // catch(err) {
        //     res.status(500).send()
        // }

        console.log(req.query.id)
        pool.query(
            `SELECT * FROM users JOIN user_meals ON users.id = user_meals.user WHERE users.id=?`,
            [req.query.id],
            function(err, results, fields) {
                if(err) {
                    console.log(err)
                    res.status(500).send()
                }else {
                    const user = {
                        id: results[0].id,
                        name: results[0].name,
                        email: results[0].email,
                        gender: results[0].gender,
                        dob: results[0].dob,
                        height: results[0].height,
                        weight: results[0].weight
                    }
    
                    user.meals = [] 
                    
                    results.forEach(data => {
                        data.meals.forEach(meal => user.meals.push(meal))
                    })
                    console.log(user)

                    res.status(200).send(user)
                }
        })
    }
    else {

        const data = req.body.data

        pool.query(
            "UPDATE user_meals SET meals=? WHERE id=?",
            [JSON.stringify(data), req.query.id],
            function (err, results, fields) {
                console.log(err)
                err? res.status(500).send() : res.status(200).send(results)
            }       
        )
    }
}