import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebaseAdmin';

export async function GET() {
  try {
    const snapshot = await db.collection('posts').orderBy('createdAt', 'desc').get();
    
    const posts = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const clientData = data.clientId
          ? (await db.collection('users').doc(data.clientId).get()).data()
          : null;
        
        return {
          id: doc.id,
          ...data,
          status: data.status?.toLowerCase() || 'unknown',
          createdAt: data.createdAt?.toDate?.() || new Date(),
          client: clientData
            ? { name: clientData.name || 'Guest', profileImage: clientData.profileImage || null }
            : { name: 'Guest', profileImage: null },
        };
      })
    );

    const activePosts = posts.filter((p) => p.status === 'active');
    
    return NextResponse.json({ success: true, posts: activePosts });
  } catch (err) {
    console.error('Error fetching active posts:', err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
