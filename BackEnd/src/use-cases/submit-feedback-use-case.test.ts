import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendmailSpy},
)

describe('Submit feedback', () => {
    it('should be abla to submit a feedback', async () =>{
        await expect(submitFeedback.execute({
            type:'Teste uni 1',
            comment:'Teste Comment 1',
            screenshot:'data:image/png;base64 asdsadsadasdsadsads',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendmailSpy).toHaveBeenCalled();
    });

    it('should not be abla to submit a feedback without type', async () =>{
        await expect(submitFeedback.execute({
            type:'',
            comment:'Teste Comment 1',
            screenshot:'data:image/png;base64 asdsadsadasdsadsads',
        })).rejects.toThrow();
    });

    it('should not be abla to submit a feedback without Comment', async () =>{
        await expect(submitFeedback.execute({
            type:'Teste Comment 1',
            comment:'',
            screenshot:'data:image/png;base64 asdsadsadasdsadsads',
        })).rejects.toThrow();
    });

    it('should not be abla to submit a feedback with an invalid screenshot', async () =>{
        await expect(submitFeedback.execute({
            type:'bugado',
            comment:'Teste Comment 1',
            screenshot:'test.jpg',
        })).rejects.toThrow();
    });
    
});