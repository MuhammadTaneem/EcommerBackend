import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AccordionModule,
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  OffcanvasModule,
  PaginationModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  SpinnerModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';


let arr = [
  CommonModule,
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  OffcanvasModule,
  TooltipModule,
  PaginationModule,
  AccordionModule,
  SpinnerModule,
]

@NgModule({
  declarations: [],
  imports: [
    arr,
  ],
  exports: [
    arr,
  ]
})
export class CoreuiModule {
}
