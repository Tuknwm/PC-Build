import { prisma } from "@/scripts/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { id: string } },
) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  console.log("Fetching item with id:", id);
  try {
    const item = await prisma.item.findUnique({
      where: { id },
    });
    console.log("Found item:", item);
    if (item) {
      return NextResponse.json(item);
    }
    console.log("Item not found");
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const data = await request.json();
  const updatedItem = await prisma.item.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(updatedItem);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  await prisma.item.delete({
    where: { id: params.id },
  });
  return new Response(null, { status: 204 });
}
