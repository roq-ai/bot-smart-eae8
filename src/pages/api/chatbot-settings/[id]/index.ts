import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { chatbotSettingValidationSchema } from 'validationSchema/chatbot-settings';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.chatbot_setting
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getChatbotSettingById();
    case 'PUT':
      return updateChatbotSettingById();
    case 'DELETE':
      return deleteChatbotSettingById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getChatbotSettingById() {
    const data = await prisma.chatbot_setting.findFirst(convertQueryToPrismaUtil(req.query, 'chatbot_setting'));
    return res.status(200).json(data);
  }

  async function updateChatbotSettingById() {
    await chatbotSettingValidationSchema.validate(req.body);
    const data = await prisma.chatbot_setting.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteChatbotSettingById() {
    const data = await prisma.chatbot_setting.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
