export class Article {
    idArticle: number;
    description: string;
    libelle: string;
    prix: number;
    reference: string;
    duree: number;
    image: string;
    categorie: Categorie;
}

export class Categorie {
    idCategorie: number;
    nom: string;
}