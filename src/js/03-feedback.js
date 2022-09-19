import storageApi from "./storage"
import throttle from "lodash.throttle"
const STORAGE_KEYS = "feedback-form-state"


const formRef = document.querySelector(".feedback-form")
initialPage();
formRef.addEventListener('input', throttle(handleInput, 500))

function handleInput(event) {
        let savedData = storageApi.load(STORAGE_KEYS);
    if (!savedData) {
        savedData = {}
    }

    const { name, value } = event.target
    
    savedData[name] = value;
    storageApi.save(STORAGE_KEYS, savedData);
}

function initialPage() {
    const savedData = storageApi.load(STORAGE_KEYS);
    if (savedData) 
        Object.entries(savedData).forEach(([name, value]) => {
            formRef.elements[name].value = value;
        })
}

const handleSubmit = (event) => {
    event.preventDefault()
    const { email, message } = event.currentTarget;
    console.log({ email: email.value, message: message.value });
    event.currentTarget.reset();
    storageApi.remove(STORAGE_KEYS);
}

formRef.addEventListener("submit", handleSubmit)