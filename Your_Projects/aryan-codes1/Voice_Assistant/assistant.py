import speech_recognition as sr
import pyttsx3 as p

engine = p.init()
engine.setProperty('rate',165)

def speak(text):
    engine.say(text)
    engine.runAndWait()
    print("Chandra said: ",text)

speak("Hello sir! I am Chandra, your virtual assistant.")
speak("I am in development stage and can only answer few questions.")
recognizer = sr.Recognizer()

def listen():
    with sr.Microphone() as source:
        print("Listening....")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)
    try:
        text = recognizer.recognize_google(audio)
        print("you: ",text)
        return text
    except sr.UnknownValueError:
        print("Sorry, I didn't understand.")
    except sr.RequestError as e:
        print("Sorry, there was an error retrieving the audio: ",str(e))
    return ""

while True:
    command = listen().lower()
    if "hello" in command:
        speak("Hello! How may I assist you?")
    elif "how are you" in command:
        speak("I am having a good day, sir! How may I assist you?")
    elif "what is your name" in command:
        speak("My name is Chandra, sir.")
    elif "who made you" in command:
        speak("Aryan, sir.")
    elif "tell me a joke" in command:
        speak("Here is your joke, What do you call an alligator detective?")
        speak("An investi-gator!")
    elif "describe today's weather" in command:
        speak("It's Sunny today!")
    elif "do you know hindi" in command:
        speak("Mujhe hindi nahi aati.")
    elif "bye" in command:
        speak("goodbye!")
        break
    else:
        speak("Sorry I don't know how to respond!")
    
