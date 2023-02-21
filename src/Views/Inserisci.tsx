import React, { useState } from 'react';
import Indirizzo from '../Type/Indirizzo';
import Ruolo from '../Enum/Ruolo';
import Sesso from '../Enum/Sesso';
import IPersona from '../Interfaces/IPersona';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { useAddContattiMutation } from "../store/API";
import { useNavigate } from 'react-router';


function Inserisci() {

    const navigate = useNavigate()

    const [addContatti, addResults] = useAddContattiMutation()

    const [showAlert, setShowAlert] = useState(false);

    const [ruolo, setRuolo] = useState<Ruolo>(Ruolo.guest);
    const [nome, setNome] = useState<string>('');
    const [cognome, setCognome] = useState<string>('');
    const [dataDiNascita, setDataDiNascita] = useState<Date | null>(null);
    const [indirizzo, setIndirizzo] = useState<Indirizzo>({
        città: '',
        provincia: '',
        cap: 0,
        locazione: '',
        indirizzo: '',
        numero: 0,
    });
    const [email, setEmail] = useState<string>('');
    const [sesso, setSesso] = useState<Sesso>(Sesso.NonSpecificato);
    const [telefono, setTelefono] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');

    const resetCampi = () => {
        setAvatar("")
        setRuolo(Ruolo.guest)
        setNome("")
        setCognome("")
        setDataDiNascita(null)
        setEmail("")
        setIndirizzo({
            città: '',
            provincia: '',
            cap: 0,
            locazione: '',
            indirizzo: '',
            numero: 0,
        })
        setSesso(Sesso.NonSpecificato)
        setTelefono("")
    }

    const [contatti, setContatti] = useState<IPersona[]>([]);

    const inserisciContatto = (contatto: IPersona): void => {
        const contattiAggiornati = [...contatti, contatto];
        addContatti(contatto)
        setContatti(contattiAggiornati);
    }

    const onClickSuInserisci = () => {
        const nuovoContatto: IPersona = {
            ruolo: ruolo,
            nome: nome,
            cognome: cognome,
            dataDiNascita: dataDiNascita!,
            email: email,
            indirizzo: indirizzo,
            sesso: sesso,
            telefono: telefono,
            avatar: avatar,
        }
        inserisciContatto(nuovoContatto);
        setShowAlert(true);
    }

    const goToContatti = () => {
        navigate(`/contatti`)
    }

    const handleAlertClose = () => {
        setShowAlert(false);
    };


    return (
        <>
            <Container style={{ marginTop: 20 }}>
                <Alert show={showAlert} variant="success" onClose={handleAlertClose} dismissible>
                    <Alert.Heading>Inserimento avvenuto con successo!</Alert.Heading>
                    <p>
                        Il contatto {nome} {cognome} è stato inserito correttamente.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={goToContatti} variant="outline-success">
                            Visualizza Lista
                        </Button>
                    </div>
                </Alert>
            </Container>
            <h1 style={{ marginLeft: 20, marginTop: 30 }}>Inserisci un nuovo contatto</h1>
            <Row style={{ marginLeft: 20 }}>
                <Col md={8} style={{ border: 'solid 1px gray', borderRadius: 10, padding: 20 }}>
                    <Form>
                        <Form.Group as={Row} style={{ marginTop: 20 }}>
                            <Col md={3}>
                                <Form.Select aria-label="Default select example"
                                    id="ruolo"
                                    value={ruolo}
                                    onChange={(event) => setRuolo(event.target.value as Ruolo)}
                                    style={{ marginTop: 10 }}>
                                    <option>Ruolo</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    <option value="guest">Guest</option>
                                </Form.Select>
                            </Col>
                            <Col md={1}></Col>
                            <Col md={4}>
                                <Form.Control
                                    id="nome"
                                    placeholder='Nome'
                                    value={nome}
                                    onChange={(event) => setNome(event.target.value)}
                                    style={{ marginTop: 10 }}>
                                </Form.Control>
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    placeholder='Cognome'
                                    id="cognome"
                                    value={cognome}
                                    onChange={(event) => setCognome(event.target.value)}
                                    style={{ marginTop: 10 }}>
                                </Form.Control>
                            </Col>
                            <Col md={5}></Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" style={{ marginTop: 20 }}>
                            <Form.Label column md={2} style={{ marginTop: 10 }}>Data Di Nascita</Form.Label>
                            <Col md={3}>
                                <Form.Control
                                    id="data_di_nascita"
                                    type="date"
                                    value={dataDiNascita ? dataDiNascita.toISOString().substr(0, 10) : ''}
                                    onChange={e => setDataDiNascita(new Date(e.target.value))}
                                    style={{ marginTop: 10 }}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Control type="text"
                                    placeholder='Città'
                                    value={indirizzo.città}
                                    onChange={e =>
                                        setIndirizzo({ ...indirizzo, città: e.target.value })
                                    }
                                    style={{ marginTop: 10 }}
                                />
                            </Col>
                            <Col md={2}>
                                <Form.Control type="text"
                                    placeholder='Provincia'
                                    value={indirizzo.provincia}
                                    onChange={e =>
                                        setIndirizzo({ ...indirizzo, provincia: e.target.value })
                                    }
                                    style={{ marginTop: 10 }}
                                />
                            </Col>
                            <Form.Label column md={1} style={{ marginTop: 10 }}>
                                Cap
                            </Form.Label>
                            <Col md={1}>
                                <Form.Control type="number"
                                    value={indirizzo.cap}
                                    onChange={e =>
                                        setIndirizzo({ ...indirizzo, cap: parseInt(e.target.value) })
                                    }
                                    style={{ marginTop: 10 }}
                                />
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} style={{ marginTop: 20 }}>
                            <Form.Label column md={2} style={{ marginTop: 10 }}>
                                Indirizzo
                            </Form.Label>
                            <Col md={2}>
                                <Form.Select aria-label="Default select example"
                                    id="prefisso"
                                    value={indirizzo.locazione}
                                    onChange={(e) =>
                                        setIndirizzo({ ...indirizzo, locazione: e.target.value })
                                    }
                                    style={{ marginTop: 10 }}>
                                    <option>Prefisso</option>
                                    <option value="via">Via</option>
                                    <option value="piazza">Piazza</option>
                                    <option value="strada">Strada</option>
                                    <option value="vico">Vico</option>
                                </Form.Select>
                            </Col>
                            <Col md={5}>
                                <Form.Control type="text"
                                    value={indirizzo.indirizzo}
                                    onChange={e =>
                                        setIndirizzo({ ...indirizzo, indirizzo: e.target.value })
                                    }
                                    style={{ marginTop: 10 }}
                                />
                            </Col>
                            <Col md={1}></Col>
                            <Form.Label column md={1} style={{ marginTop: 10 }}>
                                Civico
                            </Form.Label>
                            <Col md={1}>
                                <Form.Control type="number"
                                    value={indirizzo.numero}
                                    onChange={e =>
                                        setIndirizzo({ ...indirizzo, numero: parseInt(e.target.value) })
                                    }
                                    style={{ marginTop: 10 }}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" style={{ marginTop: 20 }}>
                            <Col md={8}>
                                <Form.Control
                                    type="email"
                                    placeholder='Email'
                                    value={email}
                                    onChange={e =>
                                        setEmail(e.target.value)
                                    }
                                    style={{ marginTop: 10 }}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} style={{ marginTop: 10 }}>
                            <Col md={2}>
                                <Form.Select aria-label="Default select example"
                                    id="sesso"
                                    value={sesso}
                                    onChange={(event) => setSesso(event.target.value as Sesso)}
                                    style={{ marginTop: 10 }}>
                                    <option>Sesso</option>
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                    <option value="NonSpecificato">?</option>
                                </Form.Select>
                            </Col>
                            <Col md={3}>
                                <Form.Control
                                    type="text"
                                    placeholder='Telefono'
                                    value={telefono}
                                    onChange={e =>
                                        setTelefono(e.target.value)
                                    }
                                    style={{ marginTop: 10 }}
                                />
                            </Col>
                            <Col md={7}>
                                <Form.Control
                                    id="avatar"
                                    type="text"
                                    placeholder='Foto'
                                    value={avatar}
                                    onChange={(event) => setAvatar(event.target.value)}
                                    style={{ marginTop: 10 }}>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <div className="d-flex justify-content-end" style={{marginTop: 20}}>
                            <Button variant="warning" type="button" onClick={onClickSuInserisci} style={{ marginTop: 10 }} >
                                Inserisci
                            </Button>
                            <Button variant="light" type="button" onClick={resetCampi} style={{ marginTop: 10, marginLeft: 10 }}>
                                Azzera
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default Inserisci;





