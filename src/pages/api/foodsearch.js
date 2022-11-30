import axios from "axios"

export default async function handler(req, res) {

    const foodName = req.body.food
    var response = await axios.get(`${process.env.API_URL}/food/ingredients/search?query=${foodName}&number=1&apiKey=${process.env.API_KEY}`)
    var foods = []

    if(response.status == 200) {
      for(let i = 0; i < response.data.results.length; i++) {
        let food = response.data.results[i]
        let res = await axios.get(`${process.env.API_URL}/food/ingredients/${food.id}/information?amount=1&apiKey=${process.env.API_KEY}`)
        if(res.status == 200) {
          food.details = res.data
          foods.push(food)
        }
      }
      return res.status(200).send(foods);
    }
    else {
      res.status(500).send()
    }
}


