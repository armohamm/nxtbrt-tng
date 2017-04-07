import fs from 'fs';
import path from 'path';

export const ETD_RESPONSE = fs.readFileSync(path.resolve(__dirname,'etd-response.xml')).toString();
