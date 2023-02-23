import Ruolo from "../Enum/Ruolo"
import Sesso from "../Enum/Sesso"
import Indirizzo from "../Type/Indirizzo"

interface IPersona {
    id?: number,
    avatar: string,
    ruolo: Ruolo,
    nome: string,
    cognome: string,
    dataDiNascita: Date,
    indirizzo: Indirizzo,
    email: string,
    sesso: Sesso,
    telefono: string

}
export default IPersona
