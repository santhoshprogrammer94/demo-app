import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from } from 'rxjs';
import { SignInRequest } from './sign_in_request';
import { SignInResponse } from './sign_in_response';
import {State } from '../../shared/utils/state';
import { BaseApiService } from "../../shared/services/base-api.service";
import { AuthHelperService } from '../../shared/services/auth-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SignInService extends BaseApiService {

  constructor(http: HttpClient, authService: AuthHelperService) {
    super(http, authService);
  }

  private readonly _signIn = new BehaviorSubject<State<SignInResponse>>(new State<SignInResponse>(null));
  readonly signIn$ = this._signIn.asObservable();

  execute(data:Partial<SignInRequest>) {
    const response = new State<SignInResponse>(this._signIn);
    response.notifyLoading();
    super.post('api/users/signin',data,false).subscribe((res:any) => {
      response.notifySuccess(res);
    }, err => {
      response.notifyError('Failed');
    });
  }

}
