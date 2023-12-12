import { ButtonsPanel } from 'witgets/ButtonsPanel';
import Panel from 'pages/RoomPage/ui/Panel';
import { useEffect, useState } from 'react';
import { PreEnterMenu } from 'shared/ui/PreEnterMenu/ui/PreEnterMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getJoinValue, joinAction } from 'entities/Join';
import { useParams } from 'react-router-dom';
import { getLocalVideoStream } from 'pages/RoomPage/ui/Streams/getLocalVideoStream';
import { RoomProvider } from 'app/providers/RoomProvider';
import { NotificationCart } from 'features/NotificationCart';
import { ClassNames } from 'shared/lib/ClassNames';
import cls from './Room.module.scss';
import classNames from '*.scss';

interface RoomProps {
    className?: string
}
const Room = ({ className }:RoomProps) => {
    const [rooms, updateRooms] = useState([]);
    const [exist, setExist] = useState(true);
    const roomId = useParams();
    const getLocalVideo = getLocalVideoStream();
    // useEffect(() => {
    //     socket.emit(ACTIONS.JOIN, {
    //         roomId: roomId.id,
    //     });
    //     console.log(roomId.id);
    // }, []);
    const dispatch = useDispatch();
    const joined = useSelector(getJoinValue);
    if (joined) {
        return (
            <div className={cls.Room}>
                <RoomProvider>
                    <Panel className={className} />
                    <ButtonsPanel />
                </RoomProvider>
            </div>
        );
    }
    return (
        <div>
            {exist
                ? <PreEnterMenu />
                : <h1>Room don't exist</h1>}
        </div>
    );
};

export default Room;
