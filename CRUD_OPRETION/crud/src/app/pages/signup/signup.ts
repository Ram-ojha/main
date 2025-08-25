import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
   standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup implements OnInit {

  SignUpForm: FormGroup
    submitted = false;

  constructor(private _fb: FormBuilder) {
    this.SignUpForm = this._fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required,Validators.max(10)],
      gender: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {

  }

 get f(): { [key: string]: AbstractControl } {
    return this.SignUpForm.controls;
  }
Signup(){
  debugger
  console.log(this.SignUpForm.value);
  if(this.SignUpForm.invalid){
    this.submitted =true
return
  }
  
}

}
