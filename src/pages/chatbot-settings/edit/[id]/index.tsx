import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getChatbotSettingById, updateChatbotSettingById } from 'apiSdk/chatbot-settings';
import { Error } from 'components/error';
import { chatbotSettingValidationSchema } from 'validationSchema/chatbot-settings';
import { ChatbotSettingInterface } from 'interfaces/chatbot-setting';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { getOrganizations } from 'apiSdk/organizations';
import { getUsers } from 'apiSdk/users';

function ChatbotSettingEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ChatbotSettingInterface>(
    () => (id ? `/chatbot-settings/${id}` : null),
    () => getChatbotSettingById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ChatbotSettingInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateChatbotSettingById(id, values);
      mutate(updated);
      resetForm();
      router.push('/chatbot-settings');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ChatbotSettingInterface>({
    initialValues: data,
    validationSchema: chatbotSettingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Chatbot Setting
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="setting_name" mb="4" isInvalid={!!formik.errors?.setting_name}>
              <FormLabel>Setting Name</FormLabel>
              <Input
                type="text"
                name="setting_name"
                value={formik.values?.setting_name}
                onChange={formik.handleChange}
              />
              {formik.errors.setting_name && <FormErrorMessage>{formik.errors?.setting_name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="setting_value" mb="4" isInvalid={!!formik.errors?.setting_value}>
              <FormLabel>Setting Value</FormLabel>
              <Input
                type="text"
                name="setting_value"
                value={formik.values?.setting_value}
                onChange={formik.handleChange}
              />
              {formik.errors.setting_value && <FormErrorMessage>{formik.errors?.setting_value}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<OrganizationInterface>
              formik={formik}
              name={'organization_id'}
              label={'Select Organization'}
              placeholder={'Select Organization'}
              fetcher={getOrganizations}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'chatbot_setting',
  operation: AccessOperationEnum.UPDATE,
})(ChatbotSettingEditPage);
