/* The code is a React component called "Register" that renders a registration form. It imports various
dependencies such as useRef and useState from the 'react' library, as well as components from
'react-bootstrap' and 'react-router-dom'. It also imports a 'Supabase' module from a custom file. */
/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import supabase from '../Toggle/Supabase'; 
import { useAuth } from './AuthProvider';

const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value
    ) {
      setErrorMsg('Please fill all the fields');
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("Passwords don't match");
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (error) {
        throw new Error('Error in Creating Account');
      }

      setMsg('Registration Successful. Check your email to confirm your account');
    } catch (error) {
      setErrorMsg('Error in Creating Account');
    }

    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} required />
            </Form.Group>
            {errorMsg && (
              <Alert variant="danger" onClose={() => setErrorMsg('')} dismissible>
                {errorMsg}
              </Alert>
            )}
            {msg && (
              <Alert variant="success" onClose={() => setMsg('')} dismissible>
                {msg}
              </Alert>
            )}
            <div className="text-center mt-2">
              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already a User? <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default Register;
