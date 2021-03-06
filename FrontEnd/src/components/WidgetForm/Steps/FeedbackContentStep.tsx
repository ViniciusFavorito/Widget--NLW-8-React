import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType,feedbackTiposs } from "..";
import { api } from "../../../lib/api";
import { Btn_Fechar } from "../../BtnFechar";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";


interface FeedbackContentStepProps{
    feedbackType: FeedbackType
    onFeedbackRestartRequested: () => void
    feedback_enviado: () => void
}

export function FeedbackContentStep({feedbackType,onFeedbackRestartRequested,feedback_enviado}: FeedbackContentStepProps){

    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [descrição, setDescrição] = useState('');
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    const feedbackTypeInfo = feedbackTiposs[feedbackType]

    async function handleSubmitFeedback(e:FormEvent){
        e.preventDefault()
        setIsSendingFeedback(true);
        
        await api.post('/feedbacks',{
            type: feedbackType,
            comment: descrição,
            screenshot:screenshot
        })
        setIsSendingFeedback(false);
        
        feedback_enviado()
    }

    return(
        <>
            <header>
                <button
                    type="button"
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={onFeedbackRestartRequested}
                    >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" / >
                    {feedbackTypeInfo.title}
                </span>
                <Btn_Fechar />
            </header>

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full" >
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder:bg-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-x-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte o QUE está acontecendo..."
                    onChange={event => setDescrição(event.target.value)}
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        foto_tirada={screenshot}
                        onScreenshotTook={setScreenshot} 
                    />                 
                    <button
                        type="submit"
                        disabled={descrição.length==0 ||isSendingFeedback }
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500 "
                    >
                        {isSendingFeedback ? <Loading />: 'Enviar FeedBack'}
                    </button>
                </footer>
            </form>
        </>
        );
}