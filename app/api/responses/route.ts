// import { NextRequest, NextResponse } from 'next/server';

// const responses: FormResponse[] = [];

// export async function POST(request: NextRequest): Promise<NextResponse<SubmitResponseResponse>> {
//   try {
//     const data: SubmitResponseRequest = await request.json();
    
//     if (!data.formId || !data.name || !data.email) {
//       return NextResponse.json(
//         { success: false, error: 'Form ID, name, and email are required' },
//         { status: 400 }
//       );
//     }

//     const response: FormResponse = {
//       id: Date.now().toString(),
//       ...data,
//       submittedAt: new Date().toISOString(),
//     };
    
//     responses.push(response);
    
//     return NextResponse.json({ 
//       success: true, 
//       message: 'Response submitted successfully' 
//     });
//   } catch (error) {
//     console.error('Error submitting response:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to submit response' },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(): Promise<NextResponse<{ responses: FormResponse[] }>> {
//   return NextResponse.json({ responses });
// }