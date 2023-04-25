import { Article } from "./article";

export class LigneCommande {
    idLigneCommande: number;
    prixLigne: number;
    quantite: number;
    article: Article;

    constructor(article: Article) {
        this.prixLigne = article.prix;
        this.quantite = 1;
        this.article = article;
    }
}
