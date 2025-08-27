export interface Puppy {
  id: string;
  name: string;
  description: string;
  ageYears: number;
  ageMonths: number;
  categoryId: string;
  category?: Category;
  media: MediaFile[];
  fatherImage?: string;
  motherImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaFile {
  id: string;
  url: string;
  type: 'image' | 'video';
  name: string;
  size: number;
  isUploaded?: boolean;
  file?: File;
}
