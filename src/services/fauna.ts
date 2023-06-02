import {Client} from "faunadb"

const faunaDBKey = process.env.FAUNADB_KEY ?? "";


  

export const fauna = new Client({
    secret: faunaDBKey
})