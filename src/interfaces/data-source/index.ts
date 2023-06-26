import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DataSourceInterface {
  id?: string;
  type: string;
  url?: string;
  file_name?: string;
  organization_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  user?: UserInterface;
  _count?: {};
}

export interface DataSourceGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  url?: string;
  file_name?: string;
  organization_id?: string;
  user_id?: string;
}
