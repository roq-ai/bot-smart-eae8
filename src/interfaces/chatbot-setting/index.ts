import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ChatbotSettingInterface {
  id?: string;
  setting_name: string;
  setting_value: string;
  organization_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ChatbotSettingGetQueryInterface extends GetQueryInterface {
  id?: string;
  setting_name?: string;
  setting_value?: string;
  organization_id?: string;
  user_id?: string;
}
