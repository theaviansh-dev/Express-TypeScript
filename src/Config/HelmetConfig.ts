import helmet from "helmet";
import crypto from 'crypto';
import { HelmetOptions } from "helmet";
import { Request, Response, NextFunction } from 'express';

const helmetConfig: HelmetOptions = {
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: { policy: 'same-origin' },
    crossOriginResourcePolicy: { policy: 'same-origin' },
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            'default-src': ["'self'"],
            'script-src': ["'self'", "'nonce-<RANDOM_NONCE>'"],
            'style-src': ["'self'", "'unsafe-inline'"],
            'img-src': ["'self'", 'data:', 'https:'],
            'font-src': ["'self'", 'https:', 'data:'],
            'connect-src': ["'self'", 'https:'],
            'object-src': ["'none'"],
            'frame-ancestors': ["'none'"],
            'upgrade-insecure-requests': [],
        },
    },
    dnsPrefetchControl: { allow: false },
    frameguard: { action: 'deny' },
    hidePoweredBy: false,
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    noSniff: true,
    originAgentCluster: true,
    referrerPolicy: { policy: 'no-referrer' },
};

const NonceHelmet = (req: Request, res: Response, next: NextFunction) => {
    const nonce = crypto.randomUUID();
    res.locals.nonce = nonce;

    const dynamicConfig = JSON.parse(
        JSON.stringify(helmetConfig).replace(/<RANDOM_NONCE>/g, nonce)
    );

    helmet(dynamicConfig)(req, res, () => {
        res.setHeader('X-Powered-By', 'Express');
        res.setHeader('Server', 'ExpressJS');
        next();
    });
};

export default NonceHelmet;