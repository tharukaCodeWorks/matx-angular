import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormControl,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { CustomValidators } from "ngx-custom-validators";
import { matxAnimations } from "app/shared/animations/matx-animations";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
  animations: matxAnimations
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loginSuccess: boolean = false;
  loginFailed: boolean = false;

  constructor(private fb: FormBuilder, private jwtAuthService:JwtAuthService) {}

  ngOnInit() {
    const password = new FormControl("", Validators.required);
    const confirmPassword = new FormControl(
      "",
      CustomValidators.equalTo(password)
    );

    this.signupForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: password,
      agreed: [false, Validators.required]
    });
  }

  onSubmit() {
    if (!this.signupForm.invalid) {
      this.loginSuccess = false;
      this.loginFailed = false;

      this.jwtAuthService.signup(
        this.signupForm.get("username").value,
        this.signupForm.get("email").value,
        this.signupForm.get("password").value
      ).subscribe(res=>{
        this.loginSuccess = true;
      }, error=>{
        this.loginFailed = true;
      });
      // do what you wnat with your data
      // console.log(res);
    }
  }
}
