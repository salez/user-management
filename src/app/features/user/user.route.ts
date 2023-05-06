import { Route } from "@angular/router";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { UserComponent } from "./components/user/user.component";

export const USER_ROUTES: Route[] = [
  {
    path: '', component: UserComponent, children: [
      { path: '', component: UserListComponent },
      { path: 'create', component: UserEditComponent },
      { path: 'user/:id', component: UserEditComponent },
    ]
  },

]