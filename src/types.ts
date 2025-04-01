export interface EventFormData {
  id: string;
  title: string;
  activityType: ActivityType;
  description: string;
  category: EventCategory;
  datetime: string;
  location: string;
  locationUrl?: string;
  responsibleName: string;
  contactPhone: string;
  socialMedia: string;
  imageUrl?: string;
  targetAudience: TargetAudience;
  reminder: boolean;
  price: {
    isFree: boolean;
    amount?: number;
  };
}

export type ActivityType = 'taller' | 'exposicion' | 'festival' | 'reunion' | 'comunitaria' | 'otro';
export type EventCategory = 'artes_escenicas' | 'promocion_lectura' | 'audiovisual' | 'patrimonio';
export type TargetAudience = 'children' | 'adults' | 'all';

export interface EventFilters {
  category?: EventCategory;
  search?: string;
  startDate?: string;
  endDate?: string;
}