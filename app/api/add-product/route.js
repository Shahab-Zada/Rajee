import { NextResponse } from 'next/server';
import admin, { db } from '../../../lib/firebaseAdmin';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title');
    const price = formData.get('price');
    const section = formData.get('section');
    const location = formData.get('location');
    const description = formData.get('description');
    const condition = formData.get('condition');
    const clientId = formData.get('clientId[0]');
    
    if (!title || !price || !section) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const mediaFiles = formData.getAll('media');
    const mediaUrls = [];

    const bucket = admin.storage().bucket();
    
    for (const file of mediaFiles) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const dest = `media/${Date.now()}-${file.name}`;
        const bucketFile = bucket.file(dest);
        
        await bucketFile.save(buffer, { contentType: file.type });
        const [url] = await bucketFile.getSignedUrl({
          action: 'read',
          expires: '03-01-2500'
        });
        mediaUrls.push(url);
      }
    }

    const docRef = await db.collection('posts').add({
      title,
      price: Number(price),
      section,
      category: section,
      location: location || 'Unknown',
      description: description || '',
      condition: condition || '',
      images: mediaUrls,
      clientId,
      status: 'Pending',
      approved: false,
      createdAt: new Date(),
    });

    // Create notifications
    const usersSnapshot = await db.collection('users').get();
    const batch = db.batch();
    
    usersSnapshot.docs.forEach((u) => {
      const notifRef = db.collection('notifications').doc();
      batch.set(notifRef, {
        userId: u.id,
        title: 'New product added',
        body: `A new product "${title}" has been added`,
        productId: docRef.id,
        read: false,
        createdAt: new Date(),
      });
    });
    
    await batch.commit();

    return NextResponse.json({
      success: true,
      product: { id: docRef.id, title, images: mediaUrls }
    });
  } catch (err) {
    console.error('Add product error:', err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
