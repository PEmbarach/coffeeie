import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Image } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";


function PostEditForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    image: "",
    title: "",
    rate: "",
    price: "",
    location: "",
  });

  const { image, title, rate, price, location } = postData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
        try {
            const { data } = await axiosReq.get(`/posts/${id}/`);
            const { image, title, rate, price, location, is_owner } = data;

            is_owner ? setPostData({ image, title, rate, price, location }) : history.push("/");
        } catch (err) {
            // console.log(err);
        }
    };
    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    

    if (imageInput?.current?.files[0]) {
        formData.append('image', imageInput.current.files[0])
        formData.append('title', title)
        formData.append('rate', rate)
        formData.append('price', price)
        formData.append('location', location)
    }

    try {
      await axiosReq.post(`/posts/${id}/`, formData,);
      await axiosReq.post(`/rate/${id}/`, formData,);
      await axiosReq.post(`/details/${id}`, formData,);
      history.push(
        `posts/${id}`,
        `rate/${id}`,
        `details/${id}`
      )
    } catch(err){
      // console.log(err)
      if (err.response?.status !== 401){
        setErrors(err.response?.data)
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Rate</Form.Label>
        <Form.Control 
          name="rate"
          value={rate}
          onChange={handleChange}
          as="select" 
          size="sm" 
          custom
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>      
      </Form.Group>
      {errors?.rate?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={location}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.location?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <InputGroup 
          className="mb-3"
        >
          <InputGroup.Prepend>
            <InputGroup.Text>€</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="price"
            value={price}
            onChange={handleChange}          
            placeholder="00.00"
          />
        </InputGroup>
      </Form.Group>
      {errors?.price?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Orange}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Orange}`} type="submit">
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
                <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                </figure>
                <div>
                    <Form.Label
                        className={`${btnStyles.Button} ${btnStyles.Orange} btn`}
                        htmlFor="image-upload"
                    >
                        Change the image
                    </Form.Label>
                </div>
                <Form.File
                    id="image-upload"
                    accept="image/*"
                    onChange={handleChangeImage}
                    ref={imageInput}
                />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;
