import { Client } from "@prismicio/client";
import { createClient } from "../../prismicio";
const prismic_AccessToken = process.env.PRISMIC_ACCESS_TOKEN ?? "";

if (prismic_AccessToken === "") {
    throw new Error("Error: PRISMIC_ACCESS_TOKEN not provided.");
}



export function getPrismicClient(req?: unknown) {
    const prismic =  createClient();

    if (req) {
        acessToken: process.env.PRISMIC_ACCESS_TOKEN 
    }

    return prismic;
}

