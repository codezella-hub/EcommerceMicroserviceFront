import { Component } from '@angular/core';
import { Profile, ProfileService } from "../services/profile/profile.service";
import { MatDialog } from "@angular/material/dialog";
import { ProfileUpdateComponent } from "../profile-update/profile-update.component";
import {KeycloakService} from "../services/keycloak/keycloak.service";

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrls: ['./profile-show.component.scss']
})
export class ProfileShowComponent {
  userProfile?: Profile;
  userId!: string ;
  errorMsg?: string;

  constructor(
    private profileService: ProfileService,
    private dialog: MatDialog,
    private keycloakService: KeycloakService,
  ) {}

  ngOnInit(): void {
    this.userId= this.keycloakService.profile?.id || '';
    this.loadUserProfile(this.userId);
  }

  loadUserProfile(userId: string): void {
    this.profileService.showUserDetails(userId).subscribe({
      next: (data) => {
        this.userProfile = data;
        this.errorMsg = undefined;
      },
      error: (err) => {
        console.error('Erreur chargement profil', err);
        this.userProfile = {
          phoneNumber: '',
          address: '',
          birthDate: '',
          gender: '',
          bio: '',
          userId: this.userId
        };
        this.errorMsg = 'Veuillez modifier votre profil';
      }
    });
  }

  editProfile(): void {
    const dialogRef = this.dialog.open(ProfileUpdateComponent, {
      maxWidth: '95vw',
      width: '500px',
      data: this.userProfile
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        console.log("user id"+this.userId);
        this.profileService.updateUserDetails(this.userId, result).subscribe({
          next: (updated) => {
            this.userProfile = updated;
            this.errorMsg = undefined;
          },
          error: (err) => console.error('Erreur mise à jour', err)
        });
      }
    });
  }
}
