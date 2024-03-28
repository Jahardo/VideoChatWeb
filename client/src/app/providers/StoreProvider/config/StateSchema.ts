import { joinSchema } from 'entities/Join';
import { VideoSettingsSchema } from 'entities/VideoSettings';

export interface StateSchema {
    join : joinSchema
    videoSettings: VideoSettingsSchema,
}
