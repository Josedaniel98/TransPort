''' Sucursal Serializer '''
from rest_framework import serializers

# Models
from api.models import Sucursal

class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model=Sucursal
        fields='__all__'

class SucursalReadSerializer(serializers.ModelSerializer):
    departamento = serializers.CharField(source='get_departamento_display')
    tipo_empresa = serializers.SerializerMethodField()
    class Meta:
        model=Sucursal
        fields=('id','departamento','tipo_empresa','nombre')


    def get_tipo_empresa(self,obj):
        return obj.get_tipo_empresa_display()