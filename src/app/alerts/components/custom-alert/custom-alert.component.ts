import { Component, EventEmitter, Input, NgZone, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { customAlert } from 'src/app/model/custom-alert';
import { CustomAlertService } from 'src/app/shared/custom-alert.service';
import { ThemePalette } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss']
})
export class CustomAlertComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  customTime: any;
  date = new Date();
  public disabled = false;
  public showSpinners = true;
  public showSeconds = true;
  public touchUi = false;
  public enableMeridian = false; 
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  startDate:any;
  endDate:any;
  disableSelect:any;
  selected!: Date;
  well:any[]=[{wellId:"W001",wellName:"Well1" },{wellId:"W002",wellName:"Well2"},{wellId:"W003",wellName:"Well3"},];
  notification:any=['Text','Email'];
  priority:any=['High','Medium','Low'];
  category:any=['Fluid Pound Events','Current SPM','Current PF','Load'];
  operator:any=['=','<>','>','<'];
  value:any=['Any numerical value','Max load','Min load'];
  isActive:boolean=true;
  customAlerts: customAlert[]=[];
  customAlert: customAlert=
      {
        id:0,
        wellName:"",
        customAlertName:"",      
        notificationType:"",
        priority:"",
        category:"",
        operator:"",
        value:"",
        isActive:false,
        startDate:"",
        endDate:""
      };
      @Input() selectedRangeValue!: DateRange<Date>;
      @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();
    constructor(private fb: FormBuilder,private CustomAlertService:CustomAlertService ,private zone: NgZone) {
     
    }
    ngOnInit() {
      this.getAlertDetails();
    }
      public dateControl = new FormControl(new Date(2021,9,4,5,6,7));
      public dateControlMinMax = new FormControl(new Date());
      customAlertForm = this.fb.group({
      CustomAlertName: ['', [Validators.required]],
      wellName: ['', [Validators.required]],
      NotificationType: ['', [Validators.required]],
      Priority: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      Operator: ['', [Validators.required]],
      Value: ['', [Validators.required]],
      IsActive: ['', [Validators.required]]      
    });

    alertData!: customAlert[];
    public displayedColumns = ['customAlertName', 'wellName', 'action'];
    dataSource:any;

    selectedChange(m: any) {
      if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
        this.selectedRangeValue = new DateRange<Date>(m, null);
      } else {
        const start = this.selectedRangeValue.start;
        const end = m;
        if (end < start) {
          this.selectedRangeValue = new DateRange<Date>(end, start);
        } else {
          this.selectedRangeValue = new DateRange<Date>(start, end);
        }
      }
      this.selectedRangeValueChange.emit(this.selectedRangeValue);
    }
    
    getAlertDetails(){
      this.CustomAlertService.displayDetails()
        .subscribe((res)=>{
          this.alertData = res;
          this.dataSource = new MatTableDataSource<customAlert>(this.alertData);
          this.dataSource.paginator = this.paginator;
        })
    }

    getSelectedMonth(month: any){
      let m = month + 1;
      return m.toString().padStart(2,'0');
    }
  
    getSelectedDay(day: any){
      return day.toString().padStart(2,'0');
    }
  
    applyDateRangeFilter() {
      let fromDate = this.selectedRangeValue.start;
      let toDate = this.selectedRangeValue.end;
      this.startDate = fromDate?.getFullYear() + '-' + this.getSelectedMonth(fromDate?.getMonth()) + '-' + this.getSelectedDay(fromDate?.getDate());
      this.endDate = toDate?.getFullYear() + '-' + this.getSelectedMonth(toDate?.getMonth()) + '-' + this.getSelectedDay(toDate?.getDate()); 
    }

    onSubmit(){
      let obj:any;
      let timeZone = this.date.toISOString().slice(-4);
      let time = this.date.toTimeString().slice(0,8);
      let customTime = "T" + time + "." + timeZone;
      this.applyDateRangeFilter();
      this.startDate = this.startDate +  customTime;      
      this.endDate = this.endDate +  customTime;
      obj = { 
        wellName:this.customAlertForm.value.wellName,
        customAlertName:this.customAlertForm.value.CustomAlertName,     
        notificationType:this.customAlertForm.value.NotificationType,
        priority:this.customAlertForm.value.Priority,
        category:this.customAlertForm.value.Category,
        operator:this.customAlertForm.value.Operator,
        value:this.customAlertForm.value.Value,
        isActive:this.customAlertForm.value.IsActive,
        startDate:this.startDate,
        endDate:this.endDate
      }
      console.log(obj);
      this.CustomAlertService.addCustomAlert(obj).subscribe((res)=>{   
        console.log(res);
        if(res!=null)
        {
          alert("Records added successfully");
        }     
          this.getAlertDetails();     
          this.clear();
      });
    }

    editAlert(id:number)
    {
      this.CustomAlertService.getDetails(id).subscribe((res)=>{          
          this.dataSource = new MatTableDataSource<customAlert>(this.alertData);
          this.isActive=res.isActive;
          this.customAlertForm.controls.wellName.setValue(res.wellName);
          this.customAlertForm.controls.CustomAlertName.setValue(res.customAlertName);
          this.dataSource.paginator = this.paginator;
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

    clear()
    {
      this.customAlertForm.get('CustomAlertName')?.reset();
      this.customAlertForm.get('wellName')?.reset();
      this.customAlertForm.get('NotificationType')?.reset();
      this.customAlertForm.get('Priority')?.reset();
      this.customAlertForm.get('Category')?.reset();
      this.customAlertForm.get('Operator')?.reset();
      this.customAlertForm.get('Value')?.reset();
    }
}
