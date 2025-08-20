import { NextRequest, NextResponse } from 'next/server';
import { createPuppyUseCase } from '@/infrastructure/config/dependencies';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const puppy = await createPuppyUseCase.execute(body);
    
    return NextResponse.json({
      success: true,
      data: puppy
    });
  } catch (error) {
    console.error('Error creating puppy:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
