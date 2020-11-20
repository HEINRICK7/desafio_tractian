import React, { useState, useEffect} from 'react';
import { Card, Progress, Row, Col, Button, Collapse  } from 'antd';
import {
  PlusCircleOutlined
} from '@ant-design/icons';

import axios from 'axios';
import './styles.css'


const CardComponent = () => {
const { Panel } = Collapse;
function callback(key) {
  console.log(key);
}
  const [results, setResults] = useState([]);

    useEffect(()=>{
      axios.get('https://app.tractian.com/api/test.json')
      .then(response => {
        setResults(response.data.units.slice(0,1));
        console.log(response.data.units.slice(0,1));
      })
     
    },[setResults])
    
    return (
      <>
      <ul>
        {results.map( (result) => (
          
        <li className="card">
          <Card title={result.name} >
            <Card >
              <Progress type="circle" style={{marginLeft: 200}} percent={result.data.insightsChecked} format={percent => `${percent} Checados`} />
              <Progress type="circle" style={{marginLeft: 200}} percent={result.data.insightsPending} format={percent => `${percent} pendentes`} />
            </Card>

            {result.data.assetsData.map(yes => (
              <div className="row">
               <Row>
               <Col span={24}>
              <Card
                extra={<Button type="primary"> {<PlusCircleOutlined/>} </Button> }
                style={{ marginTop: 16 }}
                type="inner"
                title={ yes.category.name}
              >
              
                <div className="site-card-wrapper">
                <Collapse onChange={callback}>
                <Panel header={yes.name} key="1">
                <Collapse defaultActiveKey="1">
                <Panel header={yes.description} key="1">
                  <Row >
                    <Col span={8} className="card_title">
                      <Card title="Saúde" bordered={true}>
                        <Progress type="circle" style={{ marginLeft: 15 }} percent={yes.healthscore.health} format={percent => `${percent} %`} />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card title="Checados" bordered={true}>
                        <Progress type="circle" style={{ marginLeft: 15 }} percent={yes.insights.checked} format={percent => `${percent}`} />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card title="Pendentes" bordered={true}>
                        <Progress  type="circle" style={{ marginLeft: 15 }} percent={yes.insights.pending} format={percent => `${percent}`} />
                      </Card>
                    </Col>
                  </Row>
                </Panel>
                </Collapse>
                </Panel>
                </Collapse>
                </div> 
              </Card>
              </Col>
              </Row>
              </div>
            ))} 
           
          </Card>
      
        </li>  
        ))}
        
      </ul>

       </> 
    )
}

export default CardComponent
