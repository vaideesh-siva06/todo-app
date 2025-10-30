import dbConnect from '../../../lib/dbConnect.js';
import TodoModel from '../../../models/TodoModel.js';
import { NextResponse, NextRequest } from 'next/server';

export async function DELETE(req: Request, { params }: { params: {id: any}}) {
    await dbConnect();

    const { id } = await params

    try {
        const todoItem = await TodoModel.findByIdAndDelete(id);
        return NextResponse.json({mssg: "item deleted"});
    } catch (error) {
        return NextResponse.json({ err: `Todo not found: ${error}` }, { status: 404 });
    }

}