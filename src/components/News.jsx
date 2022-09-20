import React, {useState, useEffect} from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';

const avatar = 'https://i.ibb.co/RQHLgX7/Artboard-10.png';
const stImage = 'https://i.ibb.co/0XpYq5n/download.jpg';
const { Text, Title } = Typography;

function DataFetching() {
  const [post, setPost] = useState([])
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "get",
        headers: myHeaders,
        redirect: "follow",
        
    };
    
    fetch("https://v1.nocodeapi.com/cryptodome/medium/pexsoIXTqZBnejIQ", requestOptions)
        .then(response => response.json())
        .then(data => setPost(data))
        .catch(error => console.log('error', error));
  }, []);

  console.log(post[0])

  function setCardImage(content) {
    var string = content
    var str = string.substring(0, 300)
    var separator = '<figure>'
    var lastPart = str.split(separator).pop()
    var image = lastPart.substring(0, lastPart.indexOf('</figure>'))
    var separator1 = 'src="'
    var lastPart1 = image.split(separator1).pop()
    var imageUrl = lastPart1.substring(0, lastPart1.indexOf('" />'))
    if (imageUrl != "")
      return imageUrl
    else
      return stImage
  }

  return (
    <Row gutter={[24, 24]}>
      {post.map((post, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={post.link} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{post.title}</Title>
                <img src={setCardImage(post.content)} alt="" />
              </div>
              {/* <p>{post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}</p> */}
              <p>Read the full article on medium by clicking this card. If you like the article don't forget to "clap" and follow us!</p>
              <div className="provider-container">
                <div>
                  <Avatar src={avatar} alt="" />
                  <Text className="provider-name"><b>{post.author}</b></Text>
                </div>
              </div>
            </a>
          </Card>
        </Col>))}
    </Row>
  )
}

export default DataFetching
