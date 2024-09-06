import { ClassNames } from 'shared/lib/ClassNames';
import cls from 'pages/RoomPage/ui/Room.module.scss';
import {
    useCallback, useContext, useEffect, useState,
} from 'react';
import { SideScroll } from 'shared/ui/SideScroll';
import { VideoCart } from 'features/VideoCart';
import { socket } from 'shared/lib/socket';
import { useParams } from 'react-router-dom';
import { RoomContext } from 'app/providers/RoomProvider';
import { GlobalVideo } from 'pages/RoomPage/ui/Streams/GlobalVideo';
import { useDispatch } from 'react-redux';
import { joinAction } from 'entities/Join';
import { client } from 'features/http/ui/AxiosProvider';

interface PanelProps {
    className?: string
}

const Panel = ({ className }:PanelProps) => {
    const { clients, users, provideMediaRef } = useContext(RoomContext);
    const [isMain, setIsMain] = useState(false);
    const mainClient = 1;
    if (isMain) {
        return (
            <div className={cls.Panel}>
                <div className={cls.mainPanel}>
                    {clients[mainClient]
                        ? <VideoCart key={mainClient} className={cls.mainHeight} />
                        : <div />}
                </div>
                <SideScroll className={cls.SideScroll}>
                    {clients.filter((client:number) => client !== mainClient).map((client:any) => (
                        <div
                            key={client}
                        >
                            <VideoCart />
                        </div>
                    ))}
                </SideScroll>
            </div>
        );
    }
    return (
        <div className={ClassNames(cls.grid, {}, [className])}>
            {clients.map((client:any) => (
                <div>
                    <VideoCart
                        client={client}
                        key={client}
                    />
                    {/* <video ref={(instance) => provideMediaRef(client, instance)} autoPlay muted /> */}
                </div>
            ))}
        </div>
    );
};

export default Panel;
