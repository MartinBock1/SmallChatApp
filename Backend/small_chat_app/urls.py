from django.urls import path
from .views import chat_view, ChatListView

urlpatterns = [
    path('', chat_view),
    path('chat/', ChatListView.as_view(), name='chat_view.html'),
]
