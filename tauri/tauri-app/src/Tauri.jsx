import { appWindow } from '@tauri-apps/api/window';
import { useEffect } from 'react';

const Tauri = () => {
    useEffect(() => {
        document.getElementById('titlebar-minimize').addEventListener('click', () => appWindow.minimize());
        // document.getElementById('titlebar-maximize').addEventListener('click', () => appWindow.toggleMaximize());
        document.getElementById('titlebar-close').addEventListener('click', () => appWindow.close());

        return () => {
            document.getElementById('titlebar-minimize').removeEventListener('click', () => appWindow.minimize());
            //   document.getElementById('titlebar-maximize').removeEventListener('click', () => appWindow.toggleMaximize());
            document.getElementById('titlebar-close').removeEventListener('click', () => appWindow.close());
        };
    }, []);

    return (
        <div className="top-bar">
            SISTEMA
            <p></p> 
            <div data-tauri-drag-region className="titlebar">
                <div className="titlebar-button" id="titlebar-minimize">
                    <img src="https://api.iconify.design/mdi:window-minimize.svg" alt="minimize" />
                </div>
                <div className="titlebar-button" id="titlebar-close">
                    <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
                </div>
            </div>
        </div>
    );
}

export default Tauri;