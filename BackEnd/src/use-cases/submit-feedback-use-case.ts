import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest{
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase{
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest){
        const {type, comment, screenshot} = request;

        if(!type){
            throw new Error("Tipo de chamado Invalido")
        }

        if(!comment){
            throw new Error("Descrição da mensagem sem conteúdo.")
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error("Formato invalido da Imagem")
        }
        
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: "Novo Chamado",
            body: [
                `<div style="font-family:sans-serif; font-size:16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Descrição: ${comment}</p>`,
                screenshot ? `<img src ="${screenshot}" />` : ``,
                `</div>`
            ].join('\n')
        })
    }
}