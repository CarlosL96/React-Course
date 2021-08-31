import React, { Component } from 'react'
import dateFormat from 'dateformat'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'

function RenderDish ({ dish }) {
  return (
    <div className='col-12 col-md-5 m-1'>
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  )
}

function RenderComments ({ dish }) {
  let comments = dish.comments
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

class DishDetail extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const dish = this.props.dish
    if (dish != null)
      return (
        <div className='row'>
          <RenderDish dish={this.props.dish} />
          <div className='col-12 col-md-5 text-left'>
            <Card>
              <h4>Comments</h4>
              <RenderComments dish={this.props.dish} />
            </Card>
          </div>
        </div>
      )
    else return <div></div>
  }
}

export default DishDetail
