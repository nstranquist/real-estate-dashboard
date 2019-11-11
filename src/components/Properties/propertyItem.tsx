import React from 'react'

interface Props {
  name: string
  description: string
}

export default function propertyItem({
  name, description
}: Props) {
  return (
    <div className="property-item">
      <h3>{name}</h3>
      <p>{description}</p>
      <a className="btn btn-view-property"
        onClick={() => console.log('clicked')}>
        View More
      </a>
    </div>
  )
}
