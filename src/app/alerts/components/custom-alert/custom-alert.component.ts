import { Component } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { customAlert } from 'src/app/model/custom-alert';
import { CustomAlertService } from 'src/app/shared/custom-alert.service';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss']
})
export class CustomAlertComponent {
  disableSelect:any;
  selected!: Date;
  //wellName:any[]=['Well 1','Well 2','Well 3'];
  well:any[]=[{
    wellId:"W001",
    wellName:"Well1"
    },
    {
      wellId:"W002",
      wellName:"Well2"
    },
    {
      wellId:"W003",
      wellName:"Well3"
    },];
  notification:any=['Text','Email'];
  priority:any=['High','Medium','Low'];
  category:any=['Fluid Pound Events','Current SPM','Current PF','Load'];
  operator:any=['=','<>','>','<'];
  value:any=['Any numerical value','Max load','Min load'];
  isActive:boolean=false;
  obj: any;
  customAlerts: customAlert[]=[];
  customAlert: customAlert=
      {
        id:0,
        wellName:"",
        customAlertName:"",
        //wellId:"",        
        notificationType:"",
        priority:"",
        category:"",
        operator:"",
        value:"",
        isActive:false
      };

    constructor(private fb: FormBuilder,private CustomAlertService:CustomAlertService ) {}
    ngOnInit() {
      this.getAlertDetails();
    }
    customAlertForm = this.fb.group({
      CustomAlertName: ['', [Validators.required]],
      wellName: ['', [Validators.required]],
      NotificationType: ['', [Validators.required]],
      Priority: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      Operator: ['', [Validators.required]],
      Value: ['', [Validators.required]],
      IsActive: ['', [Validators.required]],
    });

    alertData!: customAlert[];
    public displayedColumns = ['customAlertName', 'wellName', 'action'];
    dataSource:any;

    getAlertDetails(){
      this.CustomAlertService.displayDetails()
        .subscribe((res)=>{
          console.log(res);
          this.alertData = res;
          this.dataSource = new MatTableDataSource<customAlert>(this.alertData);
          
        })
    }
    // onWellChange(event: MatSelectChange): void {
      
    //   //this.customAlert.wellId = event.value;
    //   this.customAlert.WellName = event.source.triggerValue;
     
    //   console.log(this.customAlert.WellName);
    // }

    // onNotificationChange(event: MatSelectChange): void {
    //   this.customAlert.notification = event.value;
    //   console.log(this.customAlert.notification);
    // }

    // onPriorityChange(event: MatSelectChange): void {
    //   this.customAlert.priority = event.value;
    //   console.log(this.customAlert.priority);
    // }
    
    // onCategoryChange(event: MatSelectChange): void {
    //   this.customAlert.category = event.value;
    // }
    
    // onOperatorChange(event: MatSelectChange): void {
    //   this.customAlert.operator = event.value;
    //   console.log(this.customAlert.operator);
    // }

    // onValueChange(event: MatSelectChange): void {
    //   this.customAlert.value = event.value;
    //   console.log(this.customAlert.value);
    // }
    onSubmit(){
      this.obj = this.customAlertForm.value;
      //this.customAlert.
      console.log(this.customAlertForm);
      this.CustomAlertService.addCustomAlert(this.obj).subscribe((res)=>{        
          console.log(res);
          this.getAlertDetails();       
      });
    }

    editAlert(id:number)
    {
      this.CustomAlertService.getDetails(id).subscribe((res)=>{
          console.log(res);
          
          this.dataSource = new MatTableDataSource<customAlert>(this.alertData);
          // this.customAlertForm.patchValue({            
          //   CustomAlertName:res.customAlertName,
          //   wellName:res.wellName,
          //   //IsActive:res.isActive
          // })
          this.isActive=res.isActive;
          this.customAlertForm.controls.wellName.setValue(res.wellName);
          this.customAlertForm.controls.CustomAlertName.setValue(res.customAlertName);
        })
    }
    deleteAlert(id:number)
    {
      this.CustomAlertService.deleteCustomAlert(id).subscribe((res)=>{
        this.getAlertDetails();
      })
    }
    toggle(id:number,event:any){
      let val=event.checked;
      this.CustomAlertService.isActiveCustomAlert(id,val).subscribe((res)=>{
        
      })
    }
}
