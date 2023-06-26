import * as yup from 'yup';

export const chatbotSettingValidationSchema = yup.object().shape({
  setting_name: yup.string().required(),
  setting_value: yup.string().required(),
  organization_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
