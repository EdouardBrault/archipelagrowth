import { existsSync } from 'fs';
console.log('check-public llm.txt:', existsSync('public/llm.txt') ? 'FOUND' : 'MISSING');