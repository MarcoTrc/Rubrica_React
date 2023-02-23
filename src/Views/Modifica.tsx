import { useEffect, useState } from "react";
import { Row, Col, Button, Alert, Container } from "react-bootstrap";
import { useParams } from "react-router";
import Form from 'react-bootstrap/Form';
import Ruolo from "../Enum/Ruolo";
import Sesso from "../Enum/Sesso";
import IPersona from "../Interfaces/IPersona";
import { useGetContattoByIdQuery, useUpdateContattiMutation } from "../store/API";
import Indirizzo from "../Type/Indirizzo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormSubmit from "../Type/FormSubmit";
import { contattoValidation } from "../Validation/FormValidation";


function Modifica() {

    const { id } = useParams()

    const { data, isLoading, error } = useGetContattoByIdQuery(parseInt(id || '0'))

    const [showAlert, setShowAlert] = useState(false);

    const [updateContatto] = useUpdateContattiMutation()
    const aggiornaContatto = (contatto: IPersona): void => {
        updateContatto(contatto)
    }

    const [ruolo, setRuolo] = useState<Ruolo>(Ruolo.admin);
    const [nome, setNome] = useState<string>('');
    const [cognome, setCognome] = useState<string>('');
    const [dataDiNascita, setDataDiNascita] = useState<string>('');

    const [indirizzo, setIndirizzo] = useState<Indirizzo>({
        città: '',
        provincia: '',
        cap: '',
        locazione: '',
        indirizzo: '',
        numero: '',
    });
    const [email, setEmail] = useState<string>('');
    const [sesso, setSesso] = useState<Sesso>(Sesso.NonSpecificato);
    const [telefono, setTelefono] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');


    useEffect(() => {
        if (data) {

            const nuovaData = new Date(data.dataDiNascita)
            const dataToIso = nuovaData.toISOString().substring(0, 10)
            setDataDiNascita(dataToIso)

            setAvatar(data.avatar)
            setRuolo(data.ruolo)
            setNome(data.nome)
            setCognome(data.cognome)
            setEmail(data.email)
            setIndirizzo({
                città: data.indirizzo.città,
                provincia: data.indirizzo.provincia,
                cap: data.indirizzo.cap,
                locazione: data.indirizzo.locazione,
                indirizzo: data.indirizzo.indirizzo,
                numero: data.indirizzo.numero,
            })
            setSesso(data.sesso)
            setTelefono(data.telefono)
        } else {
            console.log('NotData', data);

        }
    }, [data])


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormSubmit>({
        resolver: yupResolver(contattoValidation)
    });

    let content;
    if (isLoading) {
        content =
            <>
                <h1>Loading</h1>
            </>
    } else if (error) {
        content =
            <>
                <h1>Error</h1>
            </>
    } else {

        if (data) {

            //........................VALIDAZIONE........................


            const onSubmit = (data: FormSubmit) => {
                const contattoAggiornato: IPersona = {
                    id: Number(id),
                    ruolo: ruolo,
                    nome: nome,
                    cognome: cognome,
                    dataDiNascita: new Date(dataDiNascita),
                    email: email,
                    indirizzo: indirizzo,
                    sesso: sesso,
                    telefono: telefono,
                    avatar: avatar
                }
                aggiornaContatto(contattoAggiornato);
                setShowAlert(true);
            };

            //........................VALIDAZIONE........................

            const handleAlertClose = () => {
                setShowAlert(false);
            };

            const resetCampi = () => {
                setAvatar('')
                setRuolo(Ruolo.guest)
                setNome('')
                setCognome('')
                setDataDiNascita('')
                setEmail('')
                setIndirizzo({
                    città: '',
                    provincia: '',
                    cap: '',
                    locazione: '',
                    indirizzo: '',
                    numero: '',
                })
                setSesso(Sesso.NonSpecificato)
                setTelefono('')
            }
            content = (

                <>
                    <Container style={{ marginTop: 20 }}>
                        <Alert show={showAlert} variant="success" onClose={handleAlertClose} dismissible>
                            <Alert.Heading>Modifica avvenuta con successo!</Alert.Heading>
                            <p>
                                Il contatto {nome} {cognome} è stato aggiornato correttamente.
                            </p>
                        </Alert>
                    </Container>
                    <h1 style={{ marginLeft: 20, marginTop: 30 }}>Modifica contatto</h1>
                    <Row style={{ marginLeft: 20 }}>
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
                                            onChange={(event) => {setDataDiNascita(event.target.value)}}
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
                                        Aggiorna
                                    </Button>
                                    <Button variant="light" type="button" onClick={resetCampi} style={{ marginTop: 10, marginLeft: 10 }}>
                                        Azzera
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </>

            )
        }
    }

    return (
        <>
            {content}
        </>

    )
}

export default Modifica




