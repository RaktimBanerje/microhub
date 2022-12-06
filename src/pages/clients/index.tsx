import React from "react";
import { AdminLayout } from "@layout";
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Formik, Form, Field } from 'formik'
import {
  Button,
  Card,
  Container,
  Nav,
  Navbar,
  Table,
  Modal,
} from "react-bootstrap";

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
              <Button className="invite-button" href="#"  data-toggle="modal" data-target="#myModal" onClick={openForm}>
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
              <Table responsive hover>
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
                                      <a className="btn btn-outline-success mx-1" rel="noopener noreferrer"><i class="fa fa-eye" aria-hidden="true"></i></a>
                                  </Link>
                                  {/* <Link href={`/users/${user.id}`}>
                                      <a className="btn btn-primary mx-1">Edit</a>
                                  </Link> */}
                                  <button type="button" className="btn btn-outline-danger mx-1" onClick={ () => handleDelete(user.id)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                              </div>
                          </td>
                      </tr>
                  ))}
                </tbody>
              </Table>
          </Card.Body>
        </Card>
      </Container>

      <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                    <div className="modal-header">
                                        <h4 className="modal-title">Add New User</h4>
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    </div>

                                    <div className="modal-body">
                                    
                                        {error.isError && (
                                            <div className="alert alert-danger alert-dismissible">
                                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                                {error.message}
                                            </div>
                                        )}

                                        {success.isSuccess && (
                                            <div className="alert alert-success alert-dismissible">
                                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                                {success.message}
                                            </div>
                                        )}


                                        <div className="form-group">
                                            <label htmlFor=''>Name</label>
                                            <Field type="text" name="name" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor=''>Email</label>
                                            <Field type="text" name="email" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor=''>Gender</label>
                                            <Field type="text" as="select" name="gender"className="form-control" >
                                                <option value="">--Select--</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </Field>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor=''>DOB</label>
                                            <Field type="date" name="dob" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor=''>Height (cms)</label>
                                            <Field type="text" name="height" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor=''>Weight (kgs)</label>
                                            <Field type="text" name="weight" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary">
                                            {isSubmitting ? "Submitting..." : "Submit"}
                                        </button>
                                        <button type="reset" className="btn btn-warning">Reset</button>
                                    </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>

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
