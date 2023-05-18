import { Client } from "./client";
import { LigneCommande } from "./ligne-commande"
import { Table } from "./table";

export class Commande {
    idCommande: number;
    date: Date;
    etat: Etat;
    description: string;
    ligneCommandes: LigneCommande[];
    client: Client;
    tableRestaurant: Table;
}

export enum Etat {
    valide,
    annule,
    En_cours,
}
