import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Card, Typography } from 'antd'
import { MatchedItem } from '../../store/selectors'

interface IProps {
  id: string
  name: string
  investors: MatchedItem[]
}

export const MatchItem: React.FC<IProps> = ({
  id, name, investors
}) => {
  return (
    <Col xs={12} sm={8} md={6}>
      <Link to={`/home/matches/${id}`}>
        <Card style={{textAlign:'center'}}>
          <Typography.Title level={4}>
            {name}</Typography.Title>
          <ul style={{listStyle:'none', paddingLeft:0}}>
            {investors.map((investor, index) => (
              <li key={investor.id}>{investor.name}</li>
            ))}
            {investors.length < 1 && <div>(no matched investors)</div>}
          </ul>
        </Card>
      </Link>
    </Col>
  )
}
