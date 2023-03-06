import { Skeleton } from "@mui/material";
import { Row, Col, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";
import CardNasa from "../Components/CardNasa";
import { ErrorPage } from "../Components/ErrorPage";
import RouteEnum from "../Enum/RouteEnum";
import { useGetImgQuery } from "../store/API";

function Home() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetImgQuery();
  console.log(data);

  let content;

  if (isLoading) {
    content = 
    <>
    <Skeleton variant="circular" width={60} height={60} />
    </>
  } else if (error) {
    content = <ErrorPage></ErrorPage>;
  } else {
    if (data) {
      content = (
        <CardNasa
          title={data.title}
          explanation={data.explanation}
          url={data.url}
        />
      );
    }
  }

  return (
    <Container style={{ marginTop: 100, marginBottom: 100 }}>
      <Row>
        <h1>Benvenuto nell'App Rubrica</h1>
        <Col style={{ marginTop: 35 }}>
          <Card>
            <Card.Header>Test</Card.Header>
            <Card.Body>
              <Card.Title>Card Component</Card.Title>
              <Card.Text>
                Potrai inserire un nuovo contatto in 'Inserisci' e visualizzare
                tutti i contatti in 'Contatti'
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => navigate(RouteEnum.Inserisci)}
              >
                Nuovo
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col style={{marginTop: 35}}>{content}</Col>
      </Row>
    </Container>
  );
}

export default Home;
