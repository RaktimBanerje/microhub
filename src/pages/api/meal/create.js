import pool from "../../../config/db"

export default async function handler(req, res) {
    
    const meal =  req.body.meal
    
    pool.query(
        "INSERT INTO meals (id, name, recipes, fat, protein, calories, carbohydrates, proteinPercentage, fatPercentage, carbohydratesPercentage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [null, meal.name, JSON.stringify(meal.recipes), meal.fat, meal.protein, meal.calories, meal.carbohydrates, meal.proteinPercentage, meal.fatPercentage, meal.carbohydratesPercentage], 
        function(err, results, fields) {
            if(err) {
                res.status(500).send()
            }else {
                res.status(200).send()
            }
    })

}