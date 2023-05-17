import { Article } from "./article";

export class Categorie {
    idCategorie: number;
    nom: string;
    active: boolean;
    image: string;
    articles: Article[];
}