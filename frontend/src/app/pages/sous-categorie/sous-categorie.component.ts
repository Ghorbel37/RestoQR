import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SousCategorie } from 'src/app/model/sous-categorie';
import { NotificationService } from 'src/app/services/notification.service';
import { SousCategorieService } from 'src/app/services/sous-categorie.service';

@Component({
  selector: 'app-sous-categorie',
  templateUrl: './sous-categorie.component.html',
  styleUrls: ['./sous-categorie.component.css']
})
export class SousCategorieComponent implements OnInit {
  columnsToDisplay = ['id', 'nom', 'action'];
  existingSousCategories: SousCategorie[];
  newSousCategorie: SousCategorie = new SousCategorie();
  result: string = '';

  constructor(
    private sousCategorieService: SousCategorieService,
    private notificationService: NotificationService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.sousCategorieService.getAll().subscribe(data => { this.existingSousCategories = data })
  }

  refresh() {
    this.sousCategorieService.getAll().subscribe(data => {
      this.existingSousCategories = data;
      this.changeDetectorRef.detectChanges();
    });
  }

  submit() {
    this.sousCategorieService.save(this.newSousCategorie).subscribe(data => this.refresh())
  }

  delete(id: number) {
    this.sousCategorieService.delete(id).subscribe(data => {
      console.log(data);
      this.refresh();
    });
    this.notificationService.openSnackBar("Deleted succesfully");
  }
}

