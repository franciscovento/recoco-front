import { v4 as uuidv4 } from 'uuid';
function getOrCreateConversationId() {
  let sessionId = localStorage.getItem('conversation_id');

  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('conversation_id', sessionId);
  }

  return sessionId;
}

export { getOrCreateConversationId };
