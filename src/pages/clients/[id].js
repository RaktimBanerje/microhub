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
      {user && <h3 className="h3 mb-4 text-gray-800">{user.name}</h3>}
      <Container>
        {user && user?.meals?.length > 0 ? (
          <Card  body style={{border: "none", marginTop: 10, marginBottom: 10}}>
              <Table responsive hover>
                  <thead>
                      <tr>
                          <th>Meal name</th>
                          <th>Meal for</th>
                          <th>Meal type</th>
                          <th>Fat (g)</th>
                          <th>Protein (g)</th>
                          <th>Calories (kcal)</th>
                          <th>Carbohydrates (g)</th>
                          <th>Protein (%)</th>
                          <th>Fat (%)</th>
                          <th>Carbohydrates (%)</th>
                      </tr>
                  </thead>
                  <tbody>
                      {user.meals.map((meal, index) => (
                          <tr key={index}>
                              <td>{meal.name}</td>
                              <td>{meal.for}</td>
                              <td>{meal.type}</td>
                              <td>{meal.fat}</td>
                              <td>{meal.protein}</td>
                              <td>{meal.calories}</td>
                              <td>{meal.carbohydrates}</td>
                              <td>{meal.proteinPercentage}</td>
                              <td>{meal.fatPercentage}</td>
                              <td>{meal.carbohydratesPercentage}</td>
                          </tr>
                      ))}
                  </tbody>
              </Table>
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
