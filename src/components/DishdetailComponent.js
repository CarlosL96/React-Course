import React, { Component } from 'react'
import dateFormat from 'dateformat'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Col,
  Row
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';

const maxLength = len => val => !val || val.length <= len
const minLength = len => val => val && val.length >= len

class CommentForm extends Component {
  constructor (props) {
    super(props)
    this.toggleModal = this.toggleModal.bind(this)
    this.handleComment = this.handleComment.bind(this)
    this.state = {
      isNavOpen: false,
      isModalOpen: false
    }
  }
  toggleModal () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }
  handleComment (values) {
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    )
  }
  render () {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className='fa fa-sign-in fa-lg'></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleComment}>
              <Row className='form-group'>
                <Label htmlFor='rating' md={2}>
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select
                    model='.rating'
                    id='rating'
                    name='rating'
                    className='form-control'
                  >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlFor='name' md={5}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model='.author'
                    id='author'
                    name='author'
                    placeholder='Your Name'
                    className='form-control'
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className='text-danger'
                    model='.name'
                    show='touched'
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlFor='comment' md={5}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model='.comment'
                    id='comment'
                    name='comment'
                    rows='6'
                    className='form-control'
                  />
                </Col>
              </Row>
              <Button type='submit' value='submit' color='primary'>
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

function RenderDish ({ dish }) {
  return (
    <div className='col-12 col-md-5 m-1'>
      <Card key={dish.id}>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  )
}

function RenderComments ({ comments, postComment, dishId }) {
  console.log(comments)
  return (
    <div>
      <ul className='list-unstyled'>
        {comments.map(comment => {
          const commentDate = dateFormat(comment.date, 'mmmm dS, yyyy')
          return (
            <li key={comments.id}>
              <div>
                <p>{comment.comment}</p>
                <p>
                  --{comment.author}, {commentDate}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
      <CommentForm dishId={dishId} postComment={postComment} />
    </div>
  )
}

const DishDetail = props => {
  if (props.isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Loading />
        </div>
      </div>
    )
  } else if (props.errMess) {
    return (
      <div className='container'>
        <div className='row'>
          <h4>{props.errMess}</h4>
        </div>
      </div>
    )
  }
  const dish = props.dish
  if (dish != null)
    return (
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/menu'>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className='row'>
          <RenderDish dish={props.dish} />
          <div className='col-12 col-md-5 text-left'>
            <Card key={props.id}>
              <h4>Comments</h4>
              <RenderComments
                comments={props.comments}
                postComment={props.postComment}
                dishId={props.dish.id}
              />
            </Card>
          </div>
        </div>
      </div>
    )
  else return <div></div>
}

export default DishDetail
