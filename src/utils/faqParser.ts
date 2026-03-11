import { FaqItem } from '@/types/blog';

/**
 * Parse FAQ text into structured FaqItem array
 * Supports multiple formats:
 * - Q: / R: format
 * - Question? followed by answer
 * - Numbered questions (1. Question?)
 * - Markdown bold (**Question**)
 * - Dash/bullet format (- Question?)
 */
export const parseFaqFromText = (text: string): FaqItem[] => {
  const faqs: FaqItem[] = [];
  const lines = text.trim().split('\n');
  
  let currentQuestion = '';
  let currentAnswer = '';
  
  const isQuestionLine = (line: string): boolean => {
    const trimmed = line.trim();
    
    // Q: format
    if (/^q\s*[:\.]/i.test(trimmed)) return true;
    
    // Question: format
    if (/^question\s*[:\.]/i.test(trimmed)) return true;
    
    // Numbered question (1. or 1) followed by text ending with ?)
    if (/^\d+[\.\)]\s*.+\?$/.test(trimmed)) return true;
    
    // Markdown bold question (**text**)
    if (/^\*\*.+\*\*\s*\??$/.test(trimmed)) return true;
    
    // Dash or bullet with question
    if (/^[-•]\s*.+\?$/.test(trimmed)) return true;
    
    // Line ending with ? that's reasonably short (likely a question)
    if (trimmed.endsWith('?') && trimmed.length < 200) return true;
    
    return false;
  };
  
  const isAnswerLine = (line: string): boolean => {
    const trimmed = line.trim();
    
    // R: format
    if (/^r\s*[:\.]/i.test(trimmed)) return true;
    
    // Réponse: format
    if (/^r[ée]ponse\s*[:\.]/i.test(trimmed)) return true;
    
    // A: format
    if (/^a\s*[:\.]/i.test(trimmed)) return true;
    
    // Answer: format
    if (/^answer\s*[:\.]/i.test(trimmed)) return true;
    
    return false;
  };
  
  const cleanQuestion = (text: string): string => {
    let cleaned = text.trim();
    
    // Remove Q:, Question:, etc.
    cleaned = cleaned.replace(/^q\s*[:\.]\s*/i, '');
    cleaned = cleaned.replace(/^question\s*[:\.]\s*/i, '');
    
    // Remove numbering
    cleaned = cleaned.replace(/^\d+[\.\)]\s*/, '');
    
    // Remove markdown bold
    cleaned = cleaned.replace(/^\*\*(.+)\*\*\s*\??$/, '$1');
    
    // Remove dash/bullet
    cleaned = cleaned.replace(/^[-•]\s*/, '');
    
    // Add ? if missing
    if (!cleaned.endsWith('?')) {
      cleaned += '?';
    }
    
    return cleaned.trim();
  };
  
  const cleanAnswer = (text: string): string => {
    let cleaned = text.trim();
    
    // Remove R:, Réponse:, A:, Answer:, etc.
    cleaned = cleaned.replace(/^r\s*[:\.]\s*/i, '');
    cleaned = cleaned.replace(/^r[ée]ponse\s*[:\.]\s*/i, '');
    cleaned = cleaned.replace(/^a\s*[:\.]\s*/i, '');
    cleaned = cleaned.replace(/^answer\s*[:\.]\s*/i, '');
    
    return cleaned.trim();
  };
  
  const saveCurrentFaq = () => {
    if (currentQuestion && currentAnswer.trim()) {
      faqs.push({
        question: cleanQuestion(currentQuestion),
        answer: cleanAnswer(currentAnswer.trim())
      });
    }
    currentQuestion = '';
    currentAnswer = '';
  };
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Skip empty lines between Q/A pairs
    if (!trimmed) {
      continue;
    }
    
    // Check if this is a new question
    if (isQuestionLine(trimmed)) {
      // Save previous Q/A if exists
      saveCurrentFaq();
      currentQuestion = trimmed;
    } else if (isAnswerLine(trimmed)) {
      // Start of answer with marker
      currentAnswer = trimmed;
    } else if (currentQuestion) {
      // This is part of the answer
      if (currentAnswer) {
        currentAnswer += '\n' + trimmed;
      } else {
        currentAnswer = trimmed;
      }
    }
  }
  
  // Don't forget the last Q/A pair
  saveCurrentFaq();
  
  return faqs;
};

/**
 * Detect the format of the pasted text
 */
export const detectFaqFormat = (text: string): string => {
  if (/^q\s*[:\.]/im.test(text)) return 'Q:/R:';
  if (/^question\s*[:\.]/im.test(text)) return 'Question:/Réponse:';
  if (/^\d+[\.\)]/m.test(text)) return 'Numéroté';
  if (/^\*\*.+\*\*/m.test(text)) return 'Markdown';
  if (/^[-•]\s*.+\?/m.test(text)) return 'Liste';
  if (/\?[\s\n]/m.test(text)) return 'Questions terminant par ?';
  return 'Auto-détection';
};

/**
 * Validate parsed FAQ items
 */
export const validateParsedFaq = (faqs: FaqItem[]): { valid: FaqItem[], warnings: string[] } => {
  const valid: FaqItem[] = [];
  const warnings: string[] = [];
  
  faqs.forEach((faq, index) => {
    if (!faq.question.trim()) {
      warnings.push(`FAQ ${index + 1}: Question vide ignorée`);
      return;
    }
    if (!faq.answer.trim()) {
      warnings.push(`FAQ ${index + 1}: "${faq.question.substring(0, 30)}..." n'a pas de réponse`);
      return;
    }
    if (faq.answer.length < 10) {
      warnings.push(`FAQ ${index + 1}: La réponse semble très courte`);
    }
    valid.push(faq);
  });
  
  return { valid, warnings };
};
