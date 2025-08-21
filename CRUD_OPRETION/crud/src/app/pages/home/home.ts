import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../services/service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
    @ViewChild('closebutton') closebutton: any;
  StudentData: any;

  Editform: FormGroup
  errmag: string = "";
  singlestudent: any;
  constructor(private _srv: Service, private _fb: FormBuilder) {
    this.Editform = this._fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  ngOnInit() {
   this. getalldata()
  }

  getalldata(){
     this._srv.GetStudentData().subscribe((res: any) => {
      if (res.status == 200) {
        this.StudentData = res.data
      } else {
        console.log(res.message);
      }
    })
  }

  getbyId(item:any){
  let id=  item._id
    this._srv.GetStudentbyId(id).subscribe((res:any)=>{
            this.singlestudent = res.data                 
    })
    this.Editform.patchValue( this.singlestudent)
  }
  onSubmit() {
    debugger
    if (this.Editform.invalid) {
      this.errmag = "form is not valid Please enter currect information"
      return
    } else {
   let id = this.singlestudent._id
      this._srv.EditStudentifo(id,this.Editform.value).subscribe((res:any)=>{
        console.log(res);
      })
      this.closebutton.nativeElement.click();   
    }
  }

  alert(item:any){
    let id = item._id
    alert("do you want to delete data")
   this._srv.deletestudent(id).subscribe((res:any)=>{
     console.log(res);   
   })
   this. getalldata()
  }

}
