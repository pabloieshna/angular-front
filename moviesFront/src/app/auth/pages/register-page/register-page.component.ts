import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterUser } from '../../interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  })


  onRegister() {

    const body = this.myForm.value;
    console.log(this.myForm.value)
    this.authService.register( body )
    .subscribe({
      next: () => {
        console.log('Hola')
        Swal.fire('Bienvenido', 'Tu cuenta ha sido creada','success');
        this.router.navigateByUrl('/auth/login');
      },
      error: ({message}) => {
        Swal.fire('Error', message,'error');
      }
    })
  }
 }

