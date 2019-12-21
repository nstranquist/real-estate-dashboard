import React from 'react'
import { Row, Col, Typography, Card } from 'antd'


const Matches = () => {
  return (
    <div>
      <Typography.Title style={{textAlign:'center'}}>Matches</Typography.Title>
      {/* Row with criteria toolbar */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card>
            <Typography.Title level={4}>Matched Investors:</Typography.Title>
            <ul>
              <li>Investor 1</li>
              <li>Investor 2</li>
              <li>Investor 3</li>
            </ul>
          </Card>
          
        </Col>
        <Col span={12}>
          <Card>
          <Typography.Title level={4}>Matched Properties</Typography.Title>
            <ul>
              <li>Property 1</li>
              <li>Property 2</li>
              <li>Property 3</li>
            </ul>
          </Card>
          
        </Col>
      </Row>
      {/* Row with 2 Cols, 1 for Investor, 1 for Properties */}
    </div>
  )
}

export default Matches
