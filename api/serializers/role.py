""" role serializer """
# django REST Framework
from rest_framework import serializers
from api.models.roles import RolesModel


class RolesSerializer(serializers.ModelSerializer):
    """ roles serializer """
    class Meta:
        model = RolesModel
        fields = '__all__'


class RolesReadSerializer(serializers.ModelSerializer):
    """ solo de lectura serializer de roles """
    class Meta:
        """class Meta """
        model = RolesModel
        fields = '__all__'
