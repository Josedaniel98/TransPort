''' Movimiento Serializer '''
from rest_framework import serializers

# Models
from api.models import Movimiento

class MovimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Movimiento
        fields='__all__'

class MovimientoReadSerializar(serializers.ModelSerializer):
    producto = serializers.SerializerMethodField()
    sucursal_origen = serializers.SerializerMethodField()
    sucursal_destino = serializers.SerializerMethodField()
    precio_venta = serializers.SerializerMethodField()
    cliente = serializers.SerializerMethodField()
    class Meta:
        model=Movimiento
        fields=('id','producto','cantidad','sucursal_origen','sucursal_destino','total','precio_venta', 'cliente')
    
    def get_producto(self,obj):
        return obj.producto.nombre
    
    def get_precio_venta(self,obj):
        return obj.producto.precio_venta

    def get_sucursal_origen(self,obj):
        return obj.sucursal_origen.nombre

    def get_sucursal_destino(self,obj):
        if obj.sucursal_destino != None:
            return obj.sucursal_destino.nombre
        return ""

    def get_cliente(self, obj):
        return obj.cliente.first_name + " " + obj.cliente.last_name

