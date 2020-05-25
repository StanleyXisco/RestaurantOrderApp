import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNIN = 'SINGIN';
export const SIGNUP = 'SINGUP';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN'


export class TrySignin implements Action {
    readonly type = TRY_SIGNIN;

    constructor(public payload: { username: string, password: string}) {}
}

export class TrySignup implements Action {
    readonly type = TRY_SIGNUP;

    constructor(public payload: { username: string, password: string}) {}
}

export class SignIn implements Action {
    readonly type = SIGNIN;

}

export class SignUp implements Action {
    readonly type = SIGNUP;
}

export class LogOut implements Action {
    readonly type = LOGOUT;
}

export class Set_Token implements Action {
    readonly type = SET_TOKEN;

    constructor(public payload: string) {}
}

export type AuthActions  = SignIn | SignUp | LogOut | Set_Token | TrySignup | TrySignin;