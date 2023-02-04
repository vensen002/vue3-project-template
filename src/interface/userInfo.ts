export class UserInfo {
  public roles?: string;
  public phonenumber?: string;
  public loginDate?: number;
  public avatar?: string;
  public password?: string;
  public id?: number;
  public email?: string;
  public username?: string;
  public status?: string;
}

export class MenuInfo {
  public icon?: string;
  public orderNum?: number;
  public updateTime?: number;
  public remark?: string;
  public parentId?: number;
  public path?: string;
  public component?: string;
  public children?: MenuInfo[];
  public createTime?: number;
  public name?: string;
  public menuType?: string;
  public perms?: string;
  public id?: number;
}

