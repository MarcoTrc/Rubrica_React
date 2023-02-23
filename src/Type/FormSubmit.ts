import Indirizzo from "./Indirizzo";

type FormSubmit = {

    nome: string,
    cognome: string,
    dataDiNascita: Date,
    citta: string,
    provincia: string,
    cap: string,
    indirizzo: Indirizzo,
    civico: string,
    email: string,
    telefono: string,
    avatar: string
}

export default FormSubmit;