import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = supabaseServer();
    const { data: attempts, error } = await supabase
      .from('question_attempts')
      .select('id, question_id, prompt_snapshot, time_spent_ms, is_correct, created_at')
      .eq('session_id', params.id)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ attempts: attempts || [] });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '載入練習結果失敗' },
      { status: 500 }
    );
  }
}

