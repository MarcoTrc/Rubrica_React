import { useEffect, useState } from 'react';
import Indirizzo from '../Type/Indirizzo';
import Ruolo from '../Enum/Ruolo';
import Sesso from '../Enum/Sesso';
import IPersona from '../Interfaces/IPersona';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { useAddContattiMutation } from "../store/API";
import { useNavigate } from 'react-router';
import {  useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormSubmit from '../Type/FormSubmit';
import { contattoValidation } from '../Validation/FormValidation';

function Inserisci() {
   

    const navigate = useNavigate()

    const [addContatti, addResults] = useAddContattiMutation()

    const [showAlert, setShowAlert] = useState(false);

    const [ruolo, setRuolo] = useState<Ruolo>(Ruolo.guest);
    const [nome, setNome] = useState<string>('');
    const [cognome, setCognome] = useState<string>('');
    const [dataDiNascita, setDataDiNascita] = useState<string>('');
    const [indirizzo, setIndirizzo] = useState<Indirizzo>({
        città: '',
        provincia: '',
        cap: '',
        locazione: '',
        indirizzo: '',
        numero: ''
    });
    const [email, setEmail] = useState<string>('');
    const [sesso, setSesso] = useState<Sesso>(Sesso.NonSpecificato);
    const [telefono, setTelefono] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');

    const [contatti, setContatti] = useState<IPersona[]>([]);

    const inserisciContatto = (contatto: IPersona): void => {
        const contattiAggiornati = [...contatti, contatto];
        addContatti(contatto)
        setContatti(contattiAggiornati);
    }

    const goToContatti = () => {
        navigate(`/contatti`)
    }

    const handleAlertClose = () => {
        setShowAlert(false);
    };


    //........................VALIDAZIONE........................

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormSubmit>({
        resolver: yupResolver(contattoValidation)
    });


    const onSubmit = (data: FormSubmit) => {
        const nuovoContatto: IPersona = {
            ruolo: ruolo,
            nome: nome,
            cognome: cognome,
            dataDiNascita: new Date(dataDiNascita),
            email: email,
            indirizzo: indirizzo,
            sesso: sesso,
            telefono: telefono,
            avatar: avatar,
        }
        inserisciContatto(nuovoContatto);
        setShowAlert(true);
    };

    //........................VALIDAZIONE........................

    const resetCampi = () => {
        setAvatar("")
        setRuolo(Ruolo.guest)
        setNome("")
        setCognome("")
        setDataDiNascita('')
        setEmail("")
        setIndirizzo({
            città: '',
            provincia: '',
            cap: '',
            locazione: '',
            indirizzo: '',
            numero: '',
        })
        setSesso(Sesso.NonSpecificato)
        setTelefono("")
    }


    return (
        <>
            <Container style={{ marginTop: 100 }}>
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
            <h1 style={{ marginLeft: 20, marginTop: 100 }}>Inserisci un nuovo contatto</h1>
            <Row style={{ marginLeft: 20, marginBottom: 100 }}>
                <Col md={8} style={{ border: 'solid 1px gray', borderRadius: 10, padding: 20 }}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
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
                                    type='text'
                                    {...register('nome')}
                                    className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                                    placeholder='Nome'
                                    value={nome}
                                    onChange={(event) => setNome(event.target.value)}
                                    style={{ marginTop: 10 }}
                                >
                                </Form.Control>
                                <div className="invalid-feedback">{errors.nome?.message}</div>
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    type='text'
                                    {...register('cognome')}
                                    className={`form-control ${errors.cognome ? 'is-invalid' : ''}`}
                                    placeholder='Cognome'
                                    value={cognome}
                                    onChange={(event) => setCognome(event.target.value)}
                                    style={{ marginTop: 10 }}>
                                </Form.Control>
                                <div className="invalid-feedback">{errors.cognome?.message}</div>
                            </Col>
                            <Col md={5}></Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" style={{ marginTop: 20 }}>
                            <Form.Label column md={2} style={{ marginTop: 10 }}>Data Di Nascita</Form.Label>
                            <Col md={3}>
                                <Form.Control
                                    type="date"
                                    {...register('dataDiNascita')}
                                    className={`form-control ${errors.dataDiNascita ? 'is-invalid' : ''}`}
                                    value={dataDiNascita}
                                    onChange={e => setDataDiNascita(e.target.value)}
                                    style={{ marginTop: 10 }}
                                />
                                <div className="invalid-feedback">{errors.dataDiNascita?.message}</div>
                            </Col>
                            <Col md={3}>
                                <Form.Control
                                    type="text"
                                    {...register('citta')}
                                    className={`form-control ${errors.citta ? 'is-invalid' : ''}`}
                                    placeholder='Città'
                                    value={indirizzo.città}
                                    onChange={e =>
                                        setIndirizzo({ ...indirizzo, città: e.target.value })
                                    }
                                    style={{ marginTop: 10 }}
                                />
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    type="text"
                                    {...register('provincia')}
                                    className={`form-control ${errors.provincia ? 'is-invalid' : ''}`}
                                    placeholder='Provincia'
                                    value={indirizzo.provincia}
                                    onChange={e =>
                                        setIndirizzo({ ...indirizzo, provincia: e.target.value })
                                    }
                                    style={{ marginTop: 10 }}
                                />
                                <div className="invalid-feedback">{errors.provincia?.message}</div>
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    type="text"
                                    {...register('cap')}
                                    className={`form-control ${errors.cap ? 'is-invalid' : ''}`}
                                    placeholder='CAP'
                                    value={indirizzo.cap}
                                    onChange={e =>
                                        setIndirizzo({ ...indirizzo, cap: e.target.value })
                                    }
                                    style={{ marginTop: 10 }}
                                />
                                <div className="invalid-feedback">{errors.cap?.message}</div>
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
                                <Form.Control
                                    type="text"
                                    {...register('indirizzo')}
                                    className={`form-control ${errors.indirizzo ? 'is-invalid' : ''}`}
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
                                <Form.Control
                                    type="text"
                                    {...register('civico')}
                                    className={`form-control ${errors.civico ? 'is-invalid' : ''}`}
                                    value={indirizzo.numero}
                                    onChange={e =>
                                        setIndirizzo({ ...indirizzo, numero: e.target.value })
                                    }
                                    style={{ marginTop: 10 }}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" style={{ marginTop: 20 }}>
                            <Col md={8}>
                                <Form.Control
                                    type="email"
                                    {...register('email')}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder='Email'
                                    value={email}
                                    onChange={e =>
                                        setEmail(e.target.value)
                                    }
                                    style={{ marginTop: 10 }}
                                />
                            </Col>
                            <div className="invalid-feedback">{errors.email?.message}</div>
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
                                    {...register('telefono')}
                                    className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                                    placeholder='Telefono'
                                    value={telefono}
                                    onChange={e =>
                                        setTelefono(e.target.value)
                                    }
                                    style={{ marginTop: 10 }}
                                />
                                <div className="invalid-feedback">{errors.telefono?.message}</div>
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

                        <div className="d-flex justify-content-end" style={{ marginTop: 20 }}>
                            <Button variant="warning" type="submit" style={{ marginTop: 10 }} >
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



