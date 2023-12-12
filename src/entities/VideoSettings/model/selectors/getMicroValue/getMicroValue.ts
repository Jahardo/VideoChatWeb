import { createSelector } from '@reduxjs/toolkit';
import { VideoSettingsSchema } from 'entities/VideoSettings';
import { getVideoSettings } from '../getVideoSettings/getVideoSettings';

export const getMicroValue = createSelector(
    getVideoSettings,
    (videoSettings:VideoSettingsSchema) => videoSettings.isMicro,
);
