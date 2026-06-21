/**
 * tutorClient — streaming client for the dev.el AI Tutor (FastAPI) service.
 *
 * Reuses the platform's auth convention: the JWT is read from
 * localStorage.userInfo.token (same as utils/authFetch). The /chat endpoint streams
 * Server-Sent Events as `data: {json}\n\n` frames; onEvent is called per frame.
 */
import { TUTOR_API_BASE_URL } from '../../../config';

function getToken() {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
    return userInfo?.token || '';
  } catch {
    return '';
  }
}

export async function streamChat(body, onEvent, signal) {
  const token = getToken();
  const res = await fetch(`${TUTOR_API_BASE_URL}/api/v1/tutor/chat`, {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok || !res.body) {
    throw new Error(`Tutor service returned ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const frames = buffer.split('\n\n');
    buffer = frames.pop();
    for (const frame of frames) {
      const dataLine = frame.split('\n').find((l) => l.startsWith('data:'));
      if (!dataLine) continue;
      try {
        onEvent(JSON.parse(dataLine.slice(5).trim()));
      } catch {
        /* ignore malformed keep-alive frames */
      }
    }
  }
}

export async function fetchSuggestions(lessonId) {
  try {
    const token = getToken();
    const res = await fetch(
      `${TUTOR_API_BASE_URL}/api/v1/tutor/suggestions?lessonId=${encodeURIComponent(lessonId || '')}`,
      { headers: token ? { Authorization: `Bearer ${token}` } : {} },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch {
    return [];
  }
}
