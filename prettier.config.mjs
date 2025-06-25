// prettier.config.mjs
import { createJiti } from 'jiti';
import { fileURLToPath } from 'url';

const jiti = createJiti(fileURLToPath(import.meta.url));
const config = await jiti.import('./src/prettier.ts');

export default config.default;
