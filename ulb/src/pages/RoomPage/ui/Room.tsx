import { ButtonsPanel } from 'witgets/ButtonsPanel';
import Panel from 'pages/RoomPage/ui/Panel';
import { ACTIONS, socket } from 'shared/lib/socket';
import { useEffect, useState } from 'react';
import { PreEnterMenu } from 'shared/ui/PreEnterMenu/ui/PreEnterMenu';
import { useDispatch, useSelector } from 'react-redux';
import { joinAction } from 'entities/Join';
import { getJoinValue } from 'entities/Join/model/selectors/getJoinValue/getJoinValue';
import { Button } from 'shared/ui/Button';
import { useParams } from 'react-router-dom';
import { getLocalVideoStream } from 'pages/RoomPage/ui/Streams/getLocalVideoStream';
import cls from './Room.module.scss';

interface RoomProps {
    className?: string
}
const Room = ({ className }:RoomProps) => {
    const [rooms, updateRooms] = useState([]);
    const [exist, setExist] = useState(true);
    const roomId = useParams();
    const getLocalVideo = getLocalVideoStream();
    useEffect(() => {
        socket.on('NotExistRoom', () => {
            setExist(false);
        });
    }, []);
    useEffect(() => {
        socket.on('StartPrepareCamera', async () => {
        });
    }, []);

    useEffect(() => {
        socket.emit('shareRoomId', {
            roomId,
        });
        console.log(roomId);
    }, []);
    const dispatch = useDispatch();
    const joined = useSelector(getJoinValue);
    const join = () => {
        dispatch(joinAction.change());
    };
    if (joined) {
        return (
            <div className={cls.Room}>
                {/* <Button type="button" onClick={join} /> */}
                <Panel className={className} />
                <ButtonsPanel />
            </div>
        );
    }
    return (
        <div>
            {/* <Button type="button" onClick={join} /> */}
            {exist
                ? <PreEnterMenu />
                : <h1>Room don't exist</h1>}
        </div>
    );
};

export default Room;
