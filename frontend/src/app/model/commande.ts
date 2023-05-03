import { LigneCommande } from "./ligne-commande"
import { Table } from "./table";

export class Commande {
    idCommande: number;
    date: Date;
    etat: Etat;
    description: string;
    ligneCommandes: LigneCommande[];
    tableRestaurant: Table;
}

enum Etat {
    validé,
    annulé,
    En_cours,
}
