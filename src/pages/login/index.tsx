import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/router";
import Alert from "react-bootstrap/Alert";
const Login = () => {
  const router = useRouter();
  const [resp, setResp] = useState<any>({});
  const [respLogin, setRespLogin] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  // Variables
  const [formField, setFormField] = useState<any>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<any>({
    email: "",
    password: "",
  });
  const [isSubmited, setIsSubmited] = useState(false);
  // Validations
  const validate = (values: { email: any; password: any }) => {
    let errors: any = {};
    if (!values.email) {
      errors.email = "Please enter your email";
    }
    if (!values.password) {
      errors.password = "Please enter your password";
    }
    console.log("test", error);
    return errors;
  };
  // On chnage
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormField({ ...formField, [name]: value });
  };
  // On Submit
  async function submitForm(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    setError(validate(formField));
    setIsSubmited(true);
  }
  useEffect(() => {
    setResp(JSON.parse(localStorage.getItem("user")!));
    if (Object.keys(error).length == 0 && isSubmited) {
      setLoading(true);
      loginAPI(formField);
    }
  }, [error]);
  // login API
  const loginAPI = async (data: any) => {
    const res = await fetch(
      "https://shark-app-6h3kz.ondigitalocean.app/api/v1/users/signin",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const respData = await res.json();
    setRespLogin(respData);
    setLoading(false);
    if (respData.status == "succes") {
      router.push("/");
      localStorage.setItem("user", JSON.stringify(respData));
    }
  };

  return (
    <>
      <div className="bg-blue auth-page">
        <div className="login-page">
          <Container>
            <div className="logo">
              <Image
                src="/Logo.svg"
                width={290}
                height={114}
                alt={"Logo"}
              ></Image>
            </div>
            {resp?.status ? (
              <>
                <h3 className="mt-5">You have already logged in</h3>
                <Link href="/" className="cmn_btn text-white mt-4">
                  Go to Home
                </Link>
              </>
            ) : (
              <div className="authForm">
                <h6>Sign In</h6>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formField.email}
                      onChange={(e) => handleChange(e)}
                    />
                    {error?.email && (
                      <Form.Text className="errorMessage">
                        {error.email}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formField.password}
                      onChange={(e) => handleChange(e)}
                    />
                    {error?.password && (
                      <Form.Text className="errorMessage">
                        {error.password}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Button
                    className="cmn_btn"
                    variant="primary"
                    type="submit"
                    onClick={(e) => submitForm(e)}
                  >
                    <span>Sign In</span>{" "}
                    {loading && <span className="loader"></span>}
                  </Button>
                  {respLogin?.status == "error" && (
                    <Alert variant="danger">
                      <p className="mb-0">{respLogin?.message}</p>
                    </Alert>
                  )}
                  <p className="auth-form">
                    Dont have an account? <Link href="/signup">Sign up</Link>
                  </p>
                </Form>
              </div>
            )}
          </Container>
        </div>
      </div>
    </>
  );
};

export default Login;
