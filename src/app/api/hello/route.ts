import React from 'react';
import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({message:"hello word"})
}
