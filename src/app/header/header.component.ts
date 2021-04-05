import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { DataStorage } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated=false;

//@Output() featureSelected=new EventEmitter<string>();

  constructor(private dataStorage:DataStorage,private authenticateservice:AuthService) { }

  ngOnInit(): void {
    this.authenticateservice.user.subscribe(user=>{
      this.isAuthenticated=!!user
      console.log(!user)
      console.log(!!user)
    })
  }

 /* onSelect(feature:string){
	this.featureSelected.emit(feature);
}*/

onSaveData(){
  this.dataStorage.storeRecipe();
}

onFetchData(){
  this.dataStorage.Fetchrecipe().subscribe();
}

onLogOut(){
  this.authenticateservice.logOut();
}

}
