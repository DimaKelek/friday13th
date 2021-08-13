import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {AuthActionsType, authSlice} from "./auth-reducer";
import {RegistrationActionsType, registrationReducer} from "./registration-reducer";
import {RecoveryPassActionsType, recoveryPassReducer} from "./recovery-pass-reducer";
import {AppActionsType, appSlice} from "./app-reducer";
import {decksSlice} from "./decks-reducer";
import {cardsSlice} from "./cards-reducer";
import {learningSlice} from "./learning-reducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authSlice.reducer,
    registration: registrationReducer,
    recovery: recoveryPassReducer,
    app: appSlice.reducer,
    decks: decksSlice.reducer,
    cards: cardsSlice.reducer,
    learning: learningSlice.reducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// types
export type AppStoreType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AllAppActionsType>
export type AllAppActionsType =
    ProfileActionsType
    | AuthActionsType
    | RegistrationActionsType
    | RecoveryPassActionsType
    | AppActionsType
export type AppDispatchType = typeof store.dispatch
export type ThunkApiType = {
    dispatch: AppDispatchType,
    state: AppStoreType,
    rejectValue: string
}
//@ts-ignore
window.store = store