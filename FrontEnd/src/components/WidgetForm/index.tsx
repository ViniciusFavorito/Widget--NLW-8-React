import { Btn_Fechar } from "../BtnFechar";

import bug_img from '../../assets/bug.svg'
import idea_img from '../../assets/idea.svg'
import thought_img from '../../assets/thought.svg'
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { useState } from "react";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";


export const feedbackTiposs = {
    BUG:{
        title:"Problema",
        image:{
            source:bug_img,
            alt:'Imagem de um inseto'
        }
    },
    IDEA:{
        title:"Ideia",
        image:{
            source:idea_img,
            alt:'Imagem de uma lâmpada'
        }
    },
    OTHER:{
        title:"Outro",
        image:{
            source:thought_img,
            alt:'Imagem de um balão de pensamento'
        }
    }
}

export type FeedbackType = keyof typeof feedbackTiposs


export function WidgetForm(){

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const[feedback_enviado, setFeedback_enviado]  = useState(false)

    function handleRestartFeedback(){
        setFeedbackType(null);
        setFeedback_enviado(false)
    }


    return(
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto ">

            {feedback_enviado ? (
                <FeedbackSuccessStep
                    btn_envia_outro={handleRestartFeedback}
                />
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}  />
                    ):(
                        <FeedbackContentStep 
                            feedbackType={feedbackType} 
                            onFeedbackRestartRequested={handleRestartFeedback}
                            feedback_enviado={() => setFeedback_enviado(true)}
                        />
                    )}
                </>
            )}

            <footer>
                Feito com s2 por <a className="underline underline-offset-2" href="https://google.com.br">Nelson</a>
            </footer>

        </div>
    );
}