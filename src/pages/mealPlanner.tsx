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
  Table,
  Form
} from "react-bootstrap";
import { useEffect, useState } from "react";

const MealPlanner: NextPage = () => {

    
    const [meals, setMeals] = React.useState([])
    const [users, setUsers] = React.useState([])
    const [data, setData] = React.useState({meals: [], user: ""})
    const meal = {
        name: "",
        for: "",
        fat: 0,
        protein: 0,
        calories: 0,
        carbohydrates: 0,
        proteinPercentage: 0,
        fatPercentage: 0,
        carbohydratesPercentage: 0,
        recipes: []
    }

    React.useEffect(() => {
        axios.get("/api/meal/read")
        .then(response => {
            console.log(response.data)
            response.status == 200 && setMeals(response.data)
        })
        .catch(console.log)
        
        axios.get("/api/user/read")
        .then(response => {
            response.status == 200 && setUsers(response.data)
        })
        .catch(console.log)
    }, [])

    const save = () => {
        axios.post("/api/user-meal", {data})
        .then(response => response.status == 200 ? alert("Success") : alert("Failed"))
        .catch(err => alert("Failed"))
    }

  return (
    <AdminLayout>
        <Row>
            <Col md="10">
                <h3>Meal Planner</h3>
            </Col>
            <Col md="2">
                <button className='btn btn-success mt-3' style={{borderRadius: "50px"}} onClick={() => save()}>Save Meal Plan</button>
            </Col>
        </Row>
        
        <Card body style={{border: "none", marginTop: 10, marginBottom: 10}}>
            <Row>
                <Col md="4">
                    <Form.Group className="mb-3">
                        <Form.Label>Client</Form.Label>
                        <Form.Select onChange={event => setData(data => ({...data, user: event.target.value}))}>
                        <option value="">--Select--</option>
                            {users.map((user, index) => <option key={index} value={user.id}>{user.name}</option>)}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Table responsive hover>
                <thead>
                    <tr>
                        <th>Meal</th>
                        <th>Meal type</th>
                        <th>Meal for</th>
                        <th>Fat (g)</th>
                        <th>Protein (g)</th>
                        <th>Calories (kcal)</th>
                        <th>Carbohydrates (g)</th>
                        <th>Protein (%)</th>
                        <th>Fat (%)</th>
                        <th>Carbohydrates (%)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.meals.map((meal, index) => (
                        <tr key={index}>
                            <td>
                                <select 
                                    className='form-control'
                                    style={{width: "200px"}} 
                                    onChange={(event) => {
                                    const meal = JSON.parse(event.target.value)
                                    const newData = {...data}
                                    newData.meals[index] = {
                                        id: meal.id,
                                        name: meal.name,
                                        fat: meal.fat,
                                        protein: meal.protein,
                                        calories: meal.calories,
                                        carbohydrates: meal.carbohydrates,
                                        proteinPercentage: meal.proteinPercentage,
                                        fatPercentage: meal.fatPercentage,
                                        carbohydratesPercentage: meal.carbohydratesPercentage,
                                        recipes: meal.recipes
                                    }
                                    setData(newData)
                                }}>
                                    <option value="">--Select--</option>
                                    {meals.map((meal, index) => <option key={index} value={`${JSON.stringify(meal)}`}>{meal.name}</option>)}
                                </select>
                            </td>
                            <td>
                                <input 
                                    type='text' 
                                    className='form-control' 
                                    placeholder="Lunch/ Dinner/ Snack ..."
                                    style={{width: "100px"}}
                                    onChange={event => {
                                    const newData = {...data}
                                    newData.meals[index].type = (event.target.value).toLowerCase().trim()
                                    setData(newData)
                                }}/>
                            </td>
                            <td>
                                <input 
                                    type='text' 
                                    className='form-control' 
                                    placeholder="Sun/ Mon/ Tue ..."
                                    style={{width: "100px"}}
                                    onChange={event => {
                                    const newData = {...data}
                                    newData.meals[index].for = (event.target.value).toLowerCase().trim()
                                    setData(newData)
                                }}/>
                            </td>
                            <td>{meal.fat}</td>
                            <td>{meal.protein}</td>
                            <td>{meal.calories}</td>
                            <td>{meal.carbohydrates}</td>
                            <td>{meal.proteinPercentage}</td>
                            <td>{meal.fatPercentage}</td>
                            <td>{meal.carbohydratesPercentage}</td>
                            <td>
                                <Button 
                                    variant="outline-dark"
                                    size="sm" 
                                    onClick={() => {
                                        data.meals.splice(index, 1)
                                        setData(prevData => ({...data}))
                                    }}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button 
                variant='outline-success' 
                className="w-100"
                onClick={() => setData(data => ({...data, meals: [...data.meals, meal]}))}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
            </Button>
        </Card>

    </AdminLayout>
  )
};

export default MealPlanner;
