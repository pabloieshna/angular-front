import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../auth/interfaces';
import { UserEdit } from '../../interfaces/user-edit.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject ( Router )

  public editUser: boolean = false;
  public userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      profileImg: [''],
      username: [''],
      favoriteGenres: [''],
      bio: ['']
    });

    this.loadUserData();
  }

  loadUserData(): void {
    const user = this.user;
    if (user) {
      const userData: UserEdit = {
        username: user.username ?? '',
        email: user.email ?? '',
        profileImg: user.profileImg ?? '',
        name: user.name ?? '',
        favoriteGenres: user.favoriteGenres ?? null,
        bio: user.bio ?? ''
      };
      this.userForm.patchValue(userData);
    }

  }

  saveChanges(): void {

    console.log(this.user?._id)
    console.log(this.userForm.value)
    if (this.userForm.valid) {
      const id = this.user!._id;
      console.log(id)
      console.log(this.userForm.value)
      this.userService.updateUserProfile(id, this.userForm.value).subscribe({
        next: () => Swal.fire('Bravo', 'Sus datos han sido modificados', 'success'),
        error: ({ message }) => {
          Swal.fire('Error', message[0], 'error');
        }
      });
    }
    this.editUser = !this.editUser;
  }

  editPerfil(): void {
    this.editUser = !this.editUser;
  }

  changePhoto(): void {
    Swal.fire({
      title: 'Cambiar foto de perfil',
      input: 'text',
      inputLabel: 'Introduce la url de la foto',
      inputPlaceholder: 'https://ejemplo.com/foto.jpg',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Tienes que introducir una URL!';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.userForm.patchValue({ profileImg: result.value });
        this.user!.profileImg = result.value;
        Swal.fire('¡Guardada!', 'La foto de perfil ha sido cambiada.', 'success');
      }
    });
  }

  move(url: string) {
    this.router.navigateByUrl(url)
    }

  get user() {
    return this.authService.currentUser();
  }
}
