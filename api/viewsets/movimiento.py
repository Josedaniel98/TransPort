''' movimiento ViewSet '''

from rest_framework import viewsets
from rest_framework.decorators import action

# Models
from api.models import Movimiento

# Serializers
from api.serializers import MovimientoSerializer

class MovimientoViewSet(viewsets.ModelViewSet):
    queryset = Movimiento.objects.filter(estado=True)
    serializer_class = MovimientoSerializer

    # def get_serializer_class(self):

    #     if self.action == 'list':
    #         return ProductoReadSerializer
    #     elif self.action=='retrieve':
    #         return ProductoRetrieveSerializar
        
    #     return ProductoSerializer
    
    # def perform_destroy(self, sucursal ):
    #     """ Desactivate a sucursal when it is deleted """
    #     sucursal.estado=False
    #     sucursal.save()
