from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Profile, Sucursal
from api.serializers.role import RolesReadSerializer

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(required=False)

    class Meta:
        model = Profile
        fields = '__all__'

class SucursalReadSerializer(serializers.ModelSerializer):
    departamento = serializers.CharField(source='get_departamento_display')
    tipo_empresa = serializers.SerializerMethodField()
    class Meta:
        model=Sucursal
        fields=('id','departamento','tipo_empresa','nombre')


    def get_tipo_empresa(self,obj):
        return obj.get_tipo_empresa_display()

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

class ProfileMeReadSerializer(serializers.ModelSerializer):
    rol_name = serializers.SerializerMethodField()
    sucursal = SucursalReadSerializer(required=False)
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

    profile = ProfileSerializer(required=False, read_only=True)

    class Meta:
        model = User
        fields = '__all__'


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

class UserMeReadSerializer(serializers.ModelSerializer):
    profile = ProfileMeReadSerializer(required=False)
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
