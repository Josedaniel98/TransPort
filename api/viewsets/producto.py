''' Producto ViewSet '''

from yaml import serialize_all
from rest_framework import viewsets

# Models
from api.models import Producto

# Serializers
from api.serializers import ProductoSerializer


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer