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
        <Container style={{ marginTop: 100 }}>
            <h1>Contatti</h1>
            <div style={{marginTop: 30}}>
                {data?.map((contatto: IPersona, index) => <Row key={index} style={{ borderTop: 'solid 1px', padding: 'auto', margin: 10 }}>
                    <Col md={1} style={{ marginTop: 5 }}>
                        <img src={contatto.avatar} alt="Avatar" style={{ width: 100 }} />
                    </Col>
                    <Col md={1}></Col>
                    <Col md={2} style={{ margin: 'auto' }}>
                        <b>Nome</b>: {contatto.nome} {contatto.cognome}
                    </Col>
                    <Col md={4} style={{ margin: 'auto' }}>
                        <b>Email</b>: {contatto.email}
                    </Col>
                    <Col md={1} style={{ margin: 'auto' }}>
                        <b>Tel</b>: {contatto.telefono}
                    </Col>
                    <Col md={1}></Col>
                    <Col md={2} style={{ margin: 'auto' }}>
                        <Button type="button" variant="primary" style={{ marginTop: 10, marginLeft: 10, width: 76.93 }} onClick={() => navigate(`/dettaglio/${contatto.id}`)}>Info</Button>
                        <Button variant="danger" style={{ marginLeft: 10, marginTop: 10}} onClick={() => elimina(contatto)}>Elimina</Button>
                    </Col>
                </Row>)}
            </div>
        </Container>

    )
}


export default Contatti;