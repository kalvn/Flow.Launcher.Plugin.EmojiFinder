import process from 'node:process';
import type { Arguments } from './types.js';
import { copy } from './actions/copy.js';
import { query } from './actions/query.js';

const args: Arguments = JSON.parse(process.argv[2] ?? '{}');
const { method, parameters } = args;

if (method === 'query') {
  query(parameters[0]);
}

if (method === 'copy') {
  copy(parameters[0]);
}
