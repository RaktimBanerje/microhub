import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { AdminLayout } from "@layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  faArrowDown,
  faArrowUp,
  faDownload,
  faEllipsisVertical,
  faMars,
  faSearch,
  faUsers,
  faVenus,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  ButtonGroup,
  Card,
  CardGroup,
  Dropdown,
  Container,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Table
} from "react-bootstrap";

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const Client = ({users: USERS}) => {
 
  const router = useRouter()
  const [error, setError] = React.useState({isError: false, message: ""})
  const [success, setSuccess] = React.useState({isSuccess: false, message: ""})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const [users, setUsers] = React.useState([])
  const [initialValues, setInitialValues] = React.useState({
      name: "",
      email: "",
      gender: "",
      dob: "",
      height: "",
      weight: ""
  })

  const handleSubmit = async (user, {resetForm}) => {
      setIsSubmitting(true)
      const response = await axios.post("/api/user/create", {user})
      if(response.status == 200) {
          setIsSubmitting(false)
          setSuccess({isSuccess: true, message: "New user created successfully"})
          resetForm({
              name: "",
              email: "",
              gender: "",
              dob: "",
              height: "",
              weight: ""
          })
          loadUser()
      }else {
          setError({isError: true, message: "Oops! something went wrong"})
      }
  }

  const handleDelete = async (id) => {
      const response = await axios.delete(`/api/user/delete?id=${id}`)
      if(response.status == 200) {
          loadUser()
      }else {
          alert("Oops! something went wrong")
      }
  }

  const loadUser = async () => {
      setLoading(true)
      const response = await axios.get("/api/user/read")
      if(response.status == 200) {
          setUsers(response.data)
      }
      setLoading(false)
  }

  const openForm = () => {
      setError({isError: false, message: ""})
      setSuccess({isSuccess: false, message: ""})
      
  }

  React.useEffect(() => {
      console.log(USERS)
      setUsers(USERS)
  }, [])

  React.useEffect(() => {
      router.isFallback ? setLoading(true) : setLoading(false)
  }, [router.isFallback])

  return (
    <AdminLayout>
      <Container>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand>Welcome Back "Person"</Navbar.Brand>
            <Nav className="ml-auto">
              <Button className="invite-button" href="#">
                Invite New Client
              </Button>
            </Nav>
          </Container>
        </Navbar>
      </Container>

      <Container>
        <Card style={{border: "none", marginTop: 10, marginBottom: 10}}>
          <Card.Header>Clients</Card.Header>
          <Card.Body>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>Height (cms)</th>
                    <th>Weight (cms)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {users.map(user => (
                      <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.gender}</td>
                          <td>{new Date(user.dob).toLocaleDateString()}</td>
                          <td>{user.height}</td>
                          <td>{user.weight}</td>
                          <td>
                              <div className="btn-group">
                                  <Link href={`/clients/${user.id}`}>
                                      <a className="btn btn-outline-success mx-1" rel="noopener noreferrer">View</a>
                                  </Link>
                                  {/* <Link href={`/users/${user.id}`}>
                                      <a className="btn btn-primary mx-1">Edit</a>
                                  </Link> */}
                                  <button type="button" className="btn btn-outline-danger mx-1" onClick={ () => handleDelete(user.id)}>Delete</button>
                              </div>
                          </td>
                      </tr>
                  ))}
                </tbody>
              </Table>

          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  )
};

export default Client;


export async function getStaticProps() {
  let response = await axios.get(`${process.env.URL}/api/user/read`)
  if(response.status === 200) {
      return {
          props: {users: response.data},
          revalidate: 10
      }
  }
  else {
      return {
          props: {users: []},
          revalidate: 10
      }
  }
}
