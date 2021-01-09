import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface IMenuItem {
  type: string; // Possible values: link/dropDown/separator/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService {
  constructor() {}
  iconMenu: IMenuItem[] = [
    
    {
      name: "Dashboard",
      type: "link",
      tooltip: "Dashboard",
      icon: "dashboard",
      state: "dashboard/analytics"
    },
    {
      name: "CONTROLLS",
      type: "separator"
    },
    {
      name: "Students",
      type: "link",
      tooltip: "Students",
      icon: "how_to_reg",
      state: "dashboard/students",
    },
    {
      name: "Employees",
      type: "link",
      icon: "people",
      state: "dashboard/employees"
    },
    {
      name: "Fees",
      type: "link",
      tooltip: "Fees",
      icon: "money",
      state: "dashboard/fees"
    },
    {
      name: "Expense",
      type: "link",
      tooltip: "Expense",
      icon: "money",
      state: "dashboard/expense"
    },
    {
      name: "Cafe",
      type: "link",
      icon: "coffee",
      state: "dashboard/caffe"
    },
    {
      name: "Attendance",
      type: "link",
      tooltip: "Attendance",
      icon: "list",
      state: "dashboard/attendance"
    },
    {
      name: "Inquiry",
      type: "link",
      tooltip: "Inquiry",
      icon: "format_align_center",
      state: "dashboard/inquiry",
    },
    {
      name: "Class",
      type: "link",
      icon: "library_books",
      state: "dashboard/class"
    },
    {
      name: "Reports",
      type: "link",
      icon: "present_to_all",
      state: "dashboard/reports"
    }
  ];


  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle: string = "Frequently Accessed";
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    this.menuItems.next(this.iconMenu);
  }
}
