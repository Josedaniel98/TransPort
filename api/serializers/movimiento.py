''' Movimiento Serializer '''
from rest_framework import serializers

# Models
from api.models import Movimiento

class MovimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Movimiento
        fields='__all__'