''' Inventario ViewSet '''

from rest_framework import viewsets, status
from rest_framework.response import Response
# from rest_framework.decorators import action

# Models
from api.models import Inventario
from api.models import Producto

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
    
    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:

            inventario = Inventario.objects.get(producto=data.get('producto'))
            
            if inventario != None:
                inventario.existencias = inventario.existencias + int(data.get('existencias'))
                inventario.save()
            else:
                serializer.save()
        
            return Response(status=status.HTTP_201_CREATED)
        except Inventario.DoesNotExist:
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
            
        

    
    # def perform_destroy(self, sucursal ):
    #     """ Desactivate a sucursal when it is deleted """
    #     sucursal.estado=False
    #     sucursal.save()