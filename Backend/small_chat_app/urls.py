from django.urls import path
from .views import chat_view, ChatListView
from .views import chat_data_api

urlpatterns = [
    path('', chat_view),
    path('chat/', ChatListView.as_view(), name='chat_view.html'),
    path('api/chats/', chat_data_api, name='chat_data_api'),
]
