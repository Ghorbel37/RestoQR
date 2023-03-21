import { SousCategorie } from "./sous-categorie";

export class Categorie {
    idCategorie: number;
    nom: string;
    image: string;
    sous_Categories: SousCategorie[];
}