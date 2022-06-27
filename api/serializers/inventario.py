''' Inventario Serializer '''
from rest_framework import serializers

# Models
from api.models import Inventario

class InventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model=Inventario
        fields='__all__'

class InventarioReadSerializar(serializers.ModelSerializer):
    producto = serializers.SerializerMethodField()
    precio_venta = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    
    class Meta:
        model=Inventario
        fields=('id','producto','existencias','precio_venta','total','sucursal')
    
    def get_producto(self,obj):
        return obj.producto.nombre 

    def get_precio_venta(self,obj):
        return obj.producto.precio_venta 
    
    def get_total(self,obj):
        return obj.producto.precio_venta*obj.existencias 
