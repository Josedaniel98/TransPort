''' Inventario ViewSet '''

from rest_framework import viewsets
from rest_framework.response import Response
# from rest_framework.decorators import action

# Models
from api.models import Inventario

# Serializers
from api.serializers import InventarioSerializer, InventarioReadSerializar 


class InventarioViewSet(viewsets.ModelViewSet):
    queryset = Inventario.objects.filter(estado=True)
    serializer_class = InventarioSerializer
    filter_fields = ( 'id', 'sucursal' )


    def get_serializer_class(self):
        if self.action == 'list':
            return InventarioReadSerializar
        # elif self.action=='retrieve':
        #     return ProductoRetrieveSerializar
        
        return InventarioSerializer
    
    # def perform_destroy(self, sucursal ):
    #     """ Desactivate a sucursal when it is deleted """
    #     sucursal.estado=False
    #     sucursal.save()