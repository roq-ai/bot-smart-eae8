import axios from 'axios';
import queryString from 'query-string';
import { ChatbotSettingInterface, ChatbotSettingGetQueryInterface } from 'interfaces/chatbot-setting';
import { GetQueryInterface } from '../../interfaces';

export const getChatbotSettings = async (query?: ChatbotSettingGetQueryInterface) => {
  const response = await axios.get(`/api/chatbot-settings${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createChatbotSetting = async (chatbotSetting: ChatbotSettingInterface) => {
  const response = await axios.post('/api/chatbot-settings', chatbotSetting);
  return response.data;
};

export const updateChatbotSettingById = async (id: string, chatbotSetting: ChatbotSettingInterface) => {
  const response = await axios.put(`/api/chatbot-settings/${id}`, chatbotSetting);
  return response.data;
};

export const getChatbotSettingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/chatbot-settings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteChatbotSettingById = async (id: string) => {
  const response = await axios.delete(`/api/chatbot-settings/${id}`);
  return response.data;
};
