import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export default async function handler(req: Request, res: Response) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
        const { email } = req.body as { email?: string };
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }
        const dataDir = path.join(process.cwd(), 'data');
        const filePath = path.join(dataDir, 'emails.json');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
        }
        let list: Array<{ email: string; ts: string }>;
        try {
            const raw = fs.readFileSync(filePath, 'utf-8');
            list = JSON.parse(raw);
        } catch {
            list = [];
        }
        const entry = { email, ts: new Date().toISOString() };
        // Prevent duplicates
        if (!list.some((e) => e.email === email)) {
            list.push(entry);
        }
        fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
        return res.status(200).json({ success: true, count: list.length });
    } catch (err) {
        console.error('collect-email error', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
