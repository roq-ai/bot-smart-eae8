import * as yup from 'yup';

export const dataSourceValidationSchema = yup.object().shape({
  type: yup.string().required(),
  url: yup.string(),
  file_name: yup.string(),
  organization_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
