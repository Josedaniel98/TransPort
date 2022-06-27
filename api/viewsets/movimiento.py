''' movimiento ViewSet '''

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

# Models
from api.models import Movimiento, Producto

# Serializers
from api.serializers import MovimientoSerializer, MovimientoReadSerializar, movimiento

class MovimientoViewSet(viewsets.ModelViewSet):
    queryset = Movimiento.objects.filter(estado=True)
    filter_fields = ( 'id', 'cliente','tipo_empresa' )
    # serializer_class = MovimientoSerializer

    def get_serializer_class(self):

        if self.action == 'list':
            return MovimientoReadSerializar
        
        return MovimientoSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        producto = Producto.objects.get(pk=request.data.get('producto'))

        movimiento = serializer.save()
        producto = Producto.objects.get(pk=request.data.get('producto'))
        movimiento.total = producto.precio_venta * int(request.data.get('cantidad'))
        movimiento.save()
        return Response(status=status.HTTP_201_CREATED)


    
