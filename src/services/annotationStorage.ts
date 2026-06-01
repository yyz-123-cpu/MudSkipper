import type { ManualAnnotation } from '../domain/inspection';

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface AnnotationStorage {
  get(anomalyId: string): ManualAnnotation | null;
  getAll(): Record<string, ManualAnnotation>;
  save(annotation: ManualAnnotation): void;
}

const STORAGE_KEY = 'mudskipper-x.annotations';

export class LocalAnnotationStorage implements AnnotationStorage {
  constructor(private readonly storage: StorageLike) {}

  get(anomalyId: string): ManualAnnotation | null {
    return this.getAll()[anomalyId] ?? null;
  }

  getAll(): Record<string, ManualAnnotation> {
    const value = this.storage.getItem(STORAGE_KEY);
    return value ? (JSON.parse(value) as Record<string, ManualAnnotation>) : {};
  }

  save(annotation: ManualAnnotation): void {
    this.storage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...this.getAll(),
        [annotation.anomalyId]: annotation,
      }),
    );
  }
}

export const annotationStorage = new LocalAnnotationStorage(window.localStorage);
