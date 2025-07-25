import React from 'react';
import { NextResponse } from 'next/server';

export default function GET() {
  return NextResponse.json({message:"hello word"})
}
