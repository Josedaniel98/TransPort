from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Profile
from api.serializers.role import RolesReadSerializer


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(required=False)
    class Meta:
        model = Profile
        fields = '__all__'

class ProfileReadSerializer(serializers.ModelSerializer):
    rol_name = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = (
            'id',
            'user',
            'role',
            'rol_name',
            'avatar',
            'phone',
            'address',
            'gender',
            'activo',
            'creado',
            'modificado',
            'sucursal'
        )
    
    def get_rol_name(self, obj):
        return obj.role.nombre if obj.role is not None else None


class UserSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'profile',
            'password',
            'email'
        )


class UserReadSerializer(serializers.ModelSerializer):
    profile = ProfileReadSerializer(required=False)
    permisos = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
            'permisos'
        )
    
    def get_permisos(self, obj):
        """ permisos que le son dados
            al usuario
        """
        usuario = obj
        try:
            permisos = usuario.profile.role
            serializer = RolesReadSerializer(permisos)
            if obj.is_staff:
                serializer.data['usuarios'] = True
                serializer.data['roles'] = True
            return serializer.data
        except Exception as e:
            print(e)
            return {"roles": True, "usuarios": True}
