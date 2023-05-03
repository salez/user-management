import { Route } from "@angular/router";
import { UserListComponent } from "./components/user-list/user-list.component";

export const USER_ROUTES: Route[] = [ 
  {path: '', component: UserListComponent}, 
]