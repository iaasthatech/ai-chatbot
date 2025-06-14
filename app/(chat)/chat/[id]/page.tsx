'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Chat } from '@/components/chat';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import type { Attachment, UIMessage } from 'ai';
import { apiClient } from '@/lib/api-client';

type DBMessage = {
  id: string;
  role: string;
  parts: any[];
  attachments: Attachment[];
  createdAt: Date;
};

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [chat, setChat] = useState<any>(null);
  const [messages, setMessages] = useState<Array<UIMessage>>([]);
  const [selectedModel, setSelectedModel] = useState(DEFAULT_CHAT_MODEL);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const chatData = await apiClient.getChat(id);
        if (!chatData) {
          router.push('/404');
          return;
        }

        if (chatData.visibility === 'private') {
          if (!token) {
            router.push('/404');
            return;
          }
        }

        const messagesFromDb = await apiClient.getMessagesInChat(id);
        const convertedMessages = convertToUIMessages(messagesFromDb);
        const chatModel = localStorage.getItem('model') || DEFAULT_CHAT_MODEL;

        setChat(chatData);
        setMessages(convertedMessages);
        setSelectedModel(chatModel);
      } catch (error) {
        console.error('Error fetching chat data:', error);
        router.push('/404');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  function convertToUIMessages(messages: Array<DBMessage>): Array<UIMessage> {
    return messages.map((message) => ({
      id: message.id,
      parts: message.parts as UIMessage['parts'],
      role: message.role as UIMessage['role'],
      content: '',
      createdAt: message.createdAt,
      experimental_attachments:
        (message.attachments as Array<Attachment>) ?? [],
    }));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!chat) {
    return null;
  }

  return (
    <>
      <Chat
        id={chat.id}
        initialMessages={messages}
        selectedChatModel={selectedModel}
        selectedVisibilityType={chat.visibility}
        isReadonly={false} // You might want to implement proper readonly logic based on user permissions
        // session={{ 
        //   user: { id: '1', email: 'user@example.com', type: 'regular' },
        //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
        // }}
      />
      <DataStreamHandler id={id} />
    </>
  );
}

