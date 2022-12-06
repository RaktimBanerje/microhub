import React from "react";
import axios from "axios";
import type { NextPage } from "next";
import { AdminLayout } from "@layout";
import { Container, Row, Col, Card, Accordion, Table, Button } from "react-bootstrap"
import Image from "next/image"

const Home = ({recipes: RECIPES, meals: MEALS}) => {

  const [recipes, setRecipes] = React.useState([])
  const [meals, setMeals] = React.useState([])
  const [isLoading, setLoading] = React.useState(false)

  const loadData = async () => {
      setLoading(true)

      const response = await axios.get("/api/recipe/read")
      if(response.status == 200) {
          setRecipes(response.data)
      }else {
          alert("Oops! something went wrong")
      }

      const response1 = await axios.get("/api/meal/read")
      if(response1.status == 200) {
          setMeals(response1.data)
      }else {
          alert("Oops! something went wrong")
      }

      setLoading(false)
  }

  const handleRecipeDelete = (id) => {
      axios.delete(`/api/recipe/delete?id=${id}`)
      .then(response => {
          if(response.status == 200) {
            loadData()
          }
      })
  }

  const handleMealDelete = (id) => {
      axios.delete(`/api/meal/delete?id=${id}`)
      .then(response => {
          if(response.status == 200) {
            loadData()
          }
      })
  }

  React.useEffect(() => {
    setRecipes(RECIPES)
    setMeals(MEALS)
  }, [])

 function Recipe (recipe) {
    return (
      <Card body style={{border: "none", marginTop: 10, marginBottom: 10}}>
          <Row>
            <Col><h5>{recipe.name}</h5></Col>
            <Col className="text-end">
              <Button variant="outline-dark" size="sm" onClick={() => handleRecipeDelete(recipe.id)}>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </Button>
            </Col>
          </Row>
          <Accordion defaultActiveKey="0">
            {recipe.ingredients.map((ingredient, index) => (
              <Accordion.Item eventKey={`${recipe.id}-${index}`} style={{borderLeft: 0, borderTop: 0, borderRight: 0}}>
                <Accordion.Header>{ingredient.name} ({ingredient.amount}{ingredient.unit})</Accordion.Header>
                <Accordion.Body>
                  <Row className="justify-content-between align-items-center">
                    <Col>
                      <h5>Macros</h5>
                    </Col>
                    <Col className="text-end">
                      <Image src="/assets/img/macros.png" height="50" width="50" />
                    </Col>
                  </Row>

                  <Table responsive hover>
                    <tbody>
                      <tr>
                        <td>Fat</td>
                        <td className="text-end">{ingredient.details.nutrition.nutrients.map(nutrient => nutrient.name.toLowerCase() == "fat" && `${(Number(ingredient.amount) * Number(nutrient.amount)) + ' ' + ingredient.unit}`)}</td>
                      </tr>
                      <tr>
                        <td>Protein</td>
                        <td className="text-end">{ingredient.details.nutrition.nutrients.map(nutrient => nutrient.name.toLowerCase() == "protein" && `${(Number(ingredient.amount) * Number(nutrient.amount)) + ' ' + ingredient.unit}`)}</td>
                      </tr>
                      <tr>
                        <td>Calories</td>
                        <td className="text-end">{ingredient.details.nutrition.nutrients.map(nutrient => nutrient.name.toLowerCase() == "calories" && `${(Number(ingredient.amount) * Number(nutrient.amount)) + ' ' + ingredient.unit}`)}</td>
                      </tr>
                      <tr>
                        <td>Carbohydrates</td>
                        <td className="text-end">{ingredient.details.nutrition.nutrients.map(nutrient => nutrient.name.toLowerCase() == "carbohydrates" && `${(Number(ingredient.amount) * Number(nutrient.amount)) + ' ' + ingredient.unit}`)}</td>
                      </tr>
                      <tr>
                        <td>Protein (%)</td>
                        <td className="text-end">{ingredient.details.nutrition.caloricBreakdown.percentProtein}</td>
                      </tr>
                      <tr>
                        <td>Fat (%)</td>
                        <td className="text-end">{ingredient.details.nutrition.caloricBreakdown.percentFat}</td>
                      </tr>
                      <tr>
                        <td>Carbohydrates (%)</td>
                        <td className="text-end">{ingredient.details.nutrition.caloricBreakdown.percentCarbs}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
      </Card>
    )
 }

 function Meal (meal) {
    return (
      <Card body style={{border: "none", marginTop: 10, marginBottom: 10}}>
        <Row>
          <Col><h5>{meal.name}</h5></Col>
          <Col className="text-end">
            <Button variant="outline-dark" size="sm" onClick={() => handleMealDelete(meal.id)}>
              <i className="fa fa-trash" aria-hidden="true"></i>
            </Button>
          </Col>
        </Row>
        <Accordion defaultActiveKey="0">
          {meal.recipes.map((recipe, index) => (
            <Accordion.Item eventKey={`${meal.id}-${index}`} style={{borderLeft: 0, borderTop: 0, borderRight: 0}}>
              <Accordion.Header>{recipe.name} ({recipe.amount}g)</Accordion.Header>
              <Accordion.Body>
                <Row className="justify-content-between align-items-center">
                  <Col>
                    <h5>Macros</h5>
                  </Col>
                  <Col className="text-end">
                    <Image src="/assets/img/macros.png" height="50" width="50" />
                  </Col>
                </Row>

                <Table responsive hover>
                  <tbody>
                    <tr>
                      <td>Fat</td>
                      <td className="text-end">{Number(recipe.fat).toFixed(2)} g</td>
                    </tr>
                    <tr>
                      <td>Protein</td>
                      <td className="text-end">{Number(recipe.protein).toFixed(2)} g</td>
                    </tr>
                    <tr>
                      <td>Calories</td>
                      <td className="text-end">{Number(recipe.calories).toFixed(2)} g</td>
                    </tr>
                    <tr>
                      <td>Carbohydrates</td>
                      <td className="text-end">{Number(recipe.carbohydrates).toFixed(2)} g</td>
                    </tr>
                    <tr>
                      <td>Protein (%)</td>
                      <td className="text-end">{Number(recipe.proteinPercentage).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Fat (%)</td>
                      <td className="text-end">{Number(recipe.fatPercentage).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Carbohydrates (%)</td>
                      <td className="text-end">{Number(recipe.carbohydratesPercentage).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card>
    )
 }
  
  return (
    <AdminLayout>
      <Container fluid>
        <Row>
          <h3>Meals</h3>
          {meals.length == 0 ? <h4 className="text-center">There are no meal plans</h4> : (meals.map((meal, index) => (
            <Col md="4">
              <Meal id={`recipe-${index}`} {...meal} />
            </Col>
          )))}
        </Row>

        <Row className="mt-5">
          <h3>Recipes</h3>
          {recipes.length == 0 ? <h4 className="text-center">There are no recipes</h4> : (recipes.map((recipe, index) => (
            <Col md="4">
              <Recipe id={`recipe-${index}`} {...recipe} />
            </Col>
          )))}
        </Row>
      </Container>
    </AdminLayout>
  )
};

export default Home;


export async function getStaticProps() {

  let recipes = []
  let meals = []

  let response = await axios.get(`${process.env.URL}/api/recipe/read`)
  recipes = [...response.data]

  let response1 = await axios.get(`${process.env.URL}/api/meal/read`)
  meals = [...response1.data]

  return {
      props: {recipes, meals},
      revalidate: 10
  }
}
