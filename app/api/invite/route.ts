import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

// In-memory storage (replace with database in production)
const forms: FormData[] = [];
const responses: FormResponse[] = [];

export async function POST(request: NextRequest): Promise<NextResponse<GenerateLinkResponse>> {
  try {
    const { title, date, description }: GenerateLinkRequest = await request.json();
    
    if (!title || !date) {
      return NextResponse.json(
        { success: false, error: 'Title and date are required' },
        { status: 400 }
      );
    }

    // Generate unique form ID
    const formId = nanoid(10);
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const formLink = `${baseUrl}/form/${formId}`;
    
    // Store form data
    const formData: FormData = {
      id: formId,
      title,
      date,
      description,
      link: formLink,
      createdAt: new Date().toISOString(),
    };
    
    forms.push(formData);
    
    return NextResponse.json({ 
      success: true, 
      link: formLink,
      formId 
    });
  } catch (error) {
    console.error('Error generating form link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate link' },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse<{ forms: FormData[]; responses: FormResponse[] }>> {
  return NextResponse.json({ forms, responses });
}