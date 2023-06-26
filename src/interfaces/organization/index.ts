import { ChatbotSettingInterface } from 'interfaces/chatbot-setting';
import { DataSourceInterface } from 'interfaces/data-source';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  chatbot_setting?: ChatbotSettingInterface[];
  data_source?: DataSourceInterface[];
  user?: UserInterface;
  _count?: {
    chatbot_setting?: number;
    data_source?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
