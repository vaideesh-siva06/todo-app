import dbConnect from '../../lib/dbConnect.js';
import TodoModel from '../../models/TodoModel.js';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
    await dbConnect();

    const todoItems = await TodoModel.find({}).sort({createdAt: -1});
    return NextResponse.json(todoItems);
}

export async function POST(req: Request) {
    await dbConnect();

    const body = await req.json();
    const todoItems = await TodoModel.create(body);

    return NextResponse.json(todoItems);
}