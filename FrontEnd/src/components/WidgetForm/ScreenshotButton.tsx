import html2canvas from "html2canvas";
import { backgroundPosition } from "html2canvas/dist/types/css/property-descriptors/background-position";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonPropos{
    onScreenshotTook: (screenshot: string | null) => void
    foto_tirada: string | null
}

export function ScreenshotButton(props : ScreenshotButtonPropos){

    const[isTakingScreenshot,setIsTakingScreenshot] = useState(false);
    
    async function handleTakeScreenshot(){
        setIsTakingScreenshot(true)

        const canvas = await html2canvas(document.querySelector('html')!);
        const base64image = canvas.toDataURL('image/png');

        props.onScreenshotTook(base64image)
        setIsTakingScreenshot(false)
    }

    if(props.foto_tirada){
        return(
            <div>
                <button
                type="button"
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
                onClick={() => props.onScreenshotTook(null)}
                style={{
                    backgroundImage:`url(${props.foto_tirada})`,
                    backgroundPosition:`right botton`,
                    backgroundSize:180,
                }}
                >
                    <Trash weight="fill" />
                </button>
            </div>
        );
    }

    return(
        <button 
        type="button"
        onClick={handleTakeScreenshot}
        className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 "
        >
        {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6 " />}
    </button>
    );
}