import { prisma } from "@/scripts/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await prisma.item.findMany();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const {
    name,
    cpu,
    gpu,
    ram,
    ssd,
    motherboard,
    casing,
    cooler,
    totalWatt,
    recommendedPSU,
  } = await request.json();
  const newItem = await prisma.item.create({
    data: {
      name,
      cpu,
      gpu,
      ram,
      ssd,
      motherboard,
      casing,
      cooler,
      totalWatt,
      recommendedPSU,
    },
  });
  return NextResponse.json(newItem, { status: 201 });
}
