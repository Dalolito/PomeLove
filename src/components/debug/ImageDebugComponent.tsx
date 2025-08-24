'use client';

import { useState } from 'react';
import { Puppy } from '@/domain/entities/Puppy';

interface ImageDebugComponentProps {
  puppies: Puppy[];
}

export default function ImageDebugComponent({ puppies }: ImageDebugComponentProps) {
  const [showDebug, setShowDebug] = useState(false);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const analyzeImages = () => {
    const analysis = puppies.map(puppy => {
      const validImages = puppy.media?.filter(m => 
        m && m.type === 'image' && m.url && 
        typeof m.url === 'string' && 
        m.url.trim() !== ''
      ) || [];
      
      return {
        id: puppy.id,
        name: puppy.name,
        totalMedia: puppy.media?.length || 0,
        validImages: validImages.length,
        firstImageUrl: validImages[0]?.url || 'No valid image',
        mediaUrls: puppy.media?.map(m => m.url) || []
      };
    });

    return analysis;
  };

  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-3 py-1 rounded text-xs"
      >
        Debug Images
      </button>
    );
  }

  return (
    <div className="fixed inset-4 bg-black bg-opacity-50 z-50 overflow-auto">
      <div className="bg-white p-4 rounded max-h-full overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Image Debug Info</h3>
          <button
            onClick={() => setShowDebug(false)}
            className="text-red-500 text-xl"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-2 text-sm">
          {analyzeImages().map((analysis) => (
            <div key={analysis.id} className="border p-2 rounded">
              <div><strong>ID:</strong> {analysis.id}</div>
              <div><strong>Name:</strong> {analysis.name}</div>
              <div><strong>Total Media:</strong> {analysis.totalMedia}</div>
              <div><strong>Valid Images:</strong> {analysis.validImages}</div>
              <div><strong>First Image URL:</strong> {analysis.firstImageUrl}</div>
              <details>
                <summary>All Media URLs</summary>
                <pre className="text-xs bg-gray-100 p-2 mt-1">
                  {JSON.stringify(analysis.mediaUrls, null, 2)}
                </pre>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
