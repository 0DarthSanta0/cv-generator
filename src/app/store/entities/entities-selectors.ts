import { createFeatureSelector } from '@ngrx/store';
import { IEntitiesState } from '@ourStore/entities/models/entities-state.interface';

export const entitiesFeatureSelector = createFeatureSelector<IEntitiesState>('entities');

