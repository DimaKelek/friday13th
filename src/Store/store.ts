import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {AuthActionsType, authReducer} from "./auth-reducer";
import {RegistrationActionsType, registrationReducer} from "./registration-reducer";
import {NewPassActionsType, newPassReducer} from "./new-pass-reducer";
import {RecoveryPassActionsType, recoveryPassReducer} from "./recovery-pass-reducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    registration: registrationReducer,
    newPass: newPassReducer,
    recovery: recoveryPassReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// types
export type AppStoreType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AllAppActionsType>
export type AllAppActionsType =
    ProfileActionsType
    | AuthActionsType
    | NewPassActionsType
    | RegistrationActionsType
    | RecoveryPassActionsType

//@ts-ignore
window.store = store