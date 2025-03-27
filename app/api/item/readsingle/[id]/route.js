import { NextResponse } from "next/server";
import { ItemModel } from "../../../../utils/schemaModels";
import connectDB from "../../../../utils/database";

export async function GET(request, context) {
    const params = context.params;
    try {
        await connectDB();
        const singleItem = await ItemModel.findById(params.id);
            return NextResponse.json({message: "アイテム読み取り成功(シングル)", singleItem});
    }catch(err) {
        return NextResponse.json({message: "アイテム読み取り失敗(シングル)"});
    }
}