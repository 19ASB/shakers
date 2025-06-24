import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(){
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const usuarios = await db.collection('usuarios').find({}).toArray();
        return NextResponse.json(usuarios);
    }catch (error) {
        console.error('Error fetching usuarios:', error);
        return NextResponse.json({ error: 'Error al conectar con MongoDB' }, { status: 500 });
    }
}