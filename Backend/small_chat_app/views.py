# from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView
from .models import Chat
from django.utils import timezone
import json

# Create your views here.


def chat_view(request):
    return HttpResponse("Hey, that worked well")


class ChatListView(ListView):
    model = Chat
    template_name = 'small_chat_app/chat_view.html'
    context_object_name = 'chats'


# API für das Abrufen aller Chats
def chat_data_api(request):
    if request.method == 'GET':
        # Alle Chat-Nachrichten aus der Datenbank holen
        chats = Chat.objects.all().values('name', 'message', 'created_at')
        # Die Daten als JSON zurückgeben
        return JsonResponse(list(chats), safe=False)

    elif request.method == 'POST':
        # Wenn die Anfrage eine POST-Anfrage ist, die Daten aus dem Body lesen
        try:
            data = json.loads(request.body)
            name = data.get('name')
            message = data.get('message')

            # Einen neuen Chat in der Datenbank speichern
            chat = Chat(name=name, message=message, created_at=timezone.now())
            chat.save()

            # Rückmeldung, dass das Chat-Nachricht gespeichert wurde
            return JsonResponse({'message': 'Chat gespeichert!', 'chat': {'name': name, 'message': message}}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Ungültige Daten'}, status=400)
