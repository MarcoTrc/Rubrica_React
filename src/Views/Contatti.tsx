import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import IPersona from "../Interfaces/IPersona";
import { useGetContattiQuery, useRemoveContattiMutation } from "../store/API";


function Contatti() {

    const { data, isLoading, error } = useGetContattiQuery();
    const [removeContatti] = useRemoveContattiMutation();
    const navigate = useNavigate();

    const elimina = (contatto: IPersona) => {
        const confermaEliminazione = window.confirm("Sei sicuro di voler eliminare questo contatto?");
        if (confermaEliminazione) {
          removeContatti(contatto);
        }
      }
      

    return (
        <>
            <div>
                <Container>
                    <h1>Contatti</h1>
                    <div>
                        {data?.map((contatto: IPersona, index) => <Row key={index} style={{ borderTop: 'solid 1px', padding: 'auto', margin: 10 }}>
                            <Col md={1} style={{ marginTop: 5 }}>
                                <img src={contatto.avatar} alt="Avatar" style={{ width: 80 }} />
                            </Col>
                            <Col md={2} style={{ margin: 'auto' }}>
                                <b>Nome</b>: {contatto.nome} {contatto.cognome}
                            </Col>
                            <Col md={3} style={{ margin: 'auto' }}>
                                <b>Email</b>: {contatto.email}
                            </Col>
                            <Col md={2} style={{ margin: 'auto' }}>
                                <b>Tel</b>: {contatto.telefono}
                            </Col>
                            <Col md={2}></Col>
                            <Col md={1} style={{ margin: 'auto' }}>
                                <Button type="button" variant="primary" onClick={() => navigate(`/dettaglio/${contatto.id}`)}>Dettaglio</Button>
                            </Col>
                            <Col md={1} style={{ margin: 'auto' }}>
                                <Button variant="danger" onClick={() => elimina(contatto)}>Elimina</Button>
                            </Col>
                        </Row>)}
                    </div>
                </Container>
            </div>
        </>
    )
}


export default Contatti;