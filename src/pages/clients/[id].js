import React from "react";
import { AdminLayout } from "@layout";
import { useRouter } from 'next/router'
import axios from 'axios'
import {
  Button,
  Card,
  Container,
  Nav,
  Navbar,
  Table,
  Row,
  Col,
  Spinner
} from "react-bootstrap";

function MealCard ({meal}) {
    return (
        <Card body>
            <h3>{meal.name}</h3>
        </Card>
    )
}

const Client = () => {
  
  const router = useRouter()
    
  const [user, setUser] = React.useState(null)
  const [isLoading, setLoading] = React.useState(false)
  
  React.useEffect(() => {
      setLoading(true)

      axios.get(`/api/user/single?id=${router.query.id}`)
      .then(response => {
          console.log(response.data)
          setLoading(false)
          response.status == 200 && setUser(response.data)
      })
      .catch(err => console.error(err))
  }, [])

  const save = () => {
      axios.post(`/api/user/single?id=${user.id}`, {data: user})
      .then(response => response.status == 200 && alert("Saved!"))
      .catch(err => alert("Oops! something went wrong"))
  }

  return (
    <AdminLayout>
      {user && <h3 className="h3 mb-4 text-gray-800">Meals for {user.name}</h3>}
      <Container>
        {user ? (
          <Card  body style={{border: "none", marginTop: 10, marginBottom: 10}}>
          <div className='table-responsive'>
              <Table responsive hover>
                  <thead>
                      <tr>
                          <td>Meal type</td>
                          <td>Fat (g)</td>
                          <td>Protein (g)</td>
                          <td>Calories (kcal)</td>
                          <td>Carbohydrates (g)</td>
                          <td>Protein (%)</td>
                          <td>Fat (%)</td>
                          <td>Carbohydrates (%)</td>
                          {/* <th></th> */}
                      </tr>
                  </thead>
                  <tbody>
                      {user.meals.map((meal, index) => (
                          <tr key={index}>
                              <td>{meal.name}</td>
                              <td>{meal.fat}</td>
                              <td>{meal.protein}</td>
                              <td>{meal.calories}</td>
                              <td>{meal.carbohydrates}</td>
                              <td>{meal.proteinPercentage}</td>
                              <td>{meal.fatPercentage}</td>
                              <td>{meal.carbohydratesPercentage}</td>
                              {/* <td>
                                  <button type="button" className="btn btn-danger mx-1" onClick={() => {
                                      const newUser = {...user}
                                      newUser.meals.splice(index, 1)
                                      setUser(newUser)
                                  }}>Delete</button>
                              </td> */}
                          </tr>
                      ))}
                  </tbody>
              </Table>
              {/* <button className='btn btn-success mx-1' onClick={() => save()}>Save</button> */}
          </div>
          </Card>
        ) : (
          <Row className="justify-content-center align-items-center w-100">
            <Spinner animation="border" variant="success" />
          </Row>
        )} 
      </Container>
    </AdminLayout>
  )
};

export default Client;
