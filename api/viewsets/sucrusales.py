''' Sucursal ViewSet '''

from rest_framework import viewsets
from rest_framework.decorators import action

# Models
from api.models import Sucursal

# Serializers
from api.serializers import SucursalSerializer, SucursalReadSerializer


class SucursalViewSet(viewsets.ModelViewSet):
    queryset = Sucursal.objects.filter(estado=True)

    def get_serializer_class(self):

        if self.action == 'list':
            return SucursalReadSerializer
        
        return SucursalSerializer

    def perform_destroy(self, sucursal ):
        """ Desactivate a sucursal when it is deleted """
        sucursal.estado=False
        sucursal.save()