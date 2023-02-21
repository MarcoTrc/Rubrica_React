import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useGetContattoByIdQuery } from "../store/API";
import moment from 'moment';




function Dettaglio() {

    const navigate = useNavigate()

    const { id } = useParams()

    const { data, isLoading, error } = useGetContattoByIdQuery(parseInt(id || '0'))
    console.log(data)

    const date = moment(data?.dataDiNascita).format('DD-MMMM-YYYY');

    return (
        <Container>
            <h1 style={{ marginTop: 30 }}>Dettaglio {data?.nome} {data?.cognome}</h1>
            <Row style={{ marginTop: 30, padding: 'auto' }}>
                <Col md={3} style={{ padding: 'auto' }}>
                    <img src={data?.avatar} alt="Avatar" style={{ width: 310 }} />
                </Col>
                <Col md={4}>
                    <Row>
                        <Col>
                            <b>Ruolo:</b> {data?.ruolo}
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col>
                            <b>Nome:</b> {data?.nome}
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col>
                            <b>Cognome:</b> {data?.cognome}
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col>
                            <b>Sesso:</b> {data?.sesso}
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col>
                            <b>Data di Nascita:</b> {date}
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col>
                            <b>Residenza:</b> {data?.indirizzo.città}, {data?.indirizzo.provincia}, {data?.indirizzo.cap}
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col>
                            <b>Indirizzo:</b> {data?.indirizzo.locazione} {data?.indirizzo.indirizzo} Nr.{data?.indirizzo.numero}
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col>
                            <b>E-mail:</b> {data?.email}
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col>
                            <b>Telefono:</b> {data?.telefono}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md={1} style={{ marginTop: 30 }}>
                    <Button type="button" variant="primary" onClick={() => navigate(`/modifica/${data?.id}`)}>Modifica</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Dettaglio;
