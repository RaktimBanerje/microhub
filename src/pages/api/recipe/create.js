import pool from "../../../config/db"

export default async function handler(req, res) {
    
    const recipe =  req.body.recipe
    
    pool.query(
        "INSERT INTO recipes (id, name, ingredients, fat, protein, calories, carbohydrates, proteinPercentage, fatPercentage, carbohydratesPercentage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [null, recipe.name, JSON.stringify(recipe.ingredients), recipe.fat, recipe.protein, recipe.calories, recipe.carbohydrates, recipe.proteinPercentage, recipe.fatPercentage, recipe.carbohydratesPercentage], 
        function(err, results, fields) {
            if(err) {
                res.status(500).send()
            }else {
                res.status(200).send()
            }
    })

}