import { createApi, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react"
import IPersona from "../Interfaces/IPersona"

const contattiApi = createApi({
    reducerPath: 'contatti',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),

    tagTypes: ["Contatti"],

    endpoints(builder) {
        return {
            getContatti: builder.query<IPersona[], void>({

                providesTags: ["Contatti"],

                query: () => {
                    return {
                        url: "/contatti",
                        method: "GET"
                    }
                }
            }),

            getContattoById: builder.query<IPersona, number>({
                query: (id) => ({
                    url: `/contatti/${id}`,
                    method: "GET",
                }),
            }),

            addContatti: builder.mutation<void, IPersona>({

                invalidatesTags: ['Contatti'],

                query: (contatto) => {
                    return {
                        url: "/contatti",
                        method: "POST",
                        body: {
                            ruolo: contatto.ruolo,
                            nome: contatto.nome,
                            cognome: contatto.cognome,
                            dataDiNascita: contatto.dataDiNascita,
                            email: contatto.email,
                            indirizzo: {
                                città: contatto.indirizzo.città,
                                provincia: contatto.indirizzo.provincia,
                                cap: contatto.indirizzo.cap,
                                locazione: contatto.indirizzo.locazione,
                                indirizzo: contatto.indirizzo.indirizzo,
                                numero: contatto.indirizzo.numero
                            },
                            sesso: contatto.sesso,
                            telefono: contatto.telefono,
                            avatar: contatto.avatar,
                        }
                    }
                }
            }),

            removeContatti: builder.mutation<void, IPersona>({

                invalidatesTags: ['Contatti'],

                query: (contatto) => {
                    return {
                        url: `/contatti/${contatto.id}`,
                        method: "DELETE",
                    }
                }
            }),

            updateContatti: builder.mutation<void, IPersona>({

                invalidatesTags: ['Contatti'],

                query: (contatto) => {
                    return {
                        url: `/contatti/${contatto.id}`,
                        method: "PUT",
                        body: {
                            ruolo: contatto.ruolo,
                            nome: contatto.nome,
                            cognome: contatto.cognome,
                            dataDiNascita: contatto.dataDiNascita,
                            email: contatto.email,
                            indirizzo: {
                                città: contatto.indirizzo.città,
                                provincia: contatto.indirizzo.provincia,
                                cap: contatto.indirizzo.cap,
                                locazione: contatto.indirizzo.locazione,
                                indirizzo: contatto.indirizzo.indirizzo,
                                numero: contatto.indirizzo.numero
                            },
                            sesso: contatto.sesso,
                            telefono: contatto.telefono,
                            avatar: contatto.avatar,
                        }
                    }
                }
            })
        }
    }
})

export const { useGetContattiQuery, useAddContattiMutation, useRemoveContattiMutation, useGetContattoByIdQuery, useUpdateContattiMutation } = contattiApi
export { contattiApi }