import { Confetti } from "phosphor-react";
import { Btn_Fechar } from "../../BtnFechar";

interface btn_envia_outroProps{
    btn_envia_outro: () => void
}


export function FeedbackSuccessStep(props:btn_envia_outroProps){
    return(
        <>
            <header>
                <Btn_Fechar />
            </header>

            <div className="flex flex-col items-center py-10 w-[304px]">
                <Confetti size={32} />
                <span className="text-xl mt-2"> Agradecemos o feedback! </span>
                <button
                    type="button"
                    onClick={props.btn_envia_outro}
                    className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500  "
                >
                    Quero enviar outro feedback
                </button>
            </div>
        </>
    );
}