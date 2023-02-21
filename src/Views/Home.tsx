import { Row, Col, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';
import RouteEnum from '../Enum/RouteEnum';

function Home() {

    const navigate = useNavigate()

    return (
        <Container style={{marginTop: 70}}>
            <Row>
                <h1>Benvenuto nell'App Rubrica</h1>
                <Col style={{marginTop: 35}}>
                    <Card>
                        <Card.Header>Test</Card.Header>
                        <Card.Body>
                            <Card.Title>Card Component</Card.Title>
                            <Card.Text>
                                Potrai inserire un nuovo contatto in 'Inserisci' e visualizzare tutti i contatti in 'Contatti'
                            </Card.Text>
                            <Button variant="primary" onClick={() => navigate(RouteEnum.Inserisci)}>Nuovo</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>

                </Col>
            </Row>
        </Container>
    );
}

export default Home;