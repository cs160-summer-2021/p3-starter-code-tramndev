from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'coloring/index.html')

def demo(request):
    return render(request, 'coloring/demo.html')
    
def new_interaction(request):
    return render(request, 'coloring/new_interaction.html')

def art_collection(request):
    return render(request, 'coloring/art_collection.html')