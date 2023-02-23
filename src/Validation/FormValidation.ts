import * as yup from 'yup';
import { parse } from 'date-fns';

const phoneRegExp = /^\+?\d[0-9 .]{7,12}\d$/;
const capRegExp = /^[0-9]{5}$/


export const contattoValidation = yup.object().shape({
    nome: yup.string().required('Il nome è obbligatorio'),
    cognome: yup.string().required('Il cognome è obbligatorio'),
    dataDiNascita: yup.date().transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "dd.MM.yyyy", new Date());
      return result;
    }).typeError("Inserire una data valida").required(),
    citta: yup.string(),
    provincia: yup.string().uppercase().min(2, 'Formato provincia non valido').max(2, 'Formato provincia non valido'),
    cap: yup.string().matches(capRegExp, 'Il CAP non è valido'),
    indirizzo: yup.string(),
    civico: yup.string(),
    email: yup.string().email('indirizzo e-mail non valido').required('Il campo E-mail è obbligatorio'),
    telefono: yup.string().matches(phoneRegExp, 'Il numero di telefono non è valido').required('Il numero di telefono è obbligatorio'),
    avatar: yup.string()
})