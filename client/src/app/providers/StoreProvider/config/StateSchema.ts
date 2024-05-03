import { joinSchema } from 'entities/Join';
import { VideoSettingsSchema } from 'entities/VideoSettings';
import { UserSchema } from 'entities/User';

export interface StateSchema {
    join : joinSchema
    videoSettings: VideoSettingsSchema,
    user:UserSchema,
}
