'use client';
import { getOrCreateConversationId } from '@/lib/helpers/getOrCreateSessionId';
import { useAskQuestionMutation } from '@/store/api/recoco/chatbotApi';
import { CommentOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Drawer, FloatButton } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface ConversationMessage {
  role: 'user' | 'system';
  content: string;
}

interface Props {
  facultyId: number;
}
const Chatbot = ({ facultyId }: Props) => {
  const [askMutation, { isLoading }] = useAskQuestionMutation();
  const messages = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [question, setQuestion] = React.useState<string>('');

  const [conversation, setConversation] = React.useState<ConversationMessage[]>(
    [
      // { role: 'system', content: 'Hola, soy Recoco' },
      // { role: 'system', content: '¿En qué puedo ayudarte?' },
    ]
  );

  const handleSendQuestion = async () => {
    const sessionId = getOrCreateConversationId();
    const q = question.trim();
    if (question.trim() === '') return;

    setConversation((prev) => [...prev, { role: 'user', content: q }]);
    setQuestion('');
    try {
      const resp = await askMutation({
        query: question,
        sessionId,
        facultyId,
      }).unwrap();
      setConversation((prev) => [
        ...prev,
        { role: 'system', content: resp.data.answer },
      ]);
      setQuestion('');
    } catch (error) {
      setConversation((prev) => [
        ...prev,
        {
          role: 'system',
          content:
            'Lo siento, no pude procesar tu pregunta. Inténtalo de nuevo',
        },
      ]);
    }
  };

  useEffect(() => {
    if (conversation.length > 0 && messages.current) {
      messages.current?.scrollTo({
        behavior: 'smooth',
        top: messages.current.scrollHeight,
      });
    }
  }, [conversation]);

  return (
    <>
      <FloatButton onClick={() => setOpen(true)} icon={<CommentOutlined />} />
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Chatea con Recoco"
        width={400}
        styles={{
          body: {
            padding: '12px',
          },
        }}
      >
        <div className="h-full flex flex-col w-full justify-end">
          <div ref={messages} className="overflow-hidden overflow-y-auto">
            <div className="px-4">
              {conversation.map((msg, index) => {
                if (msg.role === 'user') {
                  return (
                    <div
                      className="flex justify-end animate-app-fade-in relative"
                      key={index}
                      style={{ marginBottom: '10px' }}
                    >
                      <div className="bg-app-primary-dark text-white p-2 rounded ">
                        {msg.content}
                      </div>
                      <div
                        className="h-16 w-4 absolute top-0 -right-2 bg-app-primary-dark"
                        style={{
                          clipPath: 'polygon(0 21%, 0 0, 100% 0)',
                        }}
                      ></div>
                    </div>
                  );
                }
                if (msg.role === 'system') {
                  return (
                    <div
                      className="flex justify-start animate-app-fade-in relative"
                      key={index}
                      style={{ marginBottom: '10px' }}
                    >
                      <div className="bg-app-secondary text-white p-2 rounded ">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                      <div
                        className="h-16 w-4 absolute top-0 -left-2 bg-app-secondary"
                        style={{
                          clipPath: 'polygon(100% 21%, 0 0, 100% 0)',
                        }}
                      ></div>
                    </div>
                  );
                }
              })}
              <div
                className={clsx(
                  'bg-app-secondary duration-300 text-white rounded w-fit text-2xl px-1 leading-none animate-app-fade-in my-3',
                  {
                    'opacity-0': !isLoading,
                    'opacity-100': isLoading,
                  }
                )}
              >
                <EllipsisOutlined className="animate-pulse block" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 items-end px-4">
            <div className="w-full">
              <TextArea
                value={question}
                count={{
                  max: 300,
                  show: true,
                }}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Escribe tu pregunta aquí..."
                onPressEnter={(e) => {
                  e.preventDefault();
                  if (question.trim() === '' || isLoading) return;
                  handleSendQuestion();
                }}
                rows={4}
                style={{ width: '100%' }}
                autoSize={{
                  minRows: 4,
                }}
              />
            </div>
            <Button
              disabled={!question || isLoading}
              type="primary"
              onClick={handleSendQuestion}
            >
              Preguntar
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Chatbot;
