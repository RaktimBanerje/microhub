import React from "react"
import axios from "axios"
import type { NextPage } from "next";
import { AdminLayout } from "@layout";
import {
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  ProgressBar,
  Container,
  Row,
  Col,
  Table
} from "react-bootstrap";
import { useEffect, useState } from "react";

const Plans: NextPage = () => {

  const [meal, setMeal]  = React.useState({
    name: "",
    recipes: [],
    fat: 0,
    protein: 0,
    calories: 0,
    carbohydrates: 0,
    proteinPercentage: 0,
    fatPercentage: 0,
    carbohydratesPercentage: 0
})

const [recipes, setRecipes] = React.useState([])

const mealRecipe = {
    id: "",
    amount: 1,
    fat: 0,
    protein: 0,
    calories: 0,
    carbohydrates: 0,
    proteinPercentage: 0,
    fatPercentage: 0,
    carbohydratesPercentage: 0
}

React.useEffect(() => {
    axios.get("/api/recipe/read")
    .then(response => {
        if(response.status == 200) {
            setRecipes(response.data)
        }else {
            alert("Oops! something went wrong")
        }
    })
    .catch(err => console.log(err))
}, [])

const calculate = (event, index) => {
    const data = {...meal}

    if(event) {
        data.recipes[index].amount = event.target.value
    }

    data.fat = 0,
    data.protein = 0,
    data.calories = 0,
    data.carbohydrates = 0,
    data.proteinPercentage = 0,
    data.fatPercentage = 0,
    data.carbohydratesPercentage = 0

    for(let i = 0 ; i < data.recipes.length ; i++){
        if(data.recipes[i].amount == undefined) {
            data.recipes[i].amount = 1
        }   
        data.fat += Number(data.recipes[i].amount) * Number(data.recipes[i].fat),
        data.protein += Number(meal.recipes[i].amount) * Number(data.recipes[i].protein),
        data.calories += Number(data.recipes[i].amount) * Number(data.recipes[i].calories),
        data.carbohydrates += Number(data.recipes[i].amount) * Number(data.recipes[i].carbohydrates),

        data.proteinPercentage += Number(data.recipes[i].proteinPercentage),
        data.fatPercentage += Number(data.recipes[i].fatPercentage),
        data.carbohydratesPercentage += Number(data.recipes[i].carbohydratesPercentage)
    }

    setMeal(data)
}

const saveMeal = () => {
    console.log(meal)
    if(meal.name.trim() != ""){
        axios.post("/api/meal/create", {meal})
        .then(response => response.status == 200 ? alert("New meal created successfully") : alert("Oops! something went wrong"))
        .catch(err => {
            console.log(err)
            alert("Oops! something went wrong")
        })
    }
    else {
        alert("Meal must contain a name")
    }
}

  return (
    <AdminLayout>
      <h3>Create Meal</h3>
      <Card body>
        <Row>
          <Col md="5"></Col>
          <Col md="5">
            <input 
              type="text" 
              className='form-control' 
              onChange={(event) => setMeal(meal => ({...meal, name: event.target.value}))} 
              placeholder="Meal name"
            />
          </Col>
          <Col md="2">
            <button className='btn btn-outline-success' onClick={saveMeal}>Save Meal</button>
          </Col>
        </Row>
        <Table responsive striped hover className="mt-4">
            <thead>
                <tr>
                    <th>Recipe Name</th>
                    <th>Amount (g)</th>
                    <th>Fat (g)</th>
                    <th>Protein (g)</th>
                    <th>Calories (g)</th>
                    <th>Carbohydrates (g)</th>
                    <th>Protein (%)</th>
                    <th>Fat (%)</th>
                    <th>Carbohydrates (%)</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
              {meal.recipes.map((recipe, index) => (
                <tr key={index}>
                  <td>
                      <select className='form-control' onChange={event => {
                          const data = {...meal}
                          data.recipes[index] = JSON.parse(event.target.value)
                          setMeal(data)
                          calculate(undefined, undefined)
                      }}>
                          <option value="">--Select--</option>
                          {recipes.map((recipe, index) => <option key={index} value={`${JSON.stringify(recipe)}`}>{recipe.name}</option>)}
                      </select>
                  </td>
                  <td>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={`${recipe.amount || 1}`} onChange={(event) => calculate(event, index)}
                        style={{width: '100px'}}
                      />
                  </td>
                  <td>{recipe.fat}</td>
                  <td>{recipe.protein}</td>
                  <td>{recipe.calories}</td>
                  <td>{recipe.carbohydrates}</td>
                  <td>{recipe.proteinPercentage}</td>
                  <td>{recipe.fatPercentage}</td>
                  <td>{recipe.carbohydratesPercentage}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={2}>Total</td>
                    <td>{meal.fat}</td>
                    <td>{meal.protein}</td>
                    <td>{meal.calories}</td>
                    <td>{meal.carbohydrates}</td>
                    <td>{meal.proteinPercentage}</td>
                    <td>{meal.fatPercentage}</td>
                    <td>{meal.carbohydratesPercentage}</td>
                    <td>{' '}</td>
                </tr>
            </tfoot>
        </Table>
        <button className='btn btn-outline-success w-100' onClick={() => {
            setMeal(meal => ({...meal, recipes: [...meal.recipes, mealRecipe]}))
        }}>Add Recipe</button>
      </Card>  
    </AdminLayout>
  )
};

export default Plans;
