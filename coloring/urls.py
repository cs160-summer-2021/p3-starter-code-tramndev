from django.urls import path
from . import views

urlpatterns = [
    path('demo', views.index, name='demo'),
    path('new_interaction', views.new_interaction, name='new_interaction'),
    path('art_collection', views.art_collection, name='art_collection')
]
