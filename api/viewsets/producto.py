''' Producto ViewSet '''

from rest_framework import viewsets
from rest_framework.decorators import action

# Models
from api.models import Producto

# Serializers
from api.serializers import ProductoSerializer, ProductoReadSerializer, ProductoRetrieveSerializar


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.filter(estado=True)
    filter_fields = ( 'id', 'tipo_producto' )
    # serializer_class = ProductoSerializer

    def get_serializer_class(self):

        if self.action == 'list':
            return ProductoReadSerializer
        elif self.action=='retrieve':
            return ProductoRetrieveSerializar
        
        return ProductoSerializer
    
    def perform_destroy(self, sucursal ):
        """ Desactivate a sucursal when it is deleted """
        sucursal.estado=False
        sucursal.save()