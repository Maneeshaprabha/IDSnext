import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  appObj: AppObj;
  sortBy: string;
  searchText: string;
  appArr: AppObj[] = [];


  constructor() {
    this.appObj = new AppObj(); // Corrected the instance creation
    this.sortBy = '';
    this.searchText = '';
  }


 
  ngOnInit(): void {
   
  
  }

  OnSave(){
    this.appArr.push(this.appObj);
    const isData = localStorage.getItem("AppData");
    if (isData == null) {
      const newArry = [];
      this.appObj.AppId=0;
      newArry.push(this.appObj);
      localStorage.setItem("AppData", JSON.stringify(newArry));
    } else {
      const oldData = JSON.parse(isData);
      const newId =oldData.length +1;
      this.appObj.AppId=newId;
      oldData.push(this.appObj);
      localStorage.setItem("AppData", JSON.stringify(oldData));
    }
    this.appObj = new AppObj();
    this.getAllApp();
   
  }

  getAllApp(){
    const isData = localStorage.getItem("AppData");
    if (isData !== null) {
      this.appArr = JSON.parse(isData);
    }
  }
   
  onReset( ) {
    this.appObj = new AppObj(); // Reset the form fields to initial empty state
  }

  onEdit(item:AppObj){
    this.appObj = item;
}


onDelete(item: AppObj) {
  const isData = localStorage.getItem("AppData");
  if (isData != null) {
    const localData: AppObj[] = JSON.parse(isData);

    // Find the index of the item to be deleted
    const index = localData.findIndex((data) => data.AppId === item.AppId);

    if (index !== -1) {
      // Show a confirmation alert before deleting the item
      const confirmation = confirm("Are you sure you want to delete this item?");
      if (confirmation) {
        // Use splice(index, 1) to remove the item from the array
        localData.splice(0, 1);
        localStorage.setItem("AppData", JSON.stringify(localData));
        this.getAllApp(); // Update the displayed data after deletion

        // Show a success alert after deletion
        alert("Item successfully deleted!");
      }
    }
  }
}



}







export class AppObj {
  AppId:number;
  Name: string;
  Designation: string;
  Salary:string;


  constructor() {
    this.AppId=0;
    this.Name = "";  
    this.Designation = "";
    this.Salary="";
 
  }
}