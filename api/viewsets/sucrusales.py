''' Sucursal ViewSet '''

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
# Models
from api.models import Sucursal

# Serializers
from api.serializers import SucursalSerializer, SucursalReadSerializer


class SucursalViewSet(viewsets.ModelViewSet):
    queryset = Sucursal.objects.filter(estado=True)
    filter_fields = ( 'id', 'tipo_empresa' )

    def get_serializer_class(self):

        if self.action == 'list':
            return SucursalReadSerializer
        
        return SucursalSerializer

    def perform_destroy(self, sucursal ):
        """ Desactivate a sucursal when it is deleted """
        sucursal.estado=False
        sucursal.save()

    @action( detail=False, methods=["get"])
    def selectsucursales(self, request, *args, **kwargs):
        """ listado de sucursales para un select """
        info = Sucursal.objects.filter(estado=True)
        infosucursales = {
            'sucursal': SucursalReadSerializer(info, many=True).data,
        }
        
        return Response(infosucursales, status=status.HTTP_200_OK)