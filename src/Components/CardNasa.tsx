import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

type IProps ={
    title: string,
    explanation: string,
    url: string
}

function CardNasa({title, explanation, url}: IProps) {

  const urlBtn = 'https://api.nasa.gov/'

  return (
    <Card style={{ width: '28rem' }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {explanation}
        </Card.Text>
        <Button variant="primary" href={urlBtn} target='blank'>NasaApi</Button>
      </Card.Body>
    </Card>
  );
}

export default CardNasa;