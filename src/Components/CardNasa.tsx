import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

type IProps ={
    title: string,
    explanation: string,
    url: string

}
function CardNasa({title, explanation, url}: IProps) {

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {explanation}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default CardNasa;