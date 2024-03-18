# views.py

from django.http import HttpResponse
from django.shortcuts import render

from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer

# Initialize ChatBot instance
bot = ChatBot(
    'Buddy',  
    logic_adapters=[
        'chatterbot.logic.BestMatch',
        'chatterbot.logic.TimeLogicAdapter'],
)

# Train the chatbot using ListTrainer
trainer = ListTrainer(bot)
trainer.train([
'Hi',
'Hello',
'I need your assistance regarding my order',
'Please, Provide me with your order id',
'I have a complaint.',
'Please elaborate, your concern',
'How long it will take to receive an order ?',
'An order takes 3-5 Business days to get delivered.',
'Okay Thanks',
'No Problem! Have a Good Day!'
])

# Django view to render index.html
def index(request):
    return render(request, 'index.html')

# Django view to handle user requests and generate responses
def get_response(request):
    if request.method == 'GET':
        user_message = request.GET.get('userMessage')  # Use 'userMessage' as consistent with HTML
        chat_response = str(bot.get_response(text=user_message))
        return HttpResponse(chat_response)
    else:
        return HttpResponse("Unsupported request method. Please use GET.")
