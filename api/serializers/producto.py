''' Producto Serializer '''
from rest_framework import serializers

# Models
from api.models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Producto
        fields='__all__'

class ProductoReadSerializer(serializers.ModelSerializer):
    tipo_producto = serializers.CharField(source='get_tipo_producto_display')
    sucursal = serializers.SerializerMethodField()
    class Meta:
        model=Producto
        fields=('id','descripcion','codigo','nombre','precio_venta','tipo_producto','sucursal')
    
    def get_sucursal(self,obj):
        return obj.sucursal.nombre

class ProductoRetrieveSerializar(serializers.ModelSerializer):
    sucursal = serializers.SerializerMethodField()
    class Meta:
        model=Producto
        fields=('id','descripcion','codigo','nombre','precio_venta','tipo_producto','sucursal')
    
    def get_sucursal(self,obj):
        return { 'value': obj.sucursal.id, 'label': obj.sucursal.nombre }
    