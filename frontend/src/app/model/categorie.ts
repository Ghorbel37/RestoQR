export class Article {
    idArticle: number;
    description: string;
    libelle: string;
    prix: number;
    reference: string;
    image: string;
}

export class SousCategorie {
    idSous_Categorie: number;
    nom: string;
    articles: Article[];
}

export class Categorie {
    idCategorie: number;
    nom: string;
    Sous_Categories: SousCategorie[];
}