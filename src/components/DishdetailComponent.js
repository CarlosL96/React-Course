import React from 'react'
import dateFormat from 'dateformat'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap'
import { Link } from 'react-router-dom'

function RenderDish ({ dish }) {
  return (
    <div className='col-12 col-md-5 m-1'>
      <Card key={dish.id}>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  )
}

function RenderComments ({ comments }) {
  console.log(comments)
  return comments.map(comment => {
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
  })
}

const DishDetail = props => {
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
              <RenderComments comments={props.comments} />
            </Card>
          </div>
        </div>
      </div>
    )
  else return <div></div>
}

export default DishDetail
