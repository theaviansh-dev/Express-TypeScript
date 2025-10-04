const cors = require('cors');

export default function CORS(app: any) {
    const tempM: string = process.env.CORS_ALLOWED ?? '*';
    if (tempM.includes('[') && tempM.includes(']')) {
        try {
            const urlArray: string[] = JSON.parse(tempM.replace(/'/g, '"'));
            const corsOptions = {
                origin: function (origin: string, callback: (err: Error | null, allow?: boolean) => void) {
                    if (!origin || urlArray.includes(origin)) {
                        callback(null, true);
                    } else { console.warn('Origin not allowed by CORS:', origin); callback(new Error('Not allowed by CORS')); }
                }
            };
            app.use(cors(corsOptions));
        } catch (e) { console.error('Failed to parse CORS_ALLOWED:', e); app.use(cors()); }
    } else { console.log('Cors Allowed: *'); app.use(cors()); }
}