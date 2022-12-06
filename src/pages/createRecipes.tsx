import React from "react";
import { AdminLayout } from "@layout";
import axios from "axios"
import Ingredient from "../components/Ingredient"
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Table,
    Card,
    Spinner,
} from 'react-bootstrap';

const Create = () => {

    const [foodName, setFoodName] = React.useState("")
    const [foods, setFoods] = React.useState([])
    const [ingredients, setIngredients] = React.useState([])
    const [unit, setUnit] = React.useState("g")
    const [recipe, setRecipe] = React.useState({
        name: "",
        ingredients: [],
        fat: 0,
        protein: 0, 
        calories: 0,
        carbohydrates: 0,
        proteinPercentage: 0,
        fatPercentage: 0,
        carbohydratesPercentage: 0,
    })
    const [isLoading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if(foodName != "") {
            setLoading(true)
            setIngredients([])
            
            axios.post("/api/foodsearch", {food: foodName})
            .then(response => {
                for(let i = 0; i < response.data.length; i++) {
                    response.data[i].amount = 1
                }
                console.log(response.data)
                setIngredients(response.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
        }
    }, [foodName])

    const calculate = () => {

        const updatedRecipe = {...recipe}
        updatedRecipe.fat= 0
        updatedRecipe.protein= 0
        updatedRecipe.calories= 0
        updatedRecipe.carbohydrates= 0
        updatedRecipe.proteinPercentage= 0
        updatedRecipe.fatPercentage= 0
        updatedRecipe.carbohydratesPercentage= 0

        
        recipe.ingredients.forEach(ingredient => {
            ingredient.details.nutrition.nutrients.forEach(nutrient => {

                let amount = 1

                if(Number(ingredient.amount) > 0) {
                    amount = Number(ingredient.amount)
                }

                if(nutrient.name.toLowerCase() == "fat")
                    updatedRecipe.fat += (amount * Number(nutrient.amount))
                if(nutrient.name.toLowerCase() == "protein")
                    updatedRecipe.protein += (amount * Number(nutrient.amount))
                if(nutrient.name.toLowerCase() == "calories")
                    updatedRecipe.calories += (amount * Number(nutrient.amount))
                if(nutrient.name.toLowerCase() == "carbohydrates")
                    updatedRecipe.carbohydrates += (amount * Number(nutrient.amount))
            })
    
            updatedRecipe.proteinPercentage += Number(ingredient.details.nutrition.caloricBreakdown.percentProtein)
            updatedRecipe.fatPercentage += Number(ingredient.details.nutrition.caloricBreakdown.percentFat)
            updatedRecipe.carbohydratesPercentage += Number(ingredient.details.nutrition.caloricBreakdown.percentCarbs)
        })

        console.log(updatedRecipe)
        setRecipe(updatedRecipe)
    }

    const addIngredient = (ingredient) => {
        ingredient.unit = unit
        console.log(ingredient)
        const updatedRecipe = {...recipe}
        updatedRecipe.ingredients.push(ingredient)
        calculate()
    }

    const saveRecipe = () => {
        if(recipe.name.trim() != "") {
            axios.post("/api/recipe/create", {recipe})
            .then(response => {
                if(response.status == 200) {
                    alert("New recipe created successfully")
                }
                else
                    alert("Oops! something went wrong")
            
            })
            .catch(err => alert("Oops! something went wrong"))
        }
        else {
            alert("Recipe must contain a name")
        }
    }

    return (
        <AdminLayout>
            <div className="row">
                <div className="col-md-12">
                        <Container fluid>
                            <Row>
                                <Col md="6">
                                    <h3 className="mb-4">Create Recipe</h3>
                                </Col>
                                <Col md="4">
                                    <Form.Control 
                                        type="text" 
                                        className='form-control' 
                                        onChange={event => setRecipe({...recipe, name: event.target.value})} 
                                        placeholder="Recipe name"
                                    />
                                </Col>
                                <Col md="2">
                                    <Button 
                                        variant="success"
                                        className="rounded-pill"
                                        onClick={saveRecipe}>Save Recipe</Button>
                                </Col>
                            </Row>
                            
                            <Card body style={{border: "none", marginTop: 10, marginBottom: 10}}>
                                <Row className="mb-2">
                                    <Col md="6"></Col>
                                    <Col md="6">
                                        <Ingredient data={foodName} setData={setFoodName} unit={unit} setUnit={setUnit} />
                                    </Col>
                                </Row>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Ingredient Name</th>
                                            <th>Amount</th>
                                            <th>Fat</th>
                                            <th>Protein</th>
                                            <th>Calories</th>
                                            <th>Carbohydrates</th>
                                            <th>Protein (%)</th>
                                            <th>Fat (%)</th>
                                            <th>Carbohydrates (%)</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ingredients.map((ingredient, index) => (
                                            <tr key={ingredient.id}>
                                                <td>{ingredient.name}</td>
                                                <td>1</td>
                                                <td>{ingredient.details.nutrition.nutrients.map(nutrient => nutrient.name.toLowerCase() == "fat" && `${nutrient.amount} ${unit}`)}</td>
                                                <td>{ingredient.details.nutrition.nutrients.map(nutrient => nutrient.name.toLowerCase() == "protein" && `${nutrient.amount} ${unit}`)}</td>
                                                <td>{ingredient.details.nutrition.nutrients.map(nutrient => nutrient.name.toLowerCase() == "calories" && `${nutrient.amount} kcal`)}</td>
                                                <td>{ingredient.details.nutrition.nutrients.map(nutrient => nutrient.name.toLowerCase() == "carbohydrates" && `${nutrient.amount} ${unit}`)}</td>
                                                <td>{ingredient.details.nutrition.caloricBreakdown.percentProtein}</td>
                                                <td>{ingredient.details.nutrition.caloricBreakdown.percentFat}</td>
                                                <td>{ingredient.details.nutrition.caloricBreakdown.percentCarbs}</td>
                                                <td>
                                                    <Button 
                                                        variant='outline-success' 
                                                        onClick={() => addIngredient(ingredient)}><i className="fa fa-plus" aria-hidden="true"></i></Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                {isLoading && (
                                    <Row className="justify-content-center align-items-center w-100">
                                        <Spinner animation="border" variant="success" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </Row>
                                )}
                            </Card>
            
                            <Card body style={{border: "none", marginTop: 10, marginBottom: 10}}>
                                <h5 className="my-3">Recipe Details (for 100g)</h5>
                            
                                <Table responsive striped hover className="mt-4">
                                    <thead>
                                        <tr>
                                            <th>Ingredient Name</th>
                                            <th>Amount</th>
                                            <th>Fat</th>
                                            <th>Protein</th>
                                            <th>Calories</th>
                                            <th>Carbohydrates</th>
                                            <th>Protein (%)</th>
                                            <th>Fat (%)</th>
                                            <th>Carbohydrates (%)</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {recipe.ingredients.map(((ingredient, index) => (
                                            <tr key={index}>
                                                <td>{ingredient.name}</td>
                                                <td>
                                                    <Form.Control 
                                                        type="text" 
                                                        className="form-control" 
                                                        style={{width: "100px"}} 
                                                        value={recipe.ingredients[index].amount} 
                                                        onChange={event => {
                                                            const data = {...recipe}
                                                            data.ingredients[index].amount = event.target.value
                                                            setRecipe(data)
                                                            calculate()
                                                        }}/>
                                                </td>
                                                <td>{ingredient.details.nutrition.nutrients.map(nutrient => nutrient.name.toLowerCase() == "fat" && `${(Number(ingredient.amount) * Number(nutrient.amount)) + ' ' + ingredient.unit}`)}</td>
                                                <td>{ingredient.details.nutrition.nutrients.map(nutrient => nutrient.name.toLowerCase() == "protein" && `${(Number(ingredient.amount) * Number(nutrient.amount)) + ' ' + ingredient.unit}`)}</td>
                                                <td>{ingredient.details.nutrition.nutrients.map(nutrient => nutrient.name.toLowerCase() == "calories" && `${(Number(ingredient.amount) * Number(nutrient.amount))} kcal`)}</td>
                                                <td>{ingredient.details.nutrition.nutrients.map(nutrient => nutrient.name.toLowerCase() == "carbohydrates" && `${(Number(ingredient.amount) * Number(nutrient.amount)) + ' ' + ingredient.unit}`)}</td>
                                                <td>{ingredient.details.nutrition.caloricBreakdown.percentProtein}</td>
                                                <td>{ingredient.details.nutrition.caloricBreakdown.percentFat}</td>
                                                <td>{ingredient.details.nutrition.caloricBreakdown.percentCarbs}</td>
                                            </tr>
                                        )))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={2}>Total</td>
                                            <td>{recipe.fat}</td>
                                            <td>{recipe.protein}</td>
                                            <td>{recipe.calories}</td>
                                            <td>{recipe.carbohydrates}</td>
                                            <td>{recipe.proteinPercentage}</td>
                                            <td>{recipe.fatPercentage}</td>
                                            <td>{recipe.carbohydratesPercentage}</td>
                                            <td>{' '}</td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </Card>
                        </Container>
                </div>
            </div>
        </AdminLayout>
    )

};

export default Create;
