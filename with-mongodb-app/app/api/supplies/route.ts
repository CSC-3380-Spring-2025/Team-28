import connectionToDatabase from "@/lib/mongoose";
import Supplies from "@/models/supplies";
import { NextResponse } from "next/server";

export async function POST(request: {
  json: () =>
    | PromiseLike<{ tableArray: Array<Array<any>> }>
    | { tableArray: Array<any> };
}) {
  const { tableArray } = await request.json();
  return tableArray;
}
