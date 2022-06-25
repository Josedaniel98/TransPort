import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Profile, Sucursal
from api.serializers import UserSerializer, UserReadSerializer, ProfileSerializer, UserMeReadSerializer


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_active=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("username", "first_name")
    search_fields = ("username", "first_name")
    ordering_fields = ("username", "first_name")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return UserReadSerializer
        else:
            return UserSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            profile = request.data.pop("profile")

            user = User.objects.create_user(
                **request.data
            )
            sucursal_id = profile.pop('sucursal')
            sucursal = Sucursal.objects.get(pk=sucursal_id)
            Profile.objects.create(
                user=user,
                role_id=profile.pop('role'),
                sucursal=sucursal,
                **profile,
            )
        except:
           user = User.objects.create_user(
                **request.data
            ) 
        user.save()
        serializer = UserReadSerializer(user)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    def update(self, request, *args, **kwargs):
        profile_data = request.data.pop("profile")
        user_data = request.data

        usuario = self.get_object()
        serializer = UserSerializer(usuario, data=user_data, partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        if "password" in user_data:
            user.set_password(user_data["password"])
            user.save()

        # si el usuario no tiene perfil lo crea
        try:
            perfil = user.profile
            profile_data.pop("user")
            avatar = profile_data.get("avatar", None)
            if avatar is not None:
                profile_data.pop("avatar")

            serializerP = ProfileSerializer(
                perfil,
                data=profile_data,
                partial=True
            )

            serializerP.is_valid(raise_exception=True)
            perfil.role_id = profile_data["role"]
            perfil.phone = profile_data["phone"]
            perfil.sucursal_id = profile_data["sucursal"]
            perfil.save()
        except Profile.DoesNotExist:
            Profile.objects.create(
                user=user,
                role_id=profile_data.get("role", None),
                phone=profile_data.get("phone", None),
                sucursal_id=profile_data["sucursal"]
            )

        serializerUsuario = UserReadSerializer(user)

        return Response(serializerUsuario.data, status=status.HTTP_200_OK)

    @action(methods=["get"], detail=False)
    def me(self, request, *args, **kwargs):
        user = request.user
        serializer = UserMeReadSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False)
    def token(self, request, *args, **kwargs):
        data = request.data
        try:
            user = User.objects.get(username=data["username"])
            if user.check_password(data["password"]):
                token, created = Token.objects.get_or_create(user=user)
                serializer = UserReadSerializer(user)
                return Response({"user": serializer.data, "token": token.key}, status=status.HTTP_200_OK)
            return Response({"detail": "Password does not match user password"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def logout(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Token.DoesNotExist:
            return Response({"detail": "session not found"}, status=status.HTTP_404_NOT_FOUND)
