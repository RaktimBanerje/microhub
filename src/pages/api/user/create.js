import pool from "../../../config/db"

export default async function handler(req, res) {

    const user = req.body.user

    pool.query(
        "INSERT INTO users (id, name, email, gender, dob, height, weight) VALUES (?, ?, ?, ?, ?, ?, ?)", 
        [null, user.name, user.email, user.gender, user.dob, user.height, user.weight], 
        function(err, results, fields) {
            if(err) {
                res.status(500).send()
            }else {
                res.revalidate("/users")
                .then(console.log)
                .catch(console.log)
                
                res.status(200).send()
            }
    })

}