
export default function AppHeader() {
    return <div className="m-2 h-30 flex justify-end fixed top-0 left-0 right-0" data-tauri-drag-region>
        <div>
            <img src="https://api.iconify.design/mdi:close.svg"
                alt="close" />
        </div>
        <div>
            <img src="https://api.iconify.design/mdi:window-minimize.svg"
                alt="minimize" />
        </div>
        <div>
            <img src="https://api.iconify.design/mdi:window-maximize.svg"
                alt="maximize" />
        </div>
    </div>

}