# from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import ListView
from .models import Chat

# Create your views here.


def chat_view(request):
    return HttpResponse("Hey, that worked well")


class ChatListView(ListView):
    model = Chat
    template_name = 'small_chat_app/chat_view.html'
    context_object_name = 'chats'
