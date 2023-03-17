import { defineStore } from "pinia"
import { Configuration, OpenAIApi } from "openai"
    
class CustomFormData extends FormData {
    getHeaders() {
        return {}
    }
}


const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    formDataCtor: CustomFormData
})

export const openAI = defineStore({
    id: "open",
    state: () => ({
        ai: new OpenAIApi(configuration),
        document: {
            _id: "main",
            _rev: ""
        }
    })
}) as any 

export default openAI